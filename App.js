import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { instructorService, lessonService } from "./services/api";
import { processLessonsData, createRenderData } from "./utils/dataProcessing";
import { renderItem } from "./components/RenderItem";
import { styles } from "./styles/AppStyles";
import moment from "moment";

export default function App() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [studentName] = useState("Volodymyr");
  const [openInstructorDropdown, setOpenInstructorDropdown] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const { marked, times } = processLessonsData(
      lessons,
      selectedInstructor,
      selectedDate
    );
    setMarkedDates(marked);
    setAvailableTimes(times);
  }, [lessons, selectedInstructor, selectedDate]);

  const loadInitialData = async () => {
    try {
      // Load instructors
      const instructorsData = await instructorService.getInstructors();
      if (Array.isArray(instructorsData)) {
        setInstructors(
          instructorsData.map((instructor) => ({
            label: instructor.name || "Unknown",
            value: instructor._id || instructor.id || "unknown",
          }))
        );
      }

      // Load lessons
      const lessonsData = await lessonService.getLessons();
      setLessons(lessonsData);
    } catch (error) {
      console.log("Error loading initial data:", error.message);
    }
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;

    const hasAvailableLessons = lessons.some(
      (lesson) =>
        lesson.status === "available" &&
        moment(lesson.date).format("YYYY-MM-DD") === dateString
    );

    if (hasAvailableLessons) {
      setSelectedDate(dateString);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (timeValue) => {
    setSelectedTime(timeValue);
  };

  const handleBookLesson = async () => {
    if (selectedInstructor && selectedTime) {
      const lesson = lessons.find(
        (l) =>
          l.instructor._id === selectedInstructor &&
          moment(l.date).format("YYYY-MM-DD HH:mm") === selectedTime
      );

      if (lesson) {
        try {
          await lessonService.bookLesson(lesson._id, studentName);
          alert("Lesson booked successfully!");

          const updatedLessons = await lessonService.getLessons();
          setLessons(updatedLessons);
          setSelectedTime(null);
        } catch (error) {
          alert("Failed to book lesson");
        }
      }
    }
  };

  const renderData = createRenderData(
    selectedInstructor,
    selectedDate,
    selectedTime
  );

  const itemRenderer = (item) =>
    renderItem(item, {
      instructors,
      openInstructorDropdown,
      setOpenInstructorDropdown,
      selectedInstructor,
      setSelectedInstructor,
      markedDates,
      handleDayPress,
      availableTimes,
      selectedTime,
      handleTimeSelect,
      handleBookLesson,
      selectedDate,
    });

  return (
    <View style={styles.container}>
      <FlatList
        data={renderData}
        renderItem={({ item }) => itemRenderer(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
