import PocketBase from 'pocketbase';
import { TableDTO } from '~/DTO/tableDTO';

export class TableDAL {
  private pb: PocketBase;
  private authPromise: Promise<void>;

  constructor() {
    this.pb = new PocketBase('http://localhost:8090/');
    this.authPromise = this.authenticateAdmin();
  }

  private async authenticateAdmin(): Promise<void> {
    try {
      if (!this.pb.authStore.isValid) {
        await this.pb.admins.authWithPassword('silvan.stoeckli@europa3000.ch', 'Silvan_007');
        console.log("Admin successfully authenticated.");
      }
    } catch (error) {
      console.error("Failed to authenticate admin:", error);
    }
  }

  private async ensureAuthenticated(): Promise<void> {
    await this.authPromise;
    if (!this.pb.authStore.isValid) {
      throw new Error("User is not authenticated.");
    }
  }

  private mapToDTO(data: any): TableDTO {
    return new TableDTO(
      data.id,
      data.column,
      data.e3kDatatype,
      data.notNull,
      data.default,
      new Date(data.created),
      new Date(data.updated)
    );
  }

  private mapToData(dto: TableDTO): any {
    const data = { ...dto };
    delete data.id; 
    return data;
  }

  async getById(tableName: string, id: string): Promise<TableDTO> {
    await this.ensureAuthenticated();
    try {
      const record = await this.pb.collection(tableName).getOne(id);
      return this.mapToDTO(record);
    } catch (error) {
      throw new Error(`${tableName} record not found`);
    }
  }

  async getAll(tableName: string): Promise<TableDTO[]> {
    await this.ensureAuthenticated();
    try {
      const records = await this.pb.collection(tableName).getFullList();
      return records.map(record => this.mapToDTO(record));
    } catch (error) {
      throw new Error(`Failed to fetch records from ${tableName}`);
    }
  }

  async create(tableName: string, dto: TableDTO): Promise<TableDTO> {
    await this.ensureAuthenticated();
    if (dto.default) {
      throw new Error("Cannot create a record with a default column.");
    }
    try {
      const data = this.mapToData(dto);
      const createdRecord = await this.pb.collection(tableName).create({
        ...data,
        created: new Date(),
        updated: new Date(),
      });
      return this.mapToDTO(createdRecord);
    } catch (error) {
      throw new Error(`Failed to create record in ${tableName}`);
    }
  }

  async update(tableName: string, id: string, dto: TableDTO): Promise<TableDTO> {
    await this.ensureAuthenticated();
    const existingRecord = await this.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot update a record with a default column.");
    }
    try {
      const data = this.mapToData(dto);
      const updatedRecord = await this.pb.collection(tableName).update(id, {
        ...data,
        updated: new Date(),
      });
      return this.mapToDTO(updatedRecord);
    } catch (error) {
      throw new Error(`Failed to update record in ${tableName}`);
    }
  }

  async delete(tableName: string, id: string): Promise<void> {
    await this.ensureAuthenticated();
    const existingRecord = await this.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot delete a record with a default column.");
    }
    try {
      await this.pb.collection(tableName).delete(id);
    } catch (error) {
      throw new Error(`Failed to delete record in ${tableName}`);
    }
  }

  async getAllTables(): Promise<string[]> {
    await this.ensureAuthenticated();
    try {
      const tables = await this.pb.collections.getFullList();
      return tables.map((table: any) => table.name);
    } catch (error) {
      throw new Error('Failed to fetch list of tables');
    }
  }
}
