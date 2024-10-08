import { createSignal } from "solid-js";
import Table, { DisplayColumn } from "~/components/Table";
import { Person } from "~/models/Person";
import { PersonService } from "~/services/personService";
import { XDataTypeList } from "~/models/XDataType";
import TableManagerSidebar from "~/components/TableManagerSidebar";

export default function PersonList() {
  const [persons, setPersons] = createSignal<Person[]>([]);
  const [loading, setLoading] = createSignal(true);
  const personService = new PersonService();

  const customDataTypeOptions = XDataTypeList.map(type => type.label);

  const columns = [
    { header: "ID", key: "id", showInForm: false },
    { header: "Column", key: "column", showInForm: true },
    { header: "Datatype", key: "e3kDatatype", showInForm: true, type: 'custom', customTypeList: customDataTypeOptions },
    { header: "NotNull", key: "notNull", showInForm: true, type: 'boolean' },
    { header: "Created", key: "created", showInForm: false },
    { header: "Updated", key: "updated", showInForm: false }
  ] as DisplayColumn<Person>[];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await personService.getAllPersons();
      setPersons(data);
    } catch (error) {
      console.error("Failed to fetch persons:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonById = async (id: string): Promise<Person | null> => {
    try {
      return await personService.getPersonById(id);
    } catch (error) {
      console.error("Failed to fetch person by id:", error);
      return null;
    }
  };

  const createPerson = async (newPerson: Omit<Person, 'id'>) => {
    try {
      const createdPerson = await personService.createPerson(newPerson);
      setPersons([...persons(), createdPerson]);
    } catch (error) {
      console.error("Failed to create person:", error);
    }
  };

  const updatePerson = async (id: string, updatedData: Partial<Person>) => {
    try {
      const numericId = Number(id);
      const updatedPerson = await personService.updatePerson(id, updatedData);
      setPersons(persons().map(p => p.id === numericId ? updatedPerson : p));
    } catch (error) {
      console.error("Failed to update person:", error);
    }
  };
  
  const deletePerson = async (id: string) => {
    try {
      const numericId = Number(id);
      await personService.deletePerson(id);
      setPersons(persons().filter(p => p.id !== numericId));
    } catch (error) {
      console.error("Failed to delete person:", error);
    }
  };

  return (
    <div class="flex h-full">
      <TableManagerSidebar />
      {/* Main Content */}
      <div class="flex-grow overflow-auto p-4">
        <Table
          data={persons()}
          columns={columns}
          loading={loading()}
          onCreate={createPerson}
          onUpdate={updatePerson}
          onDelete={deletePerson}
          onFetch={fetchData}
          fetchPersonById={fetchPersonById}
        />
      </div>
    </div>
  );
}
