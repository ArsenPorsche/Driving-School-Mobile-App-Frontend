import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ROLES } from "./constants/roles";
import { COLORS } from "./constants/theme";

// Screens
import Login from "./screens/Login";
import Home from "./screens/Home";
import Schedule from "./screens/Schedule";
import Booking from "./screens/Booking";
import BookLesson from "./screens/BookLesson";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Store from "./screens/Store";
import Checkout from "./screens/Checkout";
import Chats from "./screens/Chats";
import ChatThread from "./screens/ChatThread";
import LessonHistory from "./screens/LessonHistory";
import InstructorHistory from "./screens/InstructorHistory";
import TestCategories from "./screens/TestCategories";
import TestQuiz from "./screens/TestQuiz";
import TestResults from "./screens/TestResults";
import AdminHome from "./screens/AdminHome";
import UserManagement from "./screens/UserManagement";
import ProductManagement from "./screens/ProductManagement";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//  Stack groups 
function AdminStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="ProductManagement" component={ProductManagement} />
    </Stack.Navigator>
  );
}

function StudentStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="BookLesson" component={BookLesson} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="LessonHistory" component={LessonHistory} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatThread" component={ChatThread} />
      <Stack.Screen name="TestCategories" component={TestCategories} />
      <Stack.Screen name="TestQuiz" component={TestQuiz} />
      <Stack.Screen name="TestResults" component={TestResults} />
    </Stack.Navigator>
  );
}

function InstructorStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="InstructorHistory" component={InstructorHistory} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatThread" component={ChatThread} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

//  Root navigator 
function RootNavigator() {
  const { role, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={{ marginTop: 20, fontSize: 16, color: COLORS.textSecondary }}>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) return <AuthStack />;
  if (role === ROLES.ADMIN) return <AdminStack />;
  if (role === ROLES.INSTRUCTOR) return <InstructorStack />;
  return <StudentStack />;
}

//  App root 
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
