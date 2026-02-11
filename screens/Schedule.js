import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, Modal, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { lessonApi } from "../services/lessonApi";
import { processScheduleData, createRenderData, formatDate } from "../utils/dataProcessing";
import { renderItem } from "../components/RenderItem";
import NavBar from "../components/NavBar";
import { styles } from "../styles/AppStyles";
import { ROLES } from "../constants/roles";
import moment from "moment";

export default function Schedule({ navigation }) {
  const { token, role } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeInfo, setSelectedTimeInfo] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [isTimeMenuVisible, setIsTimeMenuVisible] = useState(false);
  const [selectedTimeForMenu, setSelectedTimeForMenu] = useState(null);
  const [dateOffer, setDateOffer] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => { loadInitialData(); }, [token]);

  useEffect(() => {
    const { marked, groupedTimes } = processScheduleData(lessons, selectedDate);
    setMarkedDates(marked);
    setAvailableTimes(groupedTimes);
  }, [lessons, selectedDate]);

  const loadInitialData = async () => {
    try {
      const data = role === ROLES.INSTRUCTOR
        ? await lessonApi.getInstructorsLessons()
        : await lessonApi.getStudentLessons();
      setLessons(data);
    } catch {
      Alert.alert("Error", "Failed to load data. Please try again.");
    }
  };

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    if (lessons.some((l) => moment(l.date).format("YYYY-MM-DD") === dateString)) {
      setSelectedDate(dateString);
    } else {
      Alert.alert("No lessons available", "Please select another date.");
    }
  };

  const handleTimeSelect = (timeValue, lessonId, timeInfo = null) => {
    setSelectedTime(timeValue);
    setSelectedLesson(lessonId);
    setSelectedTimeForMenu(timeValue);
    setSelectedTimeInfo(timeInfo);
    setIsTimeMenuVisible(true);
  };

  const handleGenerateAction = async () => {
    try {
      if (role === ROLES.INSTRUCTOR) {
        const lessonsDate = await lessonApi.getLessonOffer();
        setDateOffer(lessonsDate);
        if (!lessonsDate) Alert.alert("Error", "You have not free hours.");
      } else {
        handleCancelLesson();
      }
    } catch {
      Alert.alert("Error", "Failed to generate lesson offer.");
    }
  };

  const handleCancelLesson = async () => {
    try {
      const response = await lessonApi.cancelLesson(selectedLesson);
      setLessons((prev) => prev.filter((l) => l._id !== selectedLesson));
      const msg = response.refunded
        ? `Lesson cancelled and refunded (cancelled ${response.hoursBefore}h before)`
        : `Lesson cancelled (cancelled ${response.hoursBefore}h before - no refund)`;
      Alert.alert("Success", msg);
      setIsTimeMenuVisible(false);
      setSelectedTime(null);
      setSelectedTimeInfo(null);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Failed to cancel lesson");
    }
  };

  const handleAcceptAction = async () => {
    const { newLesson } = await lessonApi.changeLesson(selectedLesson, dateOffer);
    setLessons((prev) => {
      const updated = prev.filter((l) => l._id !== selectedLesson);
      return [...updated, newLesson].sort((a, b) => moment(a.date) - moment(b.date));
    });
    Alert.alert("Lesson has canceled", selectedTimeForMenu);
    setSelectedTime(null);
    setIsTimeMenuVisible(false);
    setDateOffer(null);
  };

  const handleCloseAction = () => {
    setSelectedTime(null);
    setSelectedTimeInfo(null);
    setIsTimeMenuVisible(false);
    setDateOffer(null);
  };

  const renderData = createRenderData(null, selectedDate, null, role, "schedule");

  const itemRenderer = (item) =>
    renderItem(item, { markedDates, handleDayPress, availableTimes, selectedDate, selectedTime, handleTimeSelect });

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
      <Modal transparent visible={isTimeMenuVisible} animationType="fade" onRequestClose={() => setIsTimeMenuVisible(false)}>
        <View style={styles.modalOverlay}>
          {!dateOffer ? (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Selected Time: {formatDate(selectedTimeForMenu)}</Text>
              {selectedTimeInfo && (
                <>
                  <Text style={styles.modalText}>Type: {selectedTimeInfo.lessonType === "exam" ? "Exam" : "Lesson"}</Text>
                  {role === ROLES.INSTRUCTOR && selectedTimeInfo.studentName && (
                    <Text style={styles.modalText}>Student: {selectedTimeInfo.studentName}</Text>
                  )}
                  {role === ROLES.STUDENT && selectedTimeInfo.instructorName && (
                    <Text style={styles.modalText}>Instructor: {selectedTimeInfo.instructorName}</Text>
                  )}
                </>
              )}
              <TouchableOpacity style={styles.modalButton} onPress={handleGenerateAction}>
                <Text style={styles.modalButtonText}>Cancel lesson</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseAction}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Old Time: {formatDate(selectedTimeForMenu)}</Text>
              <Text style={styles.modalText}>Time Proposal: {formatDate(dateOffer)}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleAcceptAction}>
                <Text style={styles.modalButtonText}>Accept Lesson & Cancel old One</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleGenerateAction}>
                <Text style={styles.modalButtonText}>Generate another Time</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseAction}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
