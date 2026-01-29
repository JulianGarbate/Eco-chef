import api from './api';
import Cookies from 'js-cookie';

export const authService = {
  async register(email: string, password: string) {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    
    // Guardar token en cookies
    Cookies.set('token', token, { expires: 1 }); // 1 día
    
    // Obtener info del usuario y guardar userId
    const userInfo = await this.getMe();
    Cookies.set('userId', userInfo.id, { expires: 1 });
    
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    Cookies.remove('token');
    Cookies.remove('userId');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  isAuthenticated() {
    return !!Cookies.get('token');
  },

  getUserId() {
    return Cookies.get('userId');
  },
};
