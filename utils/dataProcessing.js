import moment from "moment";
import { COLORS } from "../constants/theme";

/**
 * Simple groupBy utility (replaces lodash _.groupBy)
 */
const groupBy = (array, keyFn) => {
  const result = {};
  for (const item of array) {
    const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const processBookingData = (lessons, selectedInstructor, selectedDate, instructors = []) => {
  const marked = {};

  const availableDates = lessons
    .filter((lesson) => lesson.status === "available")
    .map((lesson) => moment(lesson.date).format("YYYY-MM-DD"));

  availableDates.forEach((date) => {
    const lessonsForDate = lessons.filter(
      (lesson) => lesson.status === "available" && moment(lesson.date).format("YYYY-MM-DD") === date
    );
    if (lessonsForDate.length > 0) {
      marked[date] = { marked: true, dotColor: COLORS.calendarDot, selectedColor: COLORS.calendarDot };
    }
  });

  if (selectedDate) {
    marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: COLORS.accent };
  }

  let groupedTimes = [];
  if (selectedDate) {
    const availableLessons = lessons.filter(
      (lesson) =>
        (selectedInstructor === "all" || selectedInstructor === null || lesson.instructor._id === selectedInstructor) &&
        lesson.status === "available" &&
        moment(lesson.date).format("YYYY-MM-DD") === selectedDate
    );

    const groupedByInstructor = groupBy(availableLessons, (l) => l.instructor._id);

    groupedTimes = Object.entries(groupedByInstructor).map(([instructorId, instructorLessons]) => {
      const instructorData = instructors.find((inst) => inst.value === instructorId);
      const rating = instructorData?.averageRating || 0;
      const ratingText = rating > 0 ? `  ${rating.toFixed(1)} ` : "";

      return {
        instructorId,
        instructorName:
          `${instructorLessons[0].instructor.firstName} ${instructorLessons[0].instructor.lastName}`.trim() + ratingText,
        times: instructorLessons
          .map((lesson) => ({
            label: `${moment(lesson.date).format("HH:mm")} - ${moment(lesson.date).add(2, "hours").format("HH:mm")}`,
            value: moment(lesson.date).format("YYYY-MM-DD HH:mm"),
            sortValue: moment(lesson.date).valueOf(),
            lessonId: lesson._id,
          }))
          .sort((a, b) => a.sortValue - b.sortValue),
      };
    });

    groupedTimes.sort((a, b) => a.instructorName.localeCompare(b.instructorName));
  }

  return { marked, groupedTimes };
};

export const processScheduleData = (lessons, selectedDate) => {
  const marked = {};

  const availableDates = lessons.map((lesson) => moment(lesson.date).format("YYYY-MM-DD"));

  availableDates.forEach((date) => {
    const lessonsForDate = lessons.filter(
      (lesson) => moment(lesson.date).format("YYYY-MM-DD") === date
    );

    if (lessonsForDate.length > 0) {
      marked[date] = { marked: true, dotColor: COLORS.calendarDot, selectedColor: COLORS.calendarDot };
      if (lessonsForDate.some((lesson) => lesson.status === "booked")) {
        marked[date] = { ...marked[date], dotColor: COLORS.calendarBooked, selectedColor: COLORS.calendarBooked };
      }
    }
  });

  if (selectedDate) {
    marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: COLORS.accent };
  }

  let groupedTimes = [];
  if (selectedDate) {
    const lessonsForSelectedDate = lessons.filter(
      (lesson) => moment(lesson.date).format("YYYY-MM-DD") === selectedDate
    );

    const groupedByStatus = groupBy(lessonsForSelectedDate, "status");

    groupedTimes = Object.entries(groupedByStatus).map(([statusName, statusLessons]) => ({
      statusName: capitalize(statusName),
      times: statusLessons
        .map((lesson) => ({
          label: `${moment(lesson.date).format("HH:mm")} - ${moment(lesson.date).add(2, "hours").format("HH:mm")}`,
          value: moment(lesson.date).format("YYYY-MM-DD HH:mm"),
          sortValue: moment(lesson.date).valueOf(),
          lessonId: lesson._id,
          lessonType: lesson.type,
          studentName: lesson.student ? `${lesson.student.firstName} ${lesson.student.lastName}` : null,
          instructorName: lesson.instructor ? `${lesson.instructor.firstName} ${lesson.instructor.lastName}` : null,
        }))
        .sort((a, b) => a.sortValue - b.sortValue),
    }));
  }
  return { marked, groupedTimes };
};

export const createRenderData = (selectedInstructor, selectedDate, selectedTime, userRole, lessonType = "lesson") => {
  switch (userRole) {
    case "instructor":
      return [
        { type: "scheduleHeader", id: "scheduleHeader", lessonType },
        { type: "calendar", id: "calendar" },
        ...(selectedDate ? [{ type: "instructorsTimes", id: "instructorsTimes" }] : []),
      ];

    case "student":
      if (lessonType === "schedule") {
        return [
          { type: "scheduleHeader", id: "scheduleHeader" },
          { type: "calendar", id: "calendar" },
          ...(selectedDate ? [{ type: "instructorsTimes", id: "instructorsTimes" }] : []),
        ];
      }
      return [
        { type: "header", id: "header", lessonType },
        { type: "instructor", id: "instructor" },
        { type: "calendar", id: "calendar" },
        ...(selectedInstructor && selectedDate
          ? [
              { type: "times", id: "times" },
              ...(selectedTime ? [{ type: "button", id: "button", lessonType }] : []),
              { type: "info", id: "info" },
            ]
          : []),
      ];

    default:
      return null;
  }
};

export function formatDate(dateIso) {
  const d = new Date(dateIso);
  const date = d.toLocaleDateString("pl-PL");
  const time = d.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  return `${date} ${time}`;
}
