import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { adminHomeStyles as styles } from "../styles/AdminHomeStyles";

export default function AdminHome({ navigation }) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.subtitle}>DriveON Management System</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UserManagement")}>
          <LinearGradient colors={["#1d4ed8", "#728edbff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.menuGradient}>
            <Ionicons name="people" size={40} color="white" />
            <Text style={styles.menuText}>User Management</Text>
            <Text style={styles.menuDescription}>Manage users and registrations</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ProductManagement")}>
          <LinearGradient colors={["#059669", "#34d399"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.menuGradient}>
            <Ionicons name="storefront" size={40} color="white" />
            <Text style={styles.menuText}>Product Management</Text>
            <Text style={styles.menuDescription}>Manage store products</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out" size={18} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
