import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const { BASE_URL } = Constants.expoConfig.extra;

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  if (config.skipAuth) return config;
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !original.skipAuth) {
      original._retry = true;
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
          await SecureStore.setItemAsync("token", data.token);
          await SecureStore.setItemAsync("refreshToken", data.refreshToken);
          original.headers.Authorization = `Bearer ${data.token}`;
          return api(original);
        } catch {
          // refresh failed — let the error propagate
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
