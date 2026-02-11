import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { chatApi } from "../services/chatApi";
import { ROLES } from "../constants/roles";
import { navBarStyles } from "../styles/NavBarStyles";

export default function NavBar({ navigation }) {
  const { role } = useAuth();
  const [chatUnreadCount, setChatUnreadCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUnreadCount = async () => {
        try {
          const data = await chatApi.getChats();
          const total = (data.chats || []).reduce((sum, c) => sum + (c.unreadCount || 0), 0);
          setChatUnreadCount(total);
        } catch {
          // silently ignore
        }
      };
      fetchUnreadCount();
    }, [])
  );

  return (
    <View style={navBarStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home-outline" size={28} />
      </TouchableOpacity>

      {role === ROLES.STUDENT && (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
            <Ionicons name="calendar-outline" size={28} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Store")}>
            <Ionicons name="bag-outline" size={28} />
          </TouchableOpacity>
        </>
      )}

      {role === ROLES.INSTRUCTOR && (
        <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
          <Ionicons name="calendar-outline" size={28} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Chats")} style={navBarStyles.notificationButton}>
        <Ionicons name="chatbubble-outline" size={28} />
        {chatUnreadCount > 0 && (
          <View style={navBarStyles.badge}>
            <Text style={navBarStyles.badgeText}>{chatUnreadCount > 99 ? "99+" : chatUnreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-outline" size={28} />
      </TouchableOpacity>
    </View>
  );
}
