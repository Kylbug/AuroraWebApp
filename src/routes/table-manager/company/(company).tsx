import { createSignal } from "solid-js";
import Table, { DisplayColumn } from "~/components/Table";
import { Company } from "~/models/Company";
import { CompanyService } from "~/services/companyService";
import { XDataTypeList } from "~/models/XDataType";
import TableManagerSidebar from "~/components/TableManagerSidebar";

export default function CompanyList() {
  const [companies, setCompanies] = createSignal<Company[]>([]);
  const [loading, setLoading] = createSignal(true);
  const companyService = new CompanyService();

  const customDataTypeOptions = XDataTypeList.map(type => type.label);

  const columns = [
    { header: "ID", key: "id", showInForm: false },
    { header: "Column", key: "column", showInForm: true },
    { header: "Datatype", key: "e3kDatatype", showInForm: true, type: 'custom', customTypeList: customDataTypeOptions },
    { header: "NotNull", key: "notNull", showInForm: true, type: 'boolean' },
    { header: "Created", key: "created", showInForm: false },
    { header: "Updated", key: "updated", showInForm: false }
  ] as DisplayColumn<Company>[];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await companyService.getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyById = async (id: string): Promise<Company | null> => {
    try {
      return await companyService.getCompanyById(id);
    } catch (error) {
      console.error("Failed to fetch company by id:", error);
      return null;
    }
  };

  const createCompany = async (newCompany: Omit<Company, 'id'>) => {
    try {
      const createdCompany = await companyService.createCompany(newCompany);
      setCompanies([...companies(), createdCompany]);
    } catch (error) {
      console.error("Failed to create company:", error);
    }
  };

  const updateCompany = async (id: string, updatedData: Partial<Company>) => {
    try {
      const numericId = Number(id);
      const updatedCompany = await companyService.updateCompany(id, updatedData);
      setCompanies(companies().map(p => p.id === numericId ? updatedCompany : p));
    } catch (error) {
      console.error("Failed to update company:", error);
    }
  };
  
  const deleteCompany = async (id: string) => {
    try {
      const numericId = Number(id);
      await companyService.deleteCompany(id);
      setCompanies(companies().filter(p => p.id !== numericId));
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  };

  return (
    <div class="flex h-full">
      <TableManagerSidebar />
      {/* Main Content */}
      <div class="flex-grow overflow-auto p-4">
        <Table
          data={companies()}
          columns={columns}
          loading={loading()}
          onCreate={createCompany}
          onUpdate={updateCompany}
          onDelete={deleteCompany}
          onFetch={fetchData}
          fetchPersonById={fetchCompanyById}
        />
      </div>
    </div>
  );
}
