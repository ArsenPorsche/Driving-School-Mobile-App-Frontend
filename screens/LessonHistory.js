import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { lessonApi } from "../services/lessonApi";
import { lessonHistoryStyles as styles } from "../styles/LessonHistoryStyles";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("uk-UA", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const RESULT_CONFIG = {
  passed: { style: "passedBadge", text: "Passed" },
  failed: { style: "failedBadge", text: "Failed" },
};

export default function LessonHistory({ navigation }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await lessonApi.getLessonHistory();
      setLessons(data);
    } catch {
      Alert.alert("Error", "Failed to load lesson history");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(React.useCallback(() => { loadHistory(); }, []));

  const openRatingModal = (lesson) => {
    setSelectedLesson(lesson);
    setRating(lesson.rating || 0);
    setRatingModalVisible(true);
  };

  const submitRating = async () => {
    if (rating === 0) { Alert.alert("Error", "Please select a rating"); return; }
    try {
      setSubmitting(true);
      await lessonApi.rateLesson(selectedLesson._id, rating);
      Alert.alert("Success", "Rating submitted successfully");
      setRatingModalVisible(false);
      loadHistory();
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (currentRating, onPress = null) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity key={i} onPress={onPress ? () => onPress(i) : null} disabled={!onPress} style={styles.starButton}>
          <Ionicons name={i <= currentRating ? "star" : "star-outline"} size={onPress ? 36 : 18} color="#fbbf24" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const getResultConfig = (wynik) => RESULT_CONFIG[wynik] || { style: "pendingBadge", text: "Pending" };

  const renderLessonItem = ({ item }) => {
    const result = getResultConfig(item.wynik);
    return (
      <View style={styles.lessonCard}>
        <View style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <View style={styles.typeRow}>
              <Ionicons name={item.type === "lesson" ? "car" : "clipboard"} size={20} color={item.type === "lesson" ? "#1d4ed8" : "#059669"} />
              <Text style={styles.lessonType}>{item.type === "lesson" ? "Driving Lesson" : "Practical Exam"}</Text>
            </View>
            <Text style={styles.lessonDate}>{formatDate(item.date)}</Text>
            <Text style={styles.instructorName}>Instructor: {item.instructor?.firstName} {item.instructor?.lastName}</Text>
          </View>
          <View style={[styles.statusBadge, item.status === "completed" ? styles.statusCompleted : styles.statusCanceled]}>
            <Text style={styles.statusText}>{item.status === "completed" ? "Completed" : "Canceled"}</Text>
          </View>
        </View>

        {item.type === "exam" && (
          <View style={styles.examSection}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Exam result:</Text>
              <View style={[styles.resultBadge, styles[result.style]]}><Text style={styles.resultText}>{result.text}</Text></View>
            </View>
          </View>
        )}

        {item.status === "completed" && (
          <View style={styles.ratingSection}>
            {item.rated ? (
              <View style={styles.ratedContainer}>
                <Text style={styles.ratingLabel}>Your rating:</Text>
                {renderStars(item.rating)}
              </View>
            ) : (
              <TouchableOpacity style={styles.rateButton} onPress={() => openRatingModal(item)}>
                <Ionicons name="star" size={20} color="white" />
                <Text style={styles.rateButtonText}>Rate this lesson</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Lesson History</Text>
        <View style={styles.backButton} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#1d4ed8" /></View>
      ) : (
        <FlatList data={lessons} renderItem={renderLessonItem} keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={64} color="#d1d5db" />
              <Text style={styles.emptyText}>No lesson history yet</Text>
            </View>
          } />
      )}

      <Modal visible={ratingModalVisible} transparent animationType="fade" onRequestClose={() => setRatingModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Your Lesson</Text>
            <Text style={styles.modalSubtitle}>How was your experience with {selectedLesson?.instructor?.firstName}?</Text>
            {renderStars(rating, setRating)}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setRatingModalVisible(false)} disabled={submitting}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.submitButton]} onPress={submitRating} disabled={submitting}>
                {submitting ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Submit</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
