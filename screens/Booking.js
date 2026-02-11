import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useBalance } from "../hooks/useBalance";
import NavBar from "../components/NavBar";
import { bookingStyles } from "../styles/BookingStyles";

export default function Booking({ navigation }) {
  const { balance, refresh } = useBalance();

  useFocusEffect(React.useCallback(() => { refresh(); }, []));

  const handleLessonBooking = () => {
    if (balance.purchasedLessons > 0) {
      navigation.navigate("BookLesson", { type: "lesson" });
    } else {
      Alert.alert("You have no purchased lessons", "Please purchase lessons before booking.");
    }
  };

  const handleExamBooking = () => {
    if (balance.purchasedExams > 0) {
      navigation.navigate("BookLesson", { type: "exam" });
    } else {
      Alert.alert("You have no purchased exams", "Please purchase exams before booking.");
    }
  };

  return (
    <View style={bookingStyles.container}>
      <View style={bookingStyles.content}>
        <Text style={bookingStyles.title}>Booking</Text>
        <Text style={bookingStyles.description}>
          Book your driving lessons or practical exam.{"\n"}Choose a convenient time and instructor.
        </Text>
        <View style={bookingStyles.optionsContainer}>
          <TouchableOpacity style={bookingStyles.optionCard} onPress={handleLessonBooking}>
            <View style={bookingStyles.optionContent}>
              <Text style={bookingStyles.optionTitle}>Driving lesson</Text>
              <Text style={bookingStyles.optionSubtitle}>
                {balance.purchasedLessons > 0 ? `You have purchased: ${balance.purchasedLessons}` : "No purchased lessons"}
              </Text>
            </View>
            <TouchableOpacity style={bookingStyles.bookButton} onPress={handleLessonBooking}>
              <Text style={bookingStyles.bookButtonText}>Book now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={bookingStyles.optionCard} onPress={handleExamBooking}>
            <View style={bookingStyles.optionContent}>
              <Text style={bookingStyles.optionTitle}>Practical exam</Text>
              <Text style={bookingStyles.optionSubtitle}>
                {balance.purchasedExams > 0 ? `You have purchased: ${balance.purchasedExams}` : "No purchased exams"}
              </Text>
            </View>
            <TouchableOpacity style={bookingStyles.bookButton} onPress={handleExamBooking}>
              <Text style={bookingStyles.bookButtonText}>Book now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}
