import api from "./apiClient";

export const authApi = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }, { skipAuth: true }).then((r) => r.data),

  register: (firstName, lastName, role, phoneNumber, email, password) =>
    api.post("/auth/register", { firstName, lastName, role, phoneNumber, email, password }).then((r) => r.data),

  validateToken: (token) =>
    api.post("/auth/validate-token", { token }, { skipAuth: true }).then((r) => r.data),

  refreshToken: (refreshToken) =>
    api.post("/auth/refresh-token", { refreshToken }, { skipAuth: true }).then((r) => r.data),

  getAllUsers: () => api.get("/auth/users").then((r) => r.data),

  deleteUser: (userId) => api.delete(`/auth/users/${userId}`).then((r) => r.data),

  activateUser: (userId) => api.patch(`/auth/users/${userId}/activate`).then((r) => r.data),
};
