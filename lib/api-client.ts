import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or custom headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const data = error.response?.data;
    const message = (data && typeof data === 'object' && 'message' in data) ? (data as { message: string }).message : (typeof data === 'string' ? data : error.message || "An error occurred");
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
