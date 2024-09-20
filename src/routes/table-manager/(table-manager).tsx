import SelectTableComponent from '~/components/SelectTableComponent';
import { Suspense } from 'solid-js';

export default function TableManager(props : any) {
  return (
    <>
      <SelectTableComponent />
      <Suspense>{props.children}</Suspense>
    </>
  );
}
