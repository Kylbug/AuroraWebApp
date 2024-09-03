import PocketBase from 'pocketbase';
import { Company } from '../models/Company';

export class CompanyRepository {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://localhost:8090');
    this.authenticateAdmin();
  }

  async authenticateAdmin() {
    try {
      await this.pb.admins.authWithPassword('silvan.stoeckli@europa3000.ch', 'Silvan_007');
    } catch (error) {
      console.error('Admin authentication failed:', error);
    }
  }

  async getCompanyById(id: string): Promise<Company> {
    try {
      return await this.pb.collection('companies').getOne(id);
    } catch (error) {
      throw new Error("Company not found");
    }
  }

  async getAllCompanies(): Promise<Company[]> {
    return await this.pb.collection('companies').getFullList();
  }

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    return await this.pb.collection('companies').create({
      ...data,
      created: new Date(),
      updated: new Date(),
    });
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    try {
      return await this.pb.collection('companies').update(id, {
        ...data,
        updated: new Date(),
      });
    } catch (error) {
      throw new Error("Failed to update company");
    }
  }

  async deleteCompany(id: string): Promise<void> {
    try {
      await this.pb.collection('companies').delete(id);
    } catch (error) {
      throw new Error("Failed to delete company");
    }
  }
}
