import PocketBase from 'pocketbase';

export class TableRepository {
  private pb: PocketBase;

  constructor(pb: PocketBase) {
    this.pb = pb;
  }

  async getById(tableName: string, id: string): Promise<any> {
    try {
      return await this.pb.collection(tableName).getOne(id);
    } catch (error) {
      throw new Error(`${tableName} record not found`);
    }
  }

  async getAll(tableName: string): Promise<any[]> {
    try {
      return await this.pb.collection(tableName).getFullList();
    } catch (error) {
      throw new Error(`Failed to fetch records from ${tableName}`);
    }
  }

  async create(tableName: string, data: any): Promise<any> {
    try {
      return await this.pb.collection(tableName).create({
        ...data,
        created: new Date(),
        updated: new Date(),
      });
    } catch (error) {
      throw new Error(`Failed to create record in ${tableName}`);
    }
  }

  async update(tableName: string, id: string, data: any): Promise<any> {
    try {
      return await this.pb.collection(tableName).update(id, {
        ...data,
        updated: new Date(),
      });
    } catch (error) {
      throw new Error(`Failed to update record in ${tableName}`);
    }
  }

  async delete(tableName: string, id: string): Promise<void> {
    try {
      await this.pb.collection(tableName).delete(id);
    } catch (error) {
      throw new Error(`Failed to delete record in ${tableName}`);
    }
  }

  async getAllTables(): Promise<any[]> {
    try {
      return await this.pb.collections.getFullList();
    } catch (error) {
      throw new Error('Failed to fetch list of tables');
    }
  }
}
