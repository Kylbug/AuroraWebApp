import PocketBase from 'pocketbase';
import { Person } from '../models/Person';

export class PersonRepository {
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

  async getPersonById(id: string): Promise<Person> {
    try {
      return await this.pb.collection('personen').getOne(id);
    } catch (error) {
      throw new Error("Person not found");
    }
  }

  async getAllPersons(): Promise<Person[]> {
    return await this.pb.collection('personen').getFullList();
  }

  async createPerson(data: Omit<Person, 'id'>): Promise<Person> {
    return await this.pb.collection('personen').create({
      ...data,
      created: new Date(),
      updated: new Date(),
    });
  }

  async updatePerson(id: string, data: Partial<Person>): Promise<Person> {
    try {
      return await this.pb.collection('personen').update(id, {
        ...data,
        updated: new Date(),
      });
    } catch (error) {
      throw new Error("Failed to update person");
    }
  }

  async deletePerson(id: string): Promise<void> {
    try {
      await this.pb.collection('personen').delete(id);
    } catch (error) {
      throw new Error("Failed to delete person");
    }
  }
}
