import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../hooks/useBalance";
import { instructorApi } from "../services/instructorApi";
import NavBar from "../components/NavBar";
import { homeStyles } from "../styles/HomeStyles";
import { ROLES } from "../constants/roles";

export default function Home({ navigation }) {
  const { role, userId } = useAuth();
  const { balance, refresh: refreshBalance } = useBalance();
  const [instructorRating, setInstructorRating] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (role === ROLES.STUDENT) {
        refreshBalance();
      } else if (role === ROLES.INSTRUCTOR) {
        instructorApi.getInstructorRating().then(setInstructorRating).catch(() => {});
      }
    }, [userId, role]),
  );

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.content}>
        <Text style={homeStyles.title}>DriveON</Text>

        <View style={homeStyles.menuContainer}>
          <TouchableOpacity style={homeStyles.menuItem} onPress={() => navigation.navigate("Schedule")}>
            <LinearGradient colors={["#1d4ed8", "#728edbff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={homeStyles.menuGradient}>
              <Ionicons name="calendar" size={44} color="white" style={homeStyles.menuIcon} />
              <Text style={homeStyles.menuText}>Schedule</Text>
              <Text style={homeStyles.menuDescription}>View your lessons and exams</Text>
            </LinearGradient>
          </TouchableOpacity>

          {role === ROLES.STUDENT && (
            <>
              <TouchableOpacity style={homeStyles.menuItem} onPress={() => navigation.navigate("Store")}>
                <LinearGradient colors={["#059669", "#34d399"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={homeStyles.menuGradient}>
                  <Ionicons name="storefront" size={44} color="white" style={homeStyles.menuIcon} />
                  <Text style={homeStyles.menuText}>Store</Text>
                  <Text style={homeStyles.menuDescription}>Purchase lessons and exams</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={homeStyles.menuItem} onPress={() => navigation.navigate("Booking")}>
                <LinearGradient colors={["#f59e0b", "#fbbf24"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={homeStyles.menuGradient}>
                  <Ionicons name="clipboard" size={44} color="white" style={homeStyles.menuIcon} />
                  <Text style={homeStyles.menuText}>Booking</Text>
                  <Text style={homeStyles.menuDescription}>Book your driving sessions</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>

        {role === ROLES.STUDENT && (
          <View style={homeStyles.balanceBox}>
            <Text style={homeStyles.balanceTitle}>Your Balance</Text>
            <Text style={homeStyles.balanceLine}>Driving lessons: {balance.purchasedLessons}</Text>
            <Text style={homeStyles.balanceLine}>Practical exams: {balance.purchasedExams}</Text>
          </View>
        )}

        {role === ROLES.INSTRUCTOR && instructorRating && (
          <View style={homeStyles.balanceBox}>
            <Text style={homeStyles.balanceTitle}>Your Rating</Text>
            <View style={homeStyles.ratingRow}>
              <Text style={homeStyles.ratingValue}>{instructorRating.average.toFixed(1)}</Text>
              <Ionicons name="star" size={24} color="#fbbf24" />
            </View>
          </View>
        )}
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}
