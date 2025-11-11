import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { lessonService } from "../services/api";
import { instructorHistoryStyles as styles } from "../styles/InstructorHistoryStyles";

const InstructorHistory = ({ navigation }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await lessonService.getInstructorHistory();
      setLessons(data);
    } catch (error) {
      console.log("Error loading instructor history:", error);
      Alert.alert("Error", "Failed to load lesson history");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const openResultModal = (lesson) => {
    setSelectedLesson(lesson);
    setResultModalVisible(true);
  };

  const submitResult = async (wynik) => {
    try {
      setSubmitting(true);
      await lessonService.setExamResult(selectedLesson._id, wynik);
      Alert.alert("Success", "Exam result set successfully");
      setResultModalVisible(false);
      loadHistory();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Failed to set exam result");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <Text style={styles.noRating}>No rating yet</Text>;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={18}
          color="#fbbf24"
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultBadgeStyle = (wynik) => {
    switch (wynik) {
      case "passed":
        return styles.passedBadge;
      case "failed":
        return styles.failedBadge;
      default:
        return styles.pendingBadge;
    }
  };

  const getResultText = (wynik) => {
    switch (wynik) {
      case "passed":
        return "Passed";
      case "failed":
        return "Failed";
      default:
        return "Pending";
    }
  };

  const renderLessonItem = ({ item }) => (
    <View style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        <View style={styles.lessonInfo}>
          <View style={styles.typeRow}>
            <Ionicons
              name={item.type === "lesson" ? "car" : "clipboard"}
              size={20}
              color={item.type === "lesson" ? "#1d4ed8" : "#059669"}
            />
            <Text style={styles.lessonType}>
              {item.type === "lesson" ? "Lesson" : "Exam"}
            </Text>
          </View>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          {item.student && (
            <Text style={styles.studentText}>
              Student: {item.student.firstName} {item.student.lastName}
            </Text>
          )}
        </View>
        <View style={[styles.statusBadge, item.status === "completed" ? styles.completedBadge : styles.canceledBadge]}>
          <Text style={styles.statusText}>
            {item.status === "completed" ? "Completed" : "Canceled"}
          </Text>
        </View>
      </View>

      {item.type === "exam" && item.status === "completed" && (
        <View style={styles.examSection}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Result:</Text>
            <View style={[styles.resultBadge, getResultBadgeStyle(item.wynik)]}>
              <Text style={styles.resultText}>{getResultText(item.wynik)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.setResultButton}
            onPress={() => openResultModal(item)}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.setResultText}>Set Result</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.rated && (
        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>Student Rating:</Text>
          {renderStars(item.rating)}
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.title}>Lesson History</Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d4ed8" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Lesson History</Text>
        <View style={styles.backButton} />
      </View>

      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>No lesson history yet</Text>
          </View>
        }
      />

      {/* Result Modal */}
      <Modal
        visible={resultModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setResultModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Exam Result</Text>
            
            {selectedLesson && (
              <View style={styles.lessonDetails}>
                <Text style={styles.detailText}>
                  Student: {selectedLesson.student?.firstName} {selectedLesson.student?.lastName}
                </Text>
                <Text style={styles.detailText}>
                  Date: {formatDate(selectedLesson.date)}
                </Text>
              </View>
            )}

            <View style={styles.resultButtons}>
              <TouchableOpacity
                style={[styles.resultOptionButton, styles.passedButton]}
                onPress={() => submitResult("passed")}
                disabled={submitting}
              >
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
                <Text style={styles.resultOptionText}>Passed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.resultOptionButton, styles.failedButton]}
                onPress={() => submitResult("failed")}
                disabled={submitting}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
                <Text style={styles.resultOptionText}>Failed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.resultOptionButton, styles.pendingButton]}
                onPress={() => submitResult("pending")}
                disabled={submitting}
              >
                <Ionicons name="time" size={24} color="#fff" />
                <Text style={styles.resultOptionText}>Pending</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setResultModalVisible(false)}
              disabled={submitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InstructorHistory;
