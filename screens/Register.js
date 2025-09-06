import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { authService } from "../services/api";
import { styles } from "../styles/LoginStyles";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("student");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openRoleDropdown, setRoleDropdown] = useState(false);

  const handleRegister = async () => {
    try {
      setError(null);
      const response = await authService.register(
        firstName,
        lastName,
        role,
        phoneNumber,
        email,
        password
      );
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhoneNumber("")
      setPassword("")
      setRole("student")
      Alert.alert("Success", "User registered!");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to register";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drive On</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        autoCapitalize="words"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        autoCapitalize="words"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

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

      <View style={[styles.pickerContainer, { zIndex: 1000 }]}>
        <DropDownPicker
          open={openRoleDropdown}
          value={role}
          items={[
            { label: "Student", value: "student" },
            { label: "Instructor", value: "instructor" },
            { label: "Admin", value: "admin" },
          ]}
          setOpen={setRoleDropdown}
          setValue={setRole}
          placeholder="Select role"
          style={styles.picker}
          dropDownContainerStyle={styles.dropDown}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Register;
