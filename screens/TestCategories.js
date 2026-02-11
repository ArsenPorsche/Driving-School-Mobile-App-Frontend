import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { testApi } from "../services/testApi";
import { styles } from "../styles/TestStyles";

export default function TestCategories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await testApi.getCategories();
      setCategories(data);
    } catch (e) {
      Alert.alert("Error", `Failed to load test categories: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2d4150" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Theory Questions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Choose a topic to practice</Text>
        {categories.map((cat) => (
          <View key={cat.topic} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
            </View>
            {cat.description && <Text style={styles.categoryDescription}>{cat.description}</Text>}
            <Text style={styles.categoryInfo}>{cat.questionsCount} questions</Text>
            <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("TestQuiz", { topic: cat.topic })}>
              <Text style={styles.startButtonText}>Practice</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
