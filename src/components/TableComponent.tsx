import { For, createEffect, createMemo } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { TableType } from "~/models/TableType";

interface TableComponentProps {
  data: TableType[];
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const columns = createMemo(() => parseColumnsFromURL(searchParams.columns));
  const activeColumns = createMemo(() => columns().filter(column => column.active));

  const handleRowClick = (id: number) => {
    navigate(`/tableManager/${searchParams.tableName}/${id}`);
  };

  createEffect(() => {
    console.log("URL params changed, columns:", searchParams.columns);
  });

  return (
    <div class="flex flex-col h-full">
      {/* Tabelle mit scrollbarem Body */}
      <div class="flex-grow overflow-y-auto">
        <table class="table min-w-full">
          <thead class="sticky top-0 shadow bg-base-100">
            <tr>
              <For each={activeColumns()}>
                {(column) => <th>{column.header}</th>}
              </For>
            </tr>
          </thead>
          <tbody >
            <For each={props.data}>
              {(item) => (
                <tr class="hover" onClick={() => handleRowClick(item.id)}>
                  <For each={activeColumns()}>
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
    </div>
  );
}
