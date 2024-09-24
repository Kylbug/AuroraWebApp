import { useSearchParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";

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

export default function ColumnDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columns, setColumns] = createSignal(parseColumnsFromURL(searchParams.columns));

  createEffect(() => {
    setColumns(parseColumnsFromURL(searchParams.columns));
  });

  const handleToggleColumn = (key: string) => {
    const updatedColumns = columns().map((column) =>
      column.key === key ? { ...column, active: !column.active } : column
    );

    const activeKeys = updatedColumns
      .filter((column) => column.active)
      .map((column) => column.key)
      .join(",");

    setSearchParams({ columns: activeKeys });
  };

  return (
    <div class="dropdown dropdown-bottom dropdown-end z-100">
      <div
        tabindex="0"
        role="button"
        class="btn m-1 btn-sm"
      >
        Columns
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow border border-secondary">
        {columns().map((column) => (
          <li>
            <label class="flex items-center">
              <input
                type="checkbox"
                id={column.key}
                checked={column.active}
                onChange={() => handleToggleColumn(column.key)}
                class="toggle toggle-primary toggle-sm mr-2"
              />
              {column.header}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
