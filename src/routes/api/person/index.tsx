import { APIEvent, json } from "solid-start/api";
import { PersonService } from "~/services/personService";
import { Person } from "~/models/Person";

const personService = new PersonService();

export async function GET() {
  console.log("GET: Anfrage zum Abrufen der Personen gestartet.");

  try {
    console.log("GET: Abrufen der Personen aus dem PersonService...");
    const persons: Person[] = await personService.getAllPersons();
    console.log("GET: Personen erfolgreich abgerufen:", persons);
    
    return json(persons);
  } catch (error) {
    const errorMessage = (error as Error).message || "Failed to fetch persons";
    console.error("GET: Fehler beim Abrufen der Personen:", errorMessage);

    return new Response(errorMessage, { status: 500 });
  }
}


export async function POST({ request }: APIEvent) {
  try {
    const data: Omit<Person, 'id'> = await request.json();
    const newPerson: Person = await personService.createPerson(data);
    return json(newPerson, { status: 201 });
  } catch (error) {
    const errorMessage = (error as Error).message || "Failed to create person";
    return new Response(errorMessage, { status: 400 });
  }
}
