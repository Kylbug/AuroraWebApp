import TableHeadComponent from '~/components/TableHeadComponent';

export default function TableLayout(props: { children: any }) {
  return (
    <div class="flex flex-col h-full">
      <div class="w-full sticky top-0 z-20">
        <TableHeadComponent />
      </div>
      <div class="flex-1 overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
}
