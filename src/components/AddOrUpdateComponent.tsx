import { useParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { TableService } from "~/services/tableService";

export default function AddOrUpdateComponent() {
  const params = useParams();
  const isEditing = !!params.id;  // Prüfen, ob eine ID vorhanden ist -> dann bearbeiten
  const [formData, setFormData] = createSignal({
    column: "",
    e3kDatatype: "",
    notNull: false,
    default: "",
  });

  const tableService = new TableService();

  onMount(async () => {
    if (isEditing) {
      const item = await tableService.getRecordById(params.tableName, params.id);
      setFormData(item);
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (isEditing) {
      await tableService.updateRecord(params.tableName, params.id, formData());
    } else {
      await tableService.createRecord(params.tableName, formData());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Column</label>
        <input
          type="text"
          value={formData().column}
          onInput={(e) => setFormData({ ...formData(), column: e.currentTarget.value })}
        />
      </div>
      <div>
        <label>E3K Datatype</label>
        <input
          type="text"
          value={formData().e3kDatatype}
          onInput={(e) => setFormData({ ...formData(), e3kDatatype: e.currentTarget.value })}
        />
      </div>
      <div>
        <label>Not Null</label>
        <input
          type="checkbox"
          checked={formData().notNull}
          onChange={(e) => setFormData({ ...formData(), notNull: e.currentTarget.checked })}
        />
      </div>
      <div>
        <label>Default</label>
        <input
          type="text"
          value={formData().default}
          onInput={(e) => setFormData({ ...formData(), default: e.currentTarget.value })}
        />
      </div>
      <button type="submit">{isEditing ? "Update" : "Add"} Item</button>
    </form>
  );
}
