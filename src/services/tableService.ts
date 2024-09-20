import { TableRepository } from "~/repositories/tableRepository";
import { AuthMiddleware } from "~/middlewares/authMiddleware";

export class TableService {
  private tableRepository: TableRepository;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.tableRepository = new TableRepository();
    this.authMiddleware = new AuthMiddleware();
  }

  async getRecordById(tableName: string, id: string): Promise<any> {
    await this.authMiddleware.checkAuthentication(); 
    return await this.tableRepository.getById(tableName, id);
  }

  async getAllRecords(tableName: string): Promise<any[]> {
    await this.authMiddleware.checkAuthentication(); 
    return await this.tableRepository.getAll(tableName);
  }

  async createRecord(tableName: string, data: any): Promise<any> {
    await this.authMiddleware.checkAuthentication(); 
    if (data.default) {
      throw new Error("Cannot create a record with a default column.");
    }
    return await this.tableRepository.create(tableName, data);
  }

  async updateRecord(tableName: string, id: string, data: any): Promise<any> {
    await this.authMiddleware.checkAuthentication();
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot update a record with a default column.");
    }
    return await this.tableRepository.update(tableName, id, data);
  }

  async deleteRecord(tableName: string, id: string): Promise<void> {
    await this.authMiddleware.checkAuthentication(); 
    const existingRecord = await this.tableRepository.getById(tableName, id);
    if (existingRecord.default) {
      throw new Error("Cannot delete a record with a default column.");
    }
    return await this.tableRepository.delete(tableName, id);
  }

  async getAllTables(): Promise<any[]> {
    await this.authMiddleware.checkAuthentication();
    return await this.tableRepository.getAllTables();
    console.log('tried to fetch tables');
  }
}
