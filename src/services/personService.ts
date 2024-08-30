import { PersonRepository } from "~/repositories/personRepository";
import { Person } from "~/models/Person";

export class PersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new PersonRepository();
  }

  async getPersonById(id: string): Promise<Person> {
    return await this.personRepository.getPersonById(id);
  }

  async getAllPersons(): Promise<Person[]> {
    return await this.personRepository.getAllPersons();
  }

  async createPerson(data: Omit<Person, 'id'>): Promise<Person> {
    if (data.default) {
      throw new Error("Cannot create a person with a default column.");
    }
    return await this.personRepository.createPerson(data);
  }

  async updatePerson(id: string, data: Partial<Person>): Promise<Person> {
    const existingPerson = await this.personRepository.getPersonById(id);
    if (existingPerson.default) {
      throw new Error("Cannot update a person with a default column.");
    }
    return await this.personRepository.updatePerson(id, data);
  }

  async deletePerson(id: string): Promise<void> {
    const existingPerson = await this.personRepository.getPersonById(id);
    if (existingPerson.default) {
      throw new Error("Cannot delete a person with a default column.");
    }
    return await this.personRepository.deletePerson(id);
  }
}
