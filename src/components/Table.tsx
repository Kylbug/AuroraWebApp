import { For } from "solid-js";

export default function Table<T extends { [key: string]: any }>(props: { columns: string[], data: T[] | undefined }) {
  return (
    <div class="overflow-x-auto">
      {!props.data ? (
        <div>Loading...</div>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <For each={props.columns}>{(column) => <th>{column}</th>}</For>
            </tr>
          </thead>
          <tbody>
            <For each={props.data}>
              {(item) => (
                <tr class="hover">
                  <For each={Object.values(item)}>
                    {(value) => <td>{value?.toString()}</td>}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      )}
    </div>
  );
}
