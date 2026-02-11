import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator,
  Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authApi } from "../services/authApi";
import { userManagementStyles as styles } from "../styles/UserManagementStyles";

const INITIAL_FORM = { firstName: "", lastName: "", email: "", phoneNumber: "", password: "", role: "student" };

export default function UserManagement({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await authApi.getAllUsers();
      setUsers(response.data || []);
    } catch {
      Alert.alert("Error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId) => {
    Alert.alert("Deactivate User", "Make this user inactive? They will no longer be able to log in.", [
      { text: "Cancel", style: "cancel" },
      { text: "Deactivate", style: "destructive", onPress: async () => {
        try { await authApi.deleteUser(userId); Alert.alert("Success", "User deactivated"); loadUsers(); }
        catch (e) { Alert.alert("Error", e.response?.data?.message || "Failed to deactivate user"); }
      }},
    ]);
  };

  const handleActivateUser = async (userId) => {
    try { await authApi.activateUser(userId); Alert.alert("Success", "User activated"); loadUsers(); }
    catch (e) { Alert.alert("Error", e.response?.data?.message || "Failed to activate user"); }
  };

  const handleRegister = async () => {
    try {
      setRegisterLoading(true);
      await authApi.register(form.firstName, form.lastName, form.role, form.phoneNumber, form.email, form.password);
      Alert.alert("Success", "User registered");
      setModalVisible(false);
      setForm(INITIAL_FORM);
      loadUsers();
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || e.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const renderUserItem = ({ item }) => {
    const inactive = item.active === false;
    return (
      <View style={styles.userCard}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userRole}>Role: {item.role}</Text>
          <Text style={[styles.userRole, inactive && { color: "#dc2626" }]}>Status: {inactive ? "Inactive" : "Active"}</Text>
          {item.phoneNumber && <Text style={styles.userPhone}>Phone: {item.phoneNumber}</Text>}
        </View>
        {inactive ? (
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleActivateUser(item._id)}>
            <Ionicons name="refresh-circle" size={28} color="#16a34a" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item._id)}>
            <Ionicons name="remove-circle" size={24} color="#dc2626" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const updateField = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>User Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="person-add" size={24} color="#1d4ed8" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#1d4ed8" /></View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={loadUsers}
          ListEmptyComponent={<Text style={styles.emptyText}>No users found</Text>}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ width: "100%" }}>
              <View style={styles.modalContent}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <Text style={styles.modalTitle}>Register User</Text>
                  <TextInput style={styles.input} placeholder="First name" placeholderTextColor="#9CA3AF" value={form.firstName} onChangeText={updateField("firstName")} returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Last name" placeholderTextColor="#9CA3AF" value={form.lastName} onChangeText={updateField("lastName")} returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={updateField("email")} returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#9CA3AF" keyboardType="phone-pad" value={form.phoneNumber} onChangeText={updateField("phoneNumber")} returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9CA3AF" secureTextEntry value={form.password} onChangeText={updateField("password")} returnKeyType="done" />
                  <View style={styles.roleRow}>
                    {["student", "instructor", "admin"].map((r) => (
                      <TouchableOpacity key={r} style={[styles.roleChip, form.role === r && styles.roleChipActive]} onPress={() => setForm({ ...form, role: r })}>
                        <Text style={[styles.roleChipText, form.role === r && styles.roleChipTextActive]}>{r}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)} disabled={registerLoading}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleRegister} disabled={registerLoading}>
                      {registerLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Register</Text>}
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
