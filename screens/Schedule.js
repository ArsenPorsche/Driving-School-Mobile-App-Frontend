import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { lessonService } from "../services/api";
import { processScheduleData, createRenderData } from "../utils/dataProcessing";
import { renderItem } from "../components/RenderItem";
import { styles } from "../styles/AppStyles";
import moment from "moment";

const Schedule = ({ token, userId, userRole }) => {
  const [lessons, setLessons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadInitialData();
  }, [token]);

  useEffect(() => {
    const { marked, times } = processScheduleData(lessons, selectedDate);
    setMarkedDates(marked);
    setAvailableTimes(times);
  }, [lessons, selectedDate]);

  const loadInitialData = async () => {
    try {
      console.log("Loading lessons for instructorId:", userId);
      const lessonsData = await lessonService.getInstructorsLessons(token, userId);
      setLessons(lessonsData);
    } catch (error) {
      Alert.alert("Error", "Failed to load data. Please try again.");
    }
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    const hasAvailableLessons = lessons.some(
      (lesson) => moment(lesson.date).format("YYYY-MM-DD") === dateString
    );
    if (hasAvailableLessons) {
      setSelectedDate(dateString);
    } else {
      Alert.alert("No lessons available", "Please select another date.");
    }
  };

  const handleTimeSelect = (timeValue) => {
    setSelectedTime(timeValue);
  };

  
  const renderData = createRenderData(null, selectedDate, null, userRole);

  const itemRenderer = (item) =>
    renderItem(item, {
      markedDates,
      handleDayPress,
      availableTimes,
      selectedDate,
      selectedTime,
      handleTimeSelect
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
};

export default Schedule;