import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userApi } from "../services/userApi";
import { editProfileStyles } from "../styles/EditProfileStyles";

export default function EditProfile() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userApi.getProfile().then((data) => setPhoneNumber(data.phoneNumber || "")).catch(() => {});
  }, []);

  const validateInputs = () => {
    if (newPassword?.trim()) {
      if (!currentPassword?.trim()) { Alert.alert("Error", "Current password is required to set new password"); return false; }
      if (newPassword !== confirmPassword) { Alert.alert("Error", "New passwords do not match"); return false; }
    }
    if (!phoneNumber?.trim() && !newPassword?.trim()) { Alert.alert("No Changes", "Please enter a phone number or password to update"); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const updates = {};
      if (phoneNumber?.trim()) updates.phoneNumber = phoneNumber.trim();
      if (newPassword?.trim()) { updates.currentPassword = currentPassword; updates.newPassword = newPassword; }
      await userApi.updateProfile(updates);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      Alert.alert("Success", "Profile updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to update profile";
      Alert.alert("Error", msg.replace(/"/g, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={editProfileStyles.container}>
      <ScrollView style={editProfileStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={editProfileStyles.title}>Edit Profile</Text>
        <View style={editProfileStyles.section}>
          <Text style={editProfileStyles.sectionTitle}>Phone Number</Text>
          <TextInput style={editProfileStyles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter phone number" keyboardType="phone-pad" maxLength={11} />
        </View>
        <View style={editProfileStyles.section}>
          <Text style={editProfileStyles.sectionTitle}>Change Password</Text>
          <TextInput style={editProfileStyles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current password" secureTextEntry />
          <TextInput style={editProfileStyles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New password" secureTextEntry />
          <TextInput style={editProfileStyles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm new password" secureTextEntry />
        </View>
        <TouchableOpacity style={[editProfileStyles.saveButton, loading && editProfileStyles.saveButtonDisabled]} onPress={handleSave} disabled={loading}>
          <Text style={editProfileStyles.saveButtonText}>{loading ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={editProfileStyles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={editProfileStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
