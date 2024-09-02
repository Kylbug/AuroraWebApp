import { For, Show, createSignal, onMount } from "solid-js";
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
  onCreate: (newItem: T) => void;
  onUpdate: (id: string, updatedData: Partial<T>) => void;
  onDelete: (id: string) => void;
  onFetch?: () => void;
  fetchPersonById: (id: string) => Promise<T | null>;  // New prop
}

export default function Table<T extends { id: string | number }>(props: TableProps<T>) {

  let newItem = {} as Partial<T>;
  const [formValid, setFormValid] = createSignal(false);
  const [errors, setErrors] = createSignal<Record<string, boolean>>({});
  const [isEditing, setIsEditing] = createSignal(false);
  const [currentId, setCurrentId] = createSignal<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (id: string | null = null) => {
    if (id) {
      setCurrentId(id);
      setIsEditing(true);
      props.fetchPersonById(id).then(existingPerson => {
        if (existingPerson) {
          newItem = { ...(existingPerson as unknown as Partial<T>) };
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
      }).catch(error => {
        console.error("Error fetching person by id:", error);
        navigate(location.pathname, { replace: true });
      });
    } else {
      setCurrentId(null);
      setIsEditing(false);
      newItem = {} as Partial<T>;
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

  const handleCreateOrUpdate = () => {
    if (formValid()) {
      if (isEditing()) {
        props.onUpdate(currentId() as string, newItem as Partial<T>);
      } else {
        props.onCreate(newItem as T);
      }
      closeModal();
    }
  };

  const handleInput = (key: keyof T, value: any) => {
    newItem[key] = value;
    validateForm();
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    props.columns.forEach((column) => {
      if (column.showInForm) {
        const value = newItem[column.key];
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
    console.log("Component mounted, checking URL for id parameter...");
  
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    console.log("URLSearchParams:", params.toString());
    console.log("Extracted id from URL:", id);
  
    if (id) {
      console.log("ID found in URL:", id);
      openModal(id);
    } else {
      console.log("No id parameter found in URL.");
    }
  });

  return (
    <div>
      <div class="flex justify-end mb-4">
        <button class="btn" onClick={() => openModal()}>
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
                        <Show when={errors()[column.key as string]}>
                          <span class="label-text-alt text-red-500">This field is required</span>
                        </Show>
                      </div>
                      <Show
                        when={column.type === 'boolean'}
                        fallback={
                          column.type === 'custom' && column.customTypeList ? (
                            <select
                              class="select select-bordered w-full"
                              value={newItem[column.key] as string}
                              onChange={(e) => handleInput(column.key as keyof Omit<T, 'id'>, e.target.value)}
                            >
                              <option disabled selected value="">
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
                              value={newItem[column.key] as string}
                              onInput={(e) => handleInput(column.key as keyof Omit<T, 'id'>, (e.target as HTMLInputElement).value)}
                            />
                          )
                        }
                      >
                        <select
                          class="select select-bordered w-full"
                          value={newItem[column.key] === true ? "true" : "false"}
                          onChange={(e) => handleInput(column.key as keyof Omit<T, 'id'>, e.target.value === 'true')}
                        >
                          <option disabled selected value="">
                            Pick one
                          </option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </Show>
                    </label>
                  </div>
                )
              }
            </For>
          </div>
          <div class="modal-action flex justify-end">
            <button class="btn mr-2" onClick={handleCreateOrUpdate} disabled={!formValid()}>
              {isEditing() ? "Edit" : "Create"}
            </button>
            <button class="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
