import SelectTableComponent from '~/components/SelectTableComponent';
import { Suspense } from 'solid-js';
import TableManagerLayout from '~/layouts/TableManagerLayout';

export default function TableManager() {
  return (
      <TableManagerLayout>
        <div>Welcome to the Table Manager!</div>
      </TableManagerLayout>
  );
}
