import { For, createEffect, createMemo } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

interface TableComponentProps {
  data: {
    id?: string;
    column: string;
    e3kDatatype: string;
    notNull: boolean;
    default: boolean;
    created?: string;
    updated?: string;
  }[];
}

const parseColumnsFromURL = (columnsParam: string | undefined) => {
  const defaultColumns = [
    { header: "ID", key: "id", active: true },
    { header: "Column", key: "column", active: true },
    { header: "E3K Datatype", key: "e3kDatatype", active: true },
    { header: "Not Null", key: "notNull", active: true },
    { header: "Default", key: "default", active: true },
    { header: "Created", key: "created", active: true },
    { header: "Updated", key: "updated", active: true },
  ];

  if (!columnsParam) return defaultColumns;

  const activeKeys = columnsParam.split(",");
  return defaultColumns.map((column) => ({
    ...column,
    active: activeKeys.includes(column.key),
  }));
};

export default function TableComponent(props: TableComponentProps) {
  const params = useParams();
  const navigate = useNavigate();

  const columns = createMemo(() => parseColumnsFromURL(params.columns));
  const activeColumns = createMemo(() => columns().filter(column => column.active));

  const handleRowClick = (id: string | undefined) => {
    if (id) {
      const tableName = params.tableName;
      navigate(`/tableManager/${tableName}/${id}`);
    }
  };

  createEffect(() => {
    console.log("URL params changed, tableName:", params.tableName);
  });

  return (
    <div class="flex flex-col h-full">
      <div class="flex-grow overflow-y-auto">
        <table class="table min-w-full">
          <thead class="sticky top-0 shadow bg-base-100">
            <tr>
              <For each={activeColumns()}>
                {(column) => <th>{column.header}</th>}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={props.data}>
              {(item) => (
                <tr class="hover" onClick={() => handleRowClick(item.id)}>
                  <For each={activeColumns()}>
                    {(column) => (
                      <td>{item[column.key as keyof typeof item]?.toString()}</td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}
