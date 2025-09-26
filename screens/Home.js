import React, { useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import NavBar from "../components/NavBar";
import { homeStyles } from "../styles/HomeStyles";
import { lessonService } from "../services/api";

const Home = ({ navigation, token, userId, tokenRole }) => {
  const [purchasedLessonsQty, setPurchasedLessonsQty] = useState();
  const [purchasedExamsQty, setPurchasedExamsQty] = useState();

  const loadInitialData = async () => {
    try {
      const lessons = await lessonService.getPurchasedLessons(userId);
      setPurchasedLessonsQty(lessons.purchasedLessons);
      setPurchasedExamsQty(lessons.purchasedExams);
      console.log("Purchased lessons:", lessons);
    } catch (error) {
      console.log("Error fetching purchased lessons:", error);
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
      <Image source={require("../assets/car.png")} style={homeStyles.image} />
      <Text style={homeStyles.sectionTitle}>You have purchased:</Text>
      <Text style={homeStyles.text}>Driving lessons - {purchasedLessonsQty}</Text>
      <Text style={homeStyles.text}>Practical exams - {purchasedExamsQty}</Text>
      {/* Buttons can be added later */}
    </View>
    <NavBar role={tokenRole} navigation={navigation} />
  </View>
);

};


export default Home;
