import { createResource, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { TableDAL } from "~/DAL/tableDAL";
import TableComponent from "~/components/TableComponent";
import TableLayout from "~/layouts/TableLayout";
import TableManagerLayout from "~/layouts/TableManagerLayout";

const fetchTableData = async (tableName: string) => {
  const tableDAL = new TableDAL();
  const records = await tableDAL.getAll(tableName);

  return records.map(record => ({
    ...record,
    created: record.created?.toISOString(),
    updated: record.updated?.toISOString()
  }));
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
