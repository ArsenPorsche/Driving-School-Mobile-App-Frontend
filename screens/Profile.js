import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import NavBar from "../components/NavBar";
import { profileStyles } from "../styles/ProfileStyles";

export default function Profile({ navigation }) {
  const { role, logout } = useAuth();

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.header}>
        <Text style={profileStyles.headerText}>My profile</Text>
      </View>
      <TouchableOpacity style={profileStyles.menuItem} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={profileStyles.menuText}>Edit profile</Text>
      </TouchableOpacity>
      {role === ROLES.STUDENT && (
        <TouchableOpacity style={profileStyles.menuItem} onPress={() => navigation.navigate("LessonHistory")}>
          <Text style={profileStyles.menuText}>Lesson History</Text>
        </TouchableOpacity>
      )}
      {role === ROLES.STUDENT && (
        <TouchableOpacity style={profileStyles.menuItem} onPress={() => navigation.navigate("TestCategories")}>
          <Text style={profileStyles.menuText}>Theory Tests</Text>
        </TouchableOpacity>
      )}
      {role === ROLES.INSTRUCTOR && (
        <TouchableOpacity style={profileStyles.menuItem} onPress={() => navigation.navigate("InstructorHistory")}>
          <Text style={profileStyles.menuText}>Lesson History</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={profileStyles.menuItem} onPress={logout}>
        <Text style={profileStyles.menuText}>Logout</Text>
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </View>
  );
}
