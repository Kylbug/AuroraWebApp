import { routeData } from "~/routes/api/apiRoute";
import Table from "~/components/Table";
import { Person } from "~/models/Person";
import { useRouteData } from "solid-start";

export function myRouteData() {
  return routeData("/api/person");
}

export default function PersonList() {
  const columns = ["Id", "Column", "Datatype", "NotNull"];
  const persons = useRouteData();

  return (
    <div>
      <h1>Personenliste</h1>
      <Table<Person> columns={columns} data={persons()} />
    </div>
  );
}
