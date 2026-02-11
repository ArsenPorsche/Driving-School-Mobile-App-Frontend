import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { instructorApi } from "../services/instructorApi";
import { lessonApi } from "../services/lessonApi";
import { processBookingData, createRenderData } from "../utils/dataProcessing";
import { renderItem } from "../components/RenderItem";
import { styles } from "../styles/AppStyles";
import NavBar from "../components/NavBar";
import moment from "moment";

export default function BookLesson({ navigation, route }) {
  const { token, role } = useAuth();
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("all");
  const [lessons, setLessons] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [openInstructorDropdown, setOpenInstructorDropdown] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const lessonType = route?.params?.type || "lesson";

  useEffect(() => { loadInitialData(); }, [token]);

  useEffect(() => {
    const { marked, groupedTimes } = processBookingData(lessons, selectedInstructor, selectedDate, instructors);
    setMarkedDates(marked);
    setAvailableTimes(groupedTimes);
  }, [lessons, selectedInstructor, selectedDate]);

  const loadInitialData = async () => {
    try {
      const instructorsData = await instructorApi.getInstructors();
      if (Array.isArray(instructorsData)) {
        const options = [
          { label: "All Instructors", value: "all" },
          ...instructorsData.map((i) => ({
            label: `${i.name || "Unknown"}${i.averageRating > 0 ? ` ${i.averageRating.toFixed(1)} ` : ""}`,
            value: i._id || "unknown",
            averageRating: i.averageRating || 0,
            totalRatings: i.totalRatings || 0,
          })),
        ];
        setInstructors(options);
      }
      const lessonsData = await lessonApi.getLessons({ type: lessonType });
      setLessons(lessonsData);
    } catch {
      Alert.alert("Error", "Failed to load data. Please try again.");
    }
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (lessons.some((l) => l.status === "available" && moment(l.date).format("YYYY-MM-DD") === dateString)) {
      setSelectedDate(dateString);
      setSelectedTime(null);
    } else {
      Alert.alert("No lessons available", "Please select another date.");
    }
  };

  const handleTimeSelect = (timeValue, instructorId) => {
    setSelectedTime(timeValue);
    setSelectedInstructor(instructorId);
  };

  const handleBookLesson = async () => {
    if (!selectedTime || !selectedInstructor) {
      Alert.alert("Error", "Please select a time or log in again.");
      return;
    }
    const lesson = lessons.find(
      (l) => l.instructor._id === selectedInstructor && moment(l.date).format("YYYY-MM-DD HH:mm") === selectedTime,
    );
    if (!lesson) return;
    try {
      await lessonApi.bookLesson(lesson._id);
      Alert.alert("Success", "Lesson booked successfully!");
      setLessons((prev) => prev.filter((l) => l._id !== lesson._id));
      setSelectedTime(null);
      setSelectedDate(null);
      setSelectedInstructor("all");
      navigation.navigate("Booking");
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to book lesson");
    }
  };

  const renderData = createRenderData(selectedInstructor, selectedDate, selectedTime, role, lessonType);

  const itemRenderer = (item) =>
    renderItem(item, {
      instructors, openInstructorDropdown, setOpenInstructorDropdown,
      selectedInstructor, setSelectedInstructor, markedDates, handleDayPress,
      availableTimes, selectedTime, handleTimeSelect, handleBookLesson,
      selectedDate, navigation,
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
      <NavBar navigation={navigation} />
    </View>
  );
}
