import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { authService } from "../services/api";
import { styles } from "../styles/LoginStyles";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      onLogin({ token: response.token, user: response.user, refreshToken: response.refreshToken, });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to login";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
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
};

export default Login;