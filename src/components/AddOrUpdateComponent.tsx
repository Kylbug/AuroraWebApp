import { useParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { TableDAL } from "~/DAL/tableDAL";
import { TableDTO } from "~/DTO/tableDTO";

export default function AddOrUpdateComponent() {
  const params = useParams();
  const isEditing = !!params.id;
  const [formData, setFormData] = createSignal<TableDTO>(
    new TableDTO(0, "", "", false, false, new Date(), new Date())
  );
  
  const tableDAL = new TableDAL();

  onMount(async () => {
    if (isEditing) {
      try {
        const item = await tableDAL.getById(params.tableName, params.id);
        
        setFormData(item);
      } catch (error) {
        console.error("Failed to fetch record:", error);
      }
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const dto = formData();

    try {
      if (isEditing) {
        await tableDAL.update(params.tableName, String(params.id), dto);
        alert("Record updated successfully!");
      } else {
        await tableDAL.create(params.tableName, dto);
        alert("Record created successfully!");
      }
    } catch (error) {
      console.error("Failed to save record:", error);
      alert("Error while saving the record. Please try again.");
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
          value={formData().default ? "true" : "false"}
          onInput={(e) => setFormData({ ...formData(), default: e.currentTarget.value === "true" })}
        />
      </div>
      <button type="submit">{isEditing ? "Update" : "Add"} Item</button>
    </form>
  );
}
