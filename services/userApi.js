import api from "./apiClient";

export const userApi = {
  getProfile: () => api.get("/auth/profile").then((r) => r.data),

  updateProfile: (updates) => api.put("/auth/profile", updates).then((r) => r.data),

  registerPushToken: (token) => api.post("/auth/push-token", { token }).then((r) => r.data),
};
