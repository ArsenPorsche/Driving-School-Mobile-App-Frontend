import api from "./apiClient";

export const lessonApi = {
  getLessons: (params = {}) => {
    const { type = "lesson", ...rest } = params;
    return api.get("/lessons", { params: { type, ...rest } }).then((r) => r.data);
  },

  bookLesson: (lessonId) => api.post("/lessons/book", { lessonId }).then((r) => r.data),

  getInstructorsLessons: () => api.get("/lessons/instructors").then((r) => r.data),

  getStudentLessons: () => api.get("/lessons/student").then((r) => r.data),

  cancelLesson: (lessonId) => api.post("/lessons/cancel", { lessonId }).then((r) => r.data),

  getLessonOffer: () => api.get("/lessons/offer").then((r) => r.data),

  changeLesson: (oldLessonId, newDate) =>
    api.post("/lessons/change", { oldLessonId, newDate }).then((r) => r.data),

  getLessonHistory: () => api.get("/lessons/history").then((r) => r.data),

  rateLesson: (lessonId, rating) =>
    api.post(`/lessons/${lessonId}/rate`, { rating }).then((r) => r.data),

  getInstructorHistory: () => api.get("/lessons/instructor-history").then((r) => r.data),

  setExamResult: (lessonId, wynik) =>
    api.post(`/lessons/${lessonId}/result`, { wynik }).then((r) => r.data),
};
