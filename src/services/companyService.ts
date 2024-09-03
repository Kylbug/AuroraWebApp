import { CompanyRepository } from "~/repositories/companyRepository";
import { Company } from "~/models/Company";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async getCompanyById(id: string): Promise<Company> {
    return await this.companyRepository.getCompanyById(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.getAllCompanies();
  }

  async createCompany(data: Omit<Company, 'id'>): Promise<Company> {
    if (data.default) {
      throw new Error("Cannot create a company with a default column.");
    }
    return await this.companyRepository.createCompany(data);
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const existingCompany = await this.companyRepository.getCompanyById(id);
    if (existingCompany.default) {
      throw new Error("Cannot update a company with a default column.");
    }
    return await this.companyRepository.updateCompany(id, data);
  }

  async deleteCompany(id: string): Promise<void> {
    const existingCompany = await this.companyRepository.getCompanyById(id);
    if (existingCompany.default) {
      throw new Error("Cannot delete a company with a default column.");
    }
    return await this.companyRepository.deleteCompany(id);
  }
}
