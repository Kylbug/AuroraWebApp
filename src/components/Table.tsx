import { For, Show, createSignal } from "solid-js";

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
  onCreate: (newItem: Omit<T, 'id'>) => void;
  onUpdate: (id: string, updatedData: Partial<T>) => void;
  onDelete: (id: string) => void;
}

export default function Table<T>(props: TableProps<T>) {
  let newItem = {} as Omit<T, 'id'>;
  const [formValid, setFormValid] = createSignal(false);
  const [errors, setErrors] = createSignal<Record<string, boolean>>({});

  const handleCreate = () => {
    if (formValid()) {
      props.onCreate(newItem);
    }
  };

  const handleInput = (key: keyof Omit<T, 'id'>, value: any) => {
    newItem[key] = value;
    validateForm();
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    props.columns.forEach((column) => {
      if (column.showInForm) {
        const value = newItem[column.key as keyof Omit<T, 'id'>];
        if (value === undefined || value === null || value.toString().trim() === '') {
          newErrors[column.key as string] = true;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setFormValid(isValid);
  };

  const openModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div>
      <div class="flex justify-end mb-4">
        <button class="btn" onClick={openModal}>
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
                  <tr class="hover">
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

      {/* Modal for creating a new entry */}
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-4">Create New Entry</h3>
          <div class="py-4">
            <For each={props.columns}>
              {(column) => (
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
                              onChange={(e) =>
                                handleInput(column.key as keyof Omit<T, 'id'>, e.target.value)
                              }
                            >
                              <option disabled selected value="">
                                Pick one
                              </option>
                              <For each={column.customTypeList}>
                                {(value) => (
                                  <option value={value}>{value}</option>
                                )}
                              </For>
                            </select>
                          ) : (
                            <input
                              type={column.type === 'number' ? 'number' : 'text'}
                              class="input input-bordered w-full"
                              onInput={(e) =>
                                handleInput(column.key as keyof Omit<T, 'id'>, (e.target as HTMLInputElement).value)
                              }
                            />
                          )
                        }
                      >
                        <select
                          class="select select-bordered w-full"
                          onChange={(e) =>
                            handleInput(column.key as keyof Omit<T, 'id'>, e.target.value === 'true')
                          }
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
              )}
            </For>
          </div>
          <div class="modal-action flex justify-end">
            <form method="dialog">
              <button class="btn mr-2" onClick={handleCreate} disabled={!formValid()}>Create</button>
              <button class="btn" formmethod="dialog">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
