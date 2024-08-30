import { refetchRouteData, useRouteData} from "solid-start";
import { Person } from "~/models/Person";
import { routeData } from "~/routes/api/apiRoute";
import { For, Show } from "solid-js";

export default function PersonTable() {
  const persons = useRouteData<typeof routeData>();

  return (
    <div>
      <button class="btn" onClick={() => refetchRouteData('persons')}>Refetch</button>
      <Show when={!persons.loading} fallback={<div>Loading...</div>}>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <For each={["Id", "Column", "Datatype", "NotNull"]}>
                  {(column) => <th>{column}</th>}
                </For>
              </tr>
            </thead>
            <tbody>
              <For each={persons()}>
                {(item) => (
                  <tr class="hover">
                    <For each={Object.values(item)}>
                      {(value) => <td>{value?.toString()}</td>}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
}
