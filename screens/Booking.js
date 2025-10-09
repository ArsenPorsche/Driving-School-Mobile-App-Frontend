import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import NavBar from "../components/NavBar";
import { bookingStyles } from "../styles/BookingStyles";
import { productService } from "../services/api";

const Booking = ({ navigation, tokenRole }) => {
  const [balance, setBalance] = useState({
    purchasedLessons: 0,
    purchasedExams: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      const loadBalance = async () => {
        try {
          const userBalance = await productService.getUserBalance();
          setBalance(userBalance);
        } catch (error) {
          console.log("Error fetching balance:", error);
        }
      };

      loadBalance();
    }, [])
  );

  const handleLessonBooking = () => {
    if (balance.purchasedLessons > 0) {
      navigation.navigate("BookLesson");
    } else {
      Alert.alert(
        "You have no purchased lessons",
        "Please purchase lessons before booking."
      );
    }
  };

  const handleExamBooking = () => {
    if (balance.purchasedExams > 0) {
      navigation.navigate("BookExam");
    } else {
      Alert.alert(
        "You have no purchased exams",
        "Please purchase exams before booking."
      );
    }
  };

  return (
    <View style={bookingStyles.container}>
      <View style={bookingStyles.content}>
        <Text style={bookingStyles.title}>Booking</Text>
        <Text style={bookingStyles.description}>
          Book your driving lessons or practical exam.{"\n"}
          Choose a convenient time and instructor.
        </Text>

        <View style={bookingStyles.optionsContainer}>
          <TouchableOpacity
            style={bookingStyles.optionCard}
            onPress={handleLessonBooking}
          >
            <View style={bookingStyles.optionContent}>
              <Text style={bookingStyles.optionTitle}>Driving lesson</Text>
              <Text style={bookingStyles.optionSubtitle}>
                {balance.purchasedLessons > 0
                  ? `You have purchased: ${balance.purchasedLessons}`
                  : "No purchased lessons"}
              </Text>
            </View>
            <TouchableOpacity
              style={bookingStyles.bookButton}
              onPress={handleLessonBooking}
            >
              <Text style={bookingStyles.bookButtonText}>Book now</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={bookingStyles.optionCard}
            onPress={handleExamBooking}
          >
            <View style={bookingStyles.optionContent}>
              <Text style={bookingStyles.optionTitle}>Practical exam</Text>
              <Text style={bookingStyles.optionSubtitle}>
                {balance.purchasedExams > 0
                  ? `You have purchased: ${balance.purchasedExams}`
                  : "No purchased exams"}
              </Text>
            </View>
            <TouchableOpacity
              style={bookingStyles.bookButton}
              onPress={handleExamBooking}
            >
              <Text style={bookingStyles.bookButtonText}>Book now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      <NavBar role={tokenRole} navigation={navigation} />
    </View>
  );
};

export default Booking;
