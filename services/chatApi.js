import api from "./apiClient";

export const chatApi = {
  getChats: () => api.get("/chats").then((r) => r.data),

  getMessages: (chatId, params = {}) =>
    api.get(`/chats/${chatId}/messages`, { params }).then((r) => r.data),

  sendMessage: (partnerId, text) =>
    api.post("/chats/send", { partnerId, text }).then((r) => r.data),

  markChatRead: (chatId) => api.patch(`/chats/${chatId}/read`).then((r) => r.data),
};
