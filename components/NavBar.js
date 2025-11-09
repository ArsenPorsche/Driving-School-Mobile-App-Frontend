import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { navBarStyles } from "../styles/NavBarStyles";
import { chatService } from "../services/api";

const NavBar = ({ role, navigation }) => {
  const [chatUnreadCount, setChatUnreadCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUnreadCount = async () => {
        try {
          // Chats unread (sum over chats)
          const chats = await chatService.getChats();
          const total = (chats.chats || []).reduce((sum, c) => sum + (c.unreadCount || 0), 0);
          setChatUnreadCount(total);
        } catch (error) {
          console.log("Error fetching unread chats count:", error.message);
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
    {role === "student" && (
      <>
        <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
          <Ionicons name="calendar-outline" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Store")}>
          <Ionicons name="bag-outline" size={28} />
        </TouchableOpacity>
      </>
    )}
    {role === "instructor" && (
      <>
        <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
          <Ionicons name="calendar-outline" size={28} />
        </TouchableOpacity>
      </>
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
};

export default NavBar;
