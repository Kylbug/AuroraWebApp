import { createResource, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { TableService } from "~/services/tableService";
import TableComponent from "~/components/TableComponent";
import { TableType } from "~/models/TableType";
import TableLayout from "~/layouts/TableLayout";
import TableManagerLayout from "~/layouts/TableManagerLayout";

const fetchTableData = async (tableName: string) => {
  const tableService = new TableService();
  return await tableService.getAllRecords(tableName) as TableType[];
};

export default function TableName() {
  const params = useParams();
  const [data] = createResource(() => params.tableName, fetchTableData);

  return (
    <TableManagerLayout>
      <TableLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <TableComponent data={data() || []} />
        </Suspense>
      </TableLayout>
    </TableManagerLayout>
  );
}
