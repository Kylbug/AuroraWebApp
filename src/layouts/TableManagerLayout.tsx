import { createSignal, onMount } from 'solid-js';
import { TableService } from '~/services/tableService';
import SelectTableComponent from '~/components/SelectTableComponent';

const [tables, setTables] = createSignal<{name: string}[]>([]);
const [isLoading, setIsLoading] = createSignal(true);
const fetchTables = async () => {
  const tableService = new TableService();
  const fetchedTables = await tableService.getAllTables();
  setTables(fetchedTables);
  setIsLoading(false);
};

export default function TableManagerLayout(props: {children: any}) {
  onMount(async () => {
    if (tables().length === 0) {
      await fetchTables();
    }
  });

  return (
    <div class="flex h-full">
      <div class="h-full w-64 flex-shrink-0 sticky top-0">
        {isLoading() ? ( 
          <div>Loading...</div>
        ) : (
          <SelectTableComponent 
            tables={tables()}
            errorMessage={null}
          />
        )}
      </div>
      <div class="flex-1 overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}
