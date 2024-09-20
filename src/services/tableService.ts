import { TableRepository } from "~/repositories/tableRepository";
import PocketBase from "pocketbase";

export class TableService {
  private tableRepository: TableRepository;
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://localhost:8090');
    this.tableRepository = new TableRepository(this.pb);
  }

  // Prüft, ob der Benutzer eingeloggt ist
  private isAuthenticated() {
    if (!this.pb.authStore.isValid) {
      throw new Error("User is not authenticated.");
    }
  }

  async getRecordById(tableName: string, id: string): Promise<any> {
    this.isAuthenticated(); // Authentifizierung prüfen
    return await this.tableRepository.getById(tableName, id);
  }

  async getAllRecords(tableName: string): Promise<any[]> {
    this.isAuthenticated(); // Authentifizierung prüfen
    return await this.tableRepository.getAll(tableName);
  }

  async createRecord(tableName: string, data: any): Promise<any> {
    this.isAuthenticated(); // Authentifizierung prüfen
    if (data.default) {
      throw new Error("Cannot create a record with a default column.");
    }
    return await this.tableRepository.create(tableName, data);
  }

  async updateRecord(tableName: string, id: string, data: any): Promise<any> {
    this.isAuthenticated(); // Authentifizierung prüfen
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot update a record with a default column.");
    }
    return await this.tableRepository.update(tableName, id, data);
  }

  async deleteRecord(tableName: string, id: string): Promise<void> {
    this.isAuthenticated(); // Authentifizierung prüfen
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot delete a record with a default column.");
    }
    return await this.tableRepository.delete(tableName, id);
  }

  async getAllTables(): Promise<any[]> {
    this.isAuthenticated(); // Authentifizierung prüfen
    return await this.tableRepository.getAllTables();
  }
}
