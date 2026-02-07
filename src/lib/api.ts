import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with interceptor to add auth token
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors (token expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Product {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  productUrl?: string;
  etsyListingId?: string;
  source: 'manual' | 'etsy';
  category?: string;
  variants: Array<{
    size?: string;
    color?: string;
    price?: number;
    stock?: number;
  }>;
  targetBuyers?: string;
  painPoints?: string;
  images: string[];
  defaultImage?: string;
  videoUrl?: string;
  pinsPerDay: number;
  imagesPerDay: number;
  videosPerDay: number;
  automationMode: 'automatic' | 'manual';
  status: 'active' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const response = await axiosInstance.get('/products');
      return response.data;
    },
    getById: async (id: string): Promise<Product> => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    },
    create: async (data: FormData): Promise<Product> => {
      try {
        console.log("API: Sending create request");
        console.log("FormData contents:");
        for (const [key, value] of data.entries()) {
          console.log(`${key}:`, value);
        }
        const response = await axiosInstance.post('/products', data);
        console.log("API: Request successful");
        return response.data;
      } catch (error) {
        console.error("API: Request failed", error);
        throw error;
      }
    },
    update: async (id: string, data: FormData): Promise<Product> => {
      const response = await axiosInstance.put(`/products/${id}`, data);
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await axiosInstance.delete(`/products/${id}`);
    },
    duplicate: async (id: string): Promise<Product> => {
      try {
        console.log("API: Duplicating product", id);
        const response = await axiosInstance.post(`/products/${id}/duplicate`);
        console.log("API: Duplicate successful");
        return response.data;
      } catch (error) {
        console.error("API: Duplicate failed", error);
        throw error;
      }
    },


    generatePin: async (id: string): Promise<{ success: boolean; message: string; pin?: any }> => {
      try {
        console.log("API: Generating pin for product", id);
        const response = await axiosInstance.post(`/products/${id}/generate-pin`);
        return response.data;
      } catch (error: any) {
        console.error("API: Generate pin failed", error.response?.data || error.message);
        throw error;
      }
    },
    generatePainPoints: async (data: { title: string; description?: string }): Promise<{ painPoints: string }> => {
      try {
        const response = await axiosInstance.post('/products/generate-pain-points', data);
        return response.data;
      } catch (error: any) {
        console.error("API: Generate pain points failed", error.response?.data || error.message);
        throw error;
      }
    },
  },
  pins: {
    getAll: async (): Promise<any[]> => {
      const response = await axiosInstance.get('/pins');
      return response.data;
    },
    approve: async (id: string): Promise<{ success: boolean; message: string }> => {
      try {
        const response = await axiosInstance.post(`/pins/${id}/approve`);
        return response.data;
      } catch (error: any) {
        console.error("API: Approve pin failed", error.response?.data || error.message);
        throw error;
      }
    },
    delete: async (id: string): Promise<void> => {
      await axiosInstance.delete(`/pins/${id}`);
    },
    update: async (id: string, data: { title?: string; description?: string; board?: string; scheduledTime?: string }): Promise<any> => {
      try {
        const response = await axiosInstance.put(`/pins/${id}`, data);
        return response.data;
      } catch (error: any) {
        console.error("API: Update pin failed", error.response?.data || error.message);
        throw error;
      }
    }
  },
  auth: {
    login: async (data: { email: string; password: string }) => {
      try {
        if (!data.email || !data.password) {
          throw new Error("Email and password are required");
        }

        // Don't use interceptor for login/register - no token yet
        const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
        console.log("API: Login successful");
        return response.data;
      } catch (error: any) {
        console.error("API: Login failed", error.response?.data || error.message);
        throw error;
      }
    },
    register: async (data: { name: string; email: string; password: string; business_name: string; timezone: string }) => {
      try {
        // Don't use interceptor for login/register - no token yet
        const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return response.data;
      } catch (error: any) {
        console.error("API: Registration failed", error.response?.data || error.message);
        throw error;
      }
    },
  },
  pinterest: {
    saveCredentials: async (data: { email: string; password: string }): Promise<{ success: boolean; message: string }> => {
      try {
        console.log("API: Saving Pinterest credentials");
        const response = await axiosInstance.post('/pinterest/credentials', data);
        return response.data;
      } catch (error: any) {
        console.error("API: Save credentials failed", error.response?.data || error.message);
        throw error;
      }
    },
    connect: async (): Promise<{ success: boolean; message: string; userId?: string }> => {
      try {
        console.log("API: Connecting to Pinterest");
        const response = await axiosInstance.post('/pinterest/connect');
        console.log("API: Pinterest connected successfully");
        return response.data;
      } catch (error: any) {
        console.error("API: Pinterest connect failed", error.response?.data || error.message);
        throw error;
      }
    },
    getStatus: async (): Promise<{ authenticated: boolean; authenticatedAt?: string }> => {
      try {
        const response = await axiosInstance.get('/pinterest/status');
        return response.data;
      } catch (error: any) {
        console.error("API: Pinterest status check failed", error.response?.data || error.message);
        throw error;
      }
    },
    createPin: async (data: { title: string; description?: string; imagePath?: string; board?: string }): Promise<{ success: boolean; message: string }> => {
      try {
        console.log("API: Creating Pinterest pin");
        const response = await axiosInstance.post('/pinterest/create-pin', data);
        console.log("API: Pin created successfully");
        return response.data;
      } catch (error: any) {
        console.error("API: Pinterest pin creation failed", error.response?.data || error.message);
        throw error;
      }
    },
  },
};
