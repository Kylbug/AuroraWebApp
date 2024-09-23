import { TableRepository } from "~/repositories/tableRepository";
import PocketBase from "pocketbase";

export class TableService {
  private tableRepository: TableRepository;
  private pb: PocketBase;
  private authPromise: Promise<void>; // Promise, um auf die Authentifizierung zu warten

  constructor() {
    this.pb = new PocketBase('http://localhost:8090/');
    this.tableRepository = new TableRepository(this.pb);
    this.authPromise = this.authenticateAdmin(); // Authentifizierung wird beim Erstellen gestartet
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

  async getRecordById(tableName: string, id: string): Promise<any> {
    await this.ensureAuthenticated();
    return await this.tableRepository.getById(tableName, id);
  }

  async getAllRecords(tableName: string): Promise<any[]> {
    await this.ensureAuthenticated();
    return await this.tableRepository.getAll(tableName);
  }

  async createRecord(tableName: string, data: any): Promise<any> {
    await this.ensureAuthenticated();
    if (data.default) {
      throw new Error("Cannot create a record with a default column.");
    }
    return await this.tableRepository.create(tableName, data);
  }

  async updateRecord(tableName: string, id: string, data: any): Promise<any> {
    await this.ensureAuthenticated();
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot update a record with a default column.");
    }
    return await this.tableRepository.update(tableName, id, data);
  }

  async deleteRecord(tableName: string, id: string): Promise<void> {
    await this.ensureAuthenticated();
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot delete a record with a default column.");
    }
    return await this.tableRepository.delete(tableName, id);
  }

  async getAllTables(): Promise<any[]> {
    await this.ensureAuthenticated();
    return await this.tableRepository.getAllTables();
  }
}
