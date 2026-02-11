import api from "./apiClient";

export const testApi = {
  getCategories: () => api.get("/tests/categories").then((r) => r.data),

  getTest: (topic) => api.get(`/tests/${topic}`).then((r) => r.data),
};
