import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); 

export const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData; 
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      throw error; 
    }
  },
  
  async logout(): Promise<void> {
    pb.authStore.clear();
  },

  async getUser(): Promise<any | null> {

    try {
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh();
        return pb.authStore.model; 
      }
    } catch (error) {
      pb.authStore.clear();
    }

    return null;
  }
};
