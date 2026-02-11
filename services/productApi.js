import api from "./apiClient";

export const productApi = {
  getProducts: async () => {
    const { data } = await api.get("/products");
    const list = Array.isArray(data) ? data : data?.data || [];
    return list.filter((p) => p.active !== false);
  },

  getAllProductsAdmin: async () => {
    const { data } = await api.get("/products/all");
    return Array.isArray(data) ? data : data?.data || [];
  },

  getProductByCode: (code) => api.get(`/products/${code}`).then((r) => r.data),

  createOrder: (items) => {
    const orderItems = items.map((item) => ({
      productCode: item.id || item.code,
      quantity: item.qty || 1,
    }));
    return api.post("/products/orders", { items: orderItems }).then((r) => r.data);
  },

  getUserOrders: (page = 1, limit = 10) =>
    api.get("/products/orders/my", { params: { page, limit } }).then((r) => r.data),

  getOrderById: (orderId) => api.get(`/products/orders/${orderId}`).then((r) => r.data),

  getUserBalance: () => api.get("/products/balance").then((r) => r.data),

  createProduct: (data) => api.post("/products", data).then((r) => r.data),

  updateProduct: (productId, data) => api.put(`/products/${productId}`, data).then((r) => r.data),

  deleteProduct: (productId) => api.delete(`/products/${productId}`).then((r) => r.data),

  activateProduct: (productId) => api.patch(`/products/${productId}/activate`).then((r) => r.data),
};
