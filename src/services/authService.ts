import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';

export class AuthService {
  private pb: PocketBase;
  private cookies: Cookies;

  constructor() {
    this.pb = new PocketBase('http://localhost:8090');
    this.cookies = new Cookies();
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      this.cookies.set('auth_token', this.pb.authStore.token, { path: '/' });
      return authData;
    } 
    catch (error) {
      console.error('Login failed:', error);
      throw error; 
    }
    
  }

  isLoggedIn(): boolean {
    console.log(this.pb.authStore.isValid);
    return this.pb.authStore.isValid;
  }

  getCurrentUser(): any {
    console.log(this.pb.authStore.model);
    return this.pb.authStore.model;
  }
}
