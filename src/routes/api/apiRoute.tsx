import { createRouteData } from "solid-start";
import { Person } from "~/models/Person";

export function routeData(apiRoute: string) {
  return createRouteData(async () => {
    try {
      console.log("GET: " + apiRoute);
      const response = await fetch(apiRoute);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      return jsonData as Person[];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }, {key: 'persons'});
}
