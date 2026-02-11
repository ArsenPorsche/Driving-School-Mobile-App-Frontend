import api from "./apiClient";

export const instructorApi = {
  getInstructors: () => api.get("/instructors").then((r) => r.data),

  getInstructorRating: () => api.get("/instructors/rating").then((r) => r.data),
};
