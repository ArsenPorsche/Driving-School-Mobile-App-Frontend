import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { authService } from "../services/api";
import { userManagementStyles as styles } from "../styles/UserManagementStyles";

const UserManagement = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Припускаю, що в API є endpoint для отримання всіх користувачів
      // Якщо немає, треба буде додати його на бекенді
      const response = await authService.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.log("Error loading users:", error);
      Alert.alert("Error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      "Deactivate User",
      "Make this user inactive? They will no longer be able to log in.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: async () => {
            try {
              await authService.deleteUser(userId);
              Alert.alert("Success", "User deactivated successfully");
              loadUsers();
            } catch (error) {
              Alert.alert("Error", error.response?.data?.message || "Failed to deactivate user");
            }
          },
        },
      ]
    );
  };

  const handleActivateUser = async (userId) => {
    try {
      await authService.activateUser(userId);
      Alert.alert('Success','User activated successfully');
      loadUsers();
    } catch (e) {
      Alert.alert('Error', e.response?.data?.message || 'Failed to activate user');
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
          <Text style={[styles.userRole, inactive && { color: '#dc2626' }]}>Status: {inactive ? 'Inactive' : 'Active'}</Text>
          {item.phoneNumber && (
            <Text style={styles.userPhone}>Phone: {item.phoneNumber}</Text>
          )}
        </View>
        {inactive ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleActivateUser(item._id)}
          >
            <Ionicons name="refresh-circle" size={28} color="#16a34a" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteUser(item._id)}
          >
            <Ionicons name="remove-circle" size={24} color="#dc2626" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>User Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="person-add" size={24} color="#1d4ed8" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d4ed8" />
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={loadUsers}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found</Text>
          }
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%' }}>
              <View style={styles.modalContent}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <Text style={styles.modalTitle}>Register User</Text>
                  <TextInput
                  style={styles.input}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  value={form.firstName}
                  onChangeText={(t) => setForm({ ...form, firstName: t })}
                  returnKeyType="next"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  value={form.lastName}
                  onChangeText={(t) => setForm({ ...form, lastName: t })}
                  returnKeyType="next"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(t) => setForm({ ...form, email: t })}
                  returnKeyType="next"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={form.phoneNumber}
                  onChangeText={(t) => setForm({ ...form, phoneNumber: t })}
                  returnKeyType="next"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={form.password}
                  onChangeText={(t) => setForm({ ...form, password: t })}
                  returnKeyType="done"
                />
                <View style={styles.roleRow}>
                  {['student','instructor','admin'].map(r => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.roleChip, form.role === r && styles.roleChipActive]}
                      onPress={() => setForm({ ...form, role: r })}
                    >
                      <Text style={[styles.roleChipText, form.role === r && styles.roleChipTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                    disabled={registerLoading}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={async () => {
                      try {
                        setRegisterLoading(true);
                        await authService.register(
                          form.firstName,
                          form.lastName,
                          form.role,
                          form.phoneNumber,
                          form.email,
                          form.password
                        );
                        Alert.alert('Success','User registered');
                        setModalVisible(false);
                        setForm({ firstName:'', lastName:'', email:'', phoneNumber:'', password:'', role:'student'});
                        loadUsers();
                      } catch(e) {
                        Alert.alert('Error', e.response?.data?.message || e.message);
                      } finally {
                        setRegisterLoading(false);
                      }
                    }}
                    disabled={registerLoading}
                  >
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
};

export default UserManagement;
