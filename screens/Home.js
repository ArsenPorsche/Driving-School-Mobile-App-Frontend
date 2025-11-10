import React, { useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from "../components/NavBar";
import { homeStyles } from "../styles/HomeStyles";
import { productService } from "../services/api";

const Home = ({ navigation, userId, tokenRole }) => {
  const [purchasedLessonsQty, setPurchasedLessonsQty] = useState();
  const [purchasedExamsQty, setPurchasedExamsQty] = useState();

  const loadInitialData = async () => {
    try {
      const balance = await productService.getUserBalance();
      setPurchasedLessonsQty(balance.purchasedLessons);
      setPurchasedExamsQty(balance.purchasedExams);
      console.log("User balance:", balance);
    } catch (error) {
      console.log("Error fetching user balance:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadInitialData();
    }, [userId])
  );

  return (
  <View style={homeStyles.container}>
    <View style={homeStyles.content}>
      <Text style={homeStyles.title}>DriveON</Text>

      <View style={homeStyles.menuContainer}>
        <TouchableOpacity 
          style={homeStyles.menuItem}
          onPress={() => navigation.navigate("Schedule")}
        >
          <LinearGradient
            colors={['#1d4ed8', '#728edbff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={homeStyles.menuGradient}
          >
            <Ionicons name="calendar" size={44} color="white" style={homeStyles.menuIcon} />
            <Text style={homeStyles.menuText}>Schedule</Text>
            <Text style={homeStyles.menuDescription}>View your lessons and exams</Text>
          </LinearGradient>
        </TouchableOpacity>

        {tokenRole === "student" && (
          <>
            <TouchableOpacity 
              style={homeStyles.menuItem}
              onPress={() => navigation.navigate("Store")}
            >
              <LinearGradient
                colors={['#059669', '#34d399']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={homeStyles.menuGradient}
              >
                <Ionicons name="storefront" size={44} color="white" style={homeStyles.menuIcon} />
                <Text style={homeStyles.menuText}>Store</Text>
                <Text style={homeStyles.menuDescription}>Purchase lessons and exams</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={homeStyles.menuItem}
              onPress={() => navigation.navigate("Booking")}
            >
              <LinearGradient
                colors={['#f59e0b', '#fbbf24']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={homeStyles.menuGradient}
              >
                <Ionicons name="clipboard" size={44} color="white" style={homeStyles.menuIcon} />
                <Text style={homeStyles.menuText}>Booking</Text>
                <Text style={homeStyles.menuDescription}>Book your driving sessions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>

      {tokenRole === "student" && (
        <View style={homeStyles.balanceBox}>
          <Text style={homeStyles.balanceTitle}>Your Balance</Text>
          <Text style={homeStyles.balanceLine}>Driving lessons: {purchasedLessonsQty || 0}</Text>
          <Text style={homeStyles.balanceLine}>Practical exams: {purchasedExamsQty || 0}</Text>
        </View>
      )}
    </View>
    <NavBar role={tokenRole} navigation={navigation} />
  </View>
);

};


export default Home;
