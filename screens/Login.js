import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../services/authApi";
import { styles } from "../styles/LoginStyles";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const response = await authApi.login(email, password);
      await login({
        token: response.token,
        user: response.user,
        refreshToken: response.refreshToken,
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to login";
      setError(msg);
      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DriveOn</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
