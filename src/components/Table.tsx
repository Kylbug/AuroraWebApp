import { For, Show, createSignal, onMount, createEffect } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";

export interface DisplayColumn<T> {
  header: string;
  key: keyof T;
  showInForm: boolean;
  type?: 'text' | 'number' | 'boolean' | 'custom';
  customTypeList?: any[];
}

interface TableProps<T> {
  data: T[];
  columns: DisplayColumn<T>[];
  loading: boolean;
  onCreate: (newItem: T) => Promise<void>;
  onUpdate: (id: string, updatedData: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onFetch?: () => Promise<void>;
  fetchPersonById: (id: string) => Promise<T | null>;
}

export default function Table<T extends { id: string | number }>(props: TableProps<T>) {

  const [newItem, setNewItem] = createSignal<Partial<T>>({});
  const [originalItem, setOriginalItem] = createSignal<Partial<T>>({});
  const [formValid, setFormValid] = createSignal(false);
  const [errors, setErrors] = createSignal<Record<string, boolean>>({});
  const [isEditing, setIsEditing] = createSignal(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = createSignal(false);
  const [currentId, setCurrentId] = createSignal<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (id: string | null = null) => {
    if (id) {
      setCurrentId(id);
      setIsEditing(true);
      props.fetchPersonById(id)
        .then(existingPerson => {
          if (existingPerson) {
            const item = { ...(existingPerson as Partial<T>) };
            setNewItem(() => item);
            setOriginalItem(() => item);
            setHasUnsavedChanges(false);
            validateForm();
            const params = new URLSearchParams(location.search);
            params.set('id', id);
            navigate(`${location.pathname}?${params.toString()}`, { replace: false });
            const modal = document.getElementById('CreateOrEditForm') as HTMLDialogElement;
            modal?.showModal();
          } else {
            console.log("No matching person found for id:", id);
            navigate(location.pathname, { replace: true });
          }
        })
        .catch(error => {
          console.error("Error fetching person by id:", error);
          navigate(location.pathname, { replace: true });
        });
    } else {
      setCurrentId(null);
      setIsEditing(false);
      setHasUnsavedChanges(false);

      const emptyNewItem: Partial<T> = {};
      props.columns.forEach(column => {
        emptyNewItem[column.key] = column.type === 'boolean' ? undefined : '' as any;
      });
      setNewItem(() => emptyNewItem);
      setOriginalItem(() => emptyNewItem);

      validateForm();
      const modal = document.getElementById('CreateOrEditForm') as HTMLDialogElement;
      modal?.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('CreateOrEditForm') as HTMLDialogElement;
    modal?.close();
    navigate(location.pathname, { replace: true });
  };

  const handleCreateOrUpdate = async () => {
    if (formValid()) {
      try {
        if (isEditing()) {
          if (hasUnsavedChanges()) {
            await props.onUpdate(currentId() as string, newItem());
          }
        } else {
          await props.onCreate(newItem() as T);
        }
        if (props.onFetch) {
          await props.onFetch(); // Refetch the data after operation
        }
        closeModal();
      } catch (error) {
        console.error("Operation failed:", error);
      }
    }
  };
  
  const handleInput = (key: keyof T, value: any) => {
    setNewItem(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true); // Track unsaved changes only after user input
    validateForm();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      try {
        await props.onDelete(currentId() as string);
        if (props.onFetch) {
          await props.onFetch(); // Refetch the data after deletion
        }
        closeModal();
      } catch (error) {
        console.error("Delete operation failed:", error);
      }
    }
  };

  createEffect(() => {
    const isChanged = JSON.stringify(newItem()) !== JSON.stringify(originalItem());
    setHasUnsavedChanges(isChanged);
  });

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;
    props.columns.forEach((column) => {
      if (column.showInForm) {
        const value = newItem()[column.key];
        if (value === undefined || value === null || value.toString().trim() === '') {
          newErrors[column.key as string] = true;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setFormValid(isValid);
  };

  onMount(() => {
    if (props.onFetch) {
      props.onFetch();
    }
  
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
  
    if (id) {
      openModal(id);
    }
  });

  return (
    <div>
      <div class="flex justify-end mb-4">
        <button class="btn bg-secondary hover:bg-primary" onClick={() => openModal()}>
          New Entry
        </button>
      </div>
      <Show when={!props.loading} fallback={<div>Loading...</div>}>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <For each={props.columns}>
                  {(column) => <th>{column.header}</th>}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={props.data}>
                {(item) => (
                  <tr class="hover" onClick={() => openModal(item.id.toString())}>
                    <For each={props.columns}>
                      {(column) => <td>{item[column.key]?.toString()}</td>}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>

      <dialog id="CreateOrEditForm" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-4">{isEditing() ? "Edit Entry" : "Create New Entry"}</h3>
          <div class="py-4">
            <For each={props.columns}>
              {(column) =>
                column.showInForm && (
                  <div class="mb-4">
                    <label class="form-control w-full">
                      <div class="label flex justify-between">
                        <span class="label-text">{column.header}</span>
                      </div>
                      <div class="indicator w-full">
                        <span class="indicator-item badge badge-secondary mr-5">Required</span>
                        <Show
                          when={column.type === 'boolean'}
                          fallback={
                            column.type === 'custom' && column.customTypeList ? (
                              <select
                                class="select select-bordered w-full"
                                value={newItem()[column.key] === undefined ? '' : (newItem()[column.key] as string)}
                                onChange={(e) => handleInput(column.key as keyof Omit<T, 'id'>, e.target.value === '' ? undefined : e.target.value)}
                              >
                                <option value="" disabled>
                                  Pick one
                                </option>
                                <For each={column.customTypeList}>
                                  {(value) => <option value={value}>{value}</option>}
                                </For>
                              </select>
                            ) : (
                              <input
                                type={column.type === 'number' ? 'number' : 'text'}
                                class="input input-bordered w-full"
                                value={(newItem()[column.key] as string) || ''}
                                onInput={(e) => handleInput(column.key as keyof Omit<T, 'id'>, (e.target as HTMLInputElement).value)}
                              />
                            )
                          }
                        >
                          <select
                            class="select select-bordered w-full"
                            value={newItem()[column.key] === true ? "true" : newItem()[column.key] === false ? "false" : ""}
                            onChange={(e) => handleInput(column.key as keyof Omit<T, 'id'>, e.target.value === 'true')}
                          >
                            <option value="" disabled>
                              Pick one
                            </option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </Show>
                      </div>
                    </label>
                  </div>
                )
              }
            </For>
          </div>
          <div class="modal-action flex justify-end">
            <Show when={isEditing()}>
              <button class="btn btn-error btn-outline" onClick={handleDelete}>
                Delete
              </button>
            </Show>
            <div class="flex justify-end w-full">
              <button 
                class="btn mr-2" 
                onClick={handleCreateOrUpdate} 
                disabled={
                  !formValid() || 
                  (isEditing() && !hasUnsavedChanges())
                }
              >
                {isEditing() ? "Edit" : "Create"}
              </button>
              <button class="btn btn-ghost" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
