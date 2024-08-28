import testData from "../../../testData.json";
import { createSignal, createMemo } from "solid-js";

interface DataElement {
  table: string;
  column: string;
  SQLdatatype: string;
  notNull: boolean;
  default: boolean;
}
interface GroupedData {
  [tableName: string]: DataElement[];
}

const [data] = createSignal<DataElement[]>(testData);
const groupedData = createMemo<GroupedData>(() => {
  return data().reduce<GroupedData>((groups, element) => {
    const table = element.table;
    if (!groups[table]) {
      groups[table] = [];
    }
    groups[table].push(element);
    return groups;
  }, {});
});

export default function TableManager() {
    return (
      <>
        <div class="overflow-x-auto">
          
        </div>
      </>
    );
  }