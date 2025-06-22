import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create a singleton for API service
class ApiService {
  private static instance: ApiService;
  private token: string | null = null;
  
  private constructor() {
    // Check for token in localStorage when instantiated
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }
  
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  // Set auth token for API calls
  public setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  
  // Clear token (for logout)
  public clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  
  // Get auth headers
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-auth-token': this.token || ''
    };
  }
  
  // Authentication API calls
  public async register(username: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    return response.data;
  }
  
  public async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    this.setToken(response.data.token);
    return response.data;
  }
  
  public async getCurrentUser() {
    if (!this.token) return null;
    const response = await axios.get(`${API_URL}/auth/me`, { headers: this.getHeaders() });
    return response.data;
  }
  
  // Prompt API calls
  public async getPrompts() {
    const response = await axios.get(`${API_URL}/prompts`, { headers: this.getHeaders() });
    return response.data;
  }
  
  public async createPrompt(promptData: any) {
    const response = await axios.post(`${API_URL}/prompts`, promptData, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }
  
  public async updatePrompt(id: string, promptData: any) {
    const response = await axios.put(`${API_URL}/prompts/${id}`, promptData, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }
  
  public async deletePrompt(id: string) {
    const response = await axios.delete(`${API_URL}/prompts/${id}`, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }
  
  // Post generation and management
  public async generatePost(promptData: any) {
    const response = await axios.post(`${API_URL}/posts/generate`, promptData, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }
  
  public async savePost(postData: any) {
    const response = await axios.post(`${API_URL}/posts`, postData, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }
  
  public async getPosts() {
    const response = await axios.get(`${API_URL}/posts`, { headers: this.getHeaders() });
    return response.data;
  }
  public async deletePost(id: string) {
    const response = await axios.delete(`${API_URL}/posts/${id}`, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }

  // User profile management
  public async updateUserProfile(updates: { username?: string }) {
    const response = await axios.patch(`${API_URL}/auth/profile`, updates, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }

  public async changeUserPassword(currentPassword: string, newPassword: string) {
    const response = await axios.patch(`${API_URL}/auth/change-password`, 
      { currentPassword, newPassword }, 
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  public async deleteUserAccount() {
    const response = await axios.delete(`${API_URL}/auth/account`, { 
      headers: this.getHeaders() 
    });
    return response.data;
  }

  // Admin API calls
  public async getAdminDashboard() {
    const response = await axios.get(`${API_URL}/admin/dashboard`, { headers: this.getHeaders() });
    return response.data;
  }

  public async getAdminUsers(page: number = 1, search: string = '') {
    const params = new URLSearchParams({ page: page.toString(), search });
    const response = await axios.get(`${API_URL}/admin/users?${params}`, { headers: this.getHeaders() });
    return response.data;
  }

  public async updateAdminUser(id: string, updates: { isActive?: boolean; role?: string }) {
    const response = await axios.patch(`${API_URL}/admin/users/${id}`, updates, { headers: this.getHeaders() });
    return response.data;
  }

  public async deleteAdminUser(id: string) {
    const response = await axios.delete(`${API_URL}/admin/users/${id}`, { headers: this.getHeaders() });
    return response.data;
  }

  public async getApiAnalytics(days: number = 30) {
    const response = await axios.get(`${API_URL}/admin/analytics/api-usage?days=${days}`, { headers: this.getHeaders() });
    return response.data;
  }

  public async getGeminiAnalytics(days: number = 30) {
    const response = await axios.get(`${API_URL}/admin/analytics/gemini-usage?days=${days}`, { headers: this.getHeaders() });
    return response.data;
  }
}

// Export a singleton instance
export const apiService = ApiService.getInstance();

// Export convenience functions for profile management
export const updateUserProfile = (updates: { username?: string }) => 
  apiService.updateUserProfile(updates);

export const changeUserPassword = (currentPassword: string, newPassword: string) => 
  apiService.changeUserPassword(currentPassword, newPassword);

export const deleteUserAccount = () => 
  apiService.deleteUserAccount();
