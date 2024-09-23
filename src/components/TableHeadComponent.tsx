import ColumnDropdownComponent from '~/components/ColumnDropdownComponent';
import SearchBarComponent from '~/components/SearchBarComponent';
import { createSignal, createEffect } from 'solid-js';
import { useNavigate, useParams } from "@solidjs/router";

export default function TableHead() {
  const [search, setSearch] = createSignal('');
  const [tableName, setTableName] = createSignal('');
  const navigate = useNavigate();
  const params = useParams();


  const formatTableName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  createEffect(() => {
    setTableName(formatTableName(params.tableName || ''));
  });

  const handleAddItem = () => {
    navigate(`/tableManager/${params.tableName}/addItem`);
  };

  return (
    <div class="flex flex-col space-y-4 p-4">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">{tableName()}</h1>

        <button class="btn btn-primary text-white" onClick={handleAddItem}>
          Add Item
        </button>


      </div>

      <div class="flex justify-between items-center">
        <SearchBarComponent search={search()} setSearch={setSearch} />
        <ColumnDropdownComponent />
      </div>
    </div>
  );
}
