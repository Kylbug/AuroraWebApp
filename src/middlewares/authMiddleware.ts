import { AuthService } from '~/services/authService';
import PocketBase from 'pocketbase';
import Cookies from 'universal-cookie';
import { useNavigate } from '@solidjs/router';

export class AuthMiddleware {
  private pb: PocketBase;
  private cookies: Cookies;
  private navigate: ReturnType<typeof useNavigate>;

  constructor() {
    this.pb = new PocketBase('http://localhost:8090');
    this.cookies = new Cookies();
    this.navigate = useNavigate();

    const token = this.cookies.get('auth_token');
    console.log('Token:', token);
    if (token) {
      console.log('Restoring token');
      this.pb.authStore.save(token, null);
      console.log('is Token valid:', this.pb.authStore.isValid);
    }
  }

  async checkAuthentication(): Promise<void> {
    if (!this.pb.authStore.isValid) {
      this.navigate('/login'); 
      throw new Error('User is not authenticated');
    }
  }
}
