import { For, Show, createEffect, createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import { TableService } from "~/services/tableService";
import { TableType } from "~/models/TableType";

export default function TableComponent() {
  const [data, setData] = createSignal<TableType[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const params = useParams();
  const tableService = new TableService();

  const columns = [
    { header: "ID", key: "id" },
    { header: "Column", key: "column" },
    { header: "E3K Datatype", key: "e3kDatatype" },
    { header: "Not Null", key: "notNull" },
    { header: "Default", key: "default" },
    { header: "Created", key: "created" },
    { header: "Updated", key: "updated" },
  ];

  createEffect(async () => {
    if (params.tableName) {
      setLoading(true);
      try {
        const fetchedData = await tableService.getAllRecords(params.tableName);
        setData(fetchedData as TableType[]);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No table name provided in the URL");
    }
  });

  return (
    <div>
      <Show when={!loading()} fallback={<div>Loading...</div>}>
        <Show when={!error()} fallback={<div>{error()}</div>}>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <For each={columns}>
                    {(column) => <th>{column.header}</th>}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={data()}>
                  {(item) => (
                    <tr class="hover">
                      <For each={columns}>
                        {(column) => (
                          <td>{item[column.key as keyof TableType]?.toString()}</td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Show>
      </Show>
    </div>
  );
}
