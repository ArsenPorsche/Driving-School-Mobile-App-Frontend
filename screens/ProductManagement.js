import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator,
  TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView,
  TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { productApi } from "../services/productApi";
import { productManagementStyles as styles } from "../styles/ProductManagementStyles";

const INITIAL_FORM = { name: "", description: "", price: "", category: "single", lessons: "", exams: "" };

export default function ProductManagement({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const list = await productApi.getAllProductsAdmin();
      setProducts(list || []);
    } catch {
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      const lessonsEnt = product.entitlements.find((e) => e.unit === "lesson");
      const examsEnt = product.entitlements.find((e) => e.unit === "exam");
      setFormData({
        name: product.title,
        description: product.description || "",
        price: (product.priceMinor / 100).toString(),
        category: product.category,
        lessons: lessonsEnt ? lessonsEnt.count.toString() : "",
        exams: examsEnt ? examsEnt.count.toString() : "",
      });
    } else {
      setEditingProduct(null);
      setFormData(INITIAL_FORM);
    }
    setModalVisible(true);
  };

  const handleSaveProduct = async () => {
    try {
      const entitlements = [];
      const lessonsCount = parseInt(formData.lessons) || 0;
      const examsCount = parseInt(formData.exams) || 0;
      if (lessonsCount > 0) entitlements.push({ unit: "lesson", count: lessonsCount });
      if (examsCount > 0) entitlements.push({ unit: "exam", count: examsCount });

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        entitlements,
      };

      if (editingProduct) {
        await productApi.updateProduct(editingProduct._id, productData);
        Alert.alert("Success", "Product updated successfully");
      } else {
        await productApi.createProduct(productData);
        Alert.alert("Success", "Product created successfully");
      }
      setModalVisible(false);
      loadProducts();
    } catch {
      Alert.alert("Error", "Failed to save product");
    }
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert("Deactivate Product", "Make this product inactive? It will be hidden from the store.", [
      { text: "Cancel", style: "cancel" },
      { text: "Deactivate", style: "destructive", onPress: async () => {
        try { await productApi.deleteProduct(productId); Alert.alert("Success", "Product deactivated"); loadProducts(); }
        catch (e) { Alert.alert("Error", e.response?.data?.message || "Failed to deactivate product"); }
      }},
    ]);
  };

  const handleActivateProduct = async (productId) => {
    try { await productApi.activateProduct(productId); Alert.alert("Success", "Product activated"); loadProducts(); }
    catch (e) { Alert.alert("Error", e.response?.data?.message || "Failed to activate product"); }
  };

  const updateField = (key) => (value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const renderProductItem = ({ item }) => {
    const inactive = item.active === false;
    const lessonsEnt = item.entitlements?.find((e) => e.unit === "lesson");
    const examsEnt = item.entitlements?.find((e) => e.unit === "exam");

    return (
      <View style={styles.productCard}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.title}</Text>
          {item.description && <Text style={styles.productDescription}>{item.description}</Text>}
          <Text style={styles.productCategory}>Category: {item.category}</Text>
          <Text style={styles.productPrice}>Price: {item.priceMinor / 100} PLN</Text>
          {lessonsEnt && <Text style={styles.productQuantity}>Lessons: {lessonsEnt.count}</Text>}
          {examsEnt && <Text style={styles.productQuantity}>Exams: {examsEnt.count}</Text>}
          {inactive && <Text style={styles.inactiveLabel}>INACTIVE</Text>}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleOpenModal(item)}>
            <Ionicons name="create" size={24} color="#1d4ed8" />
          </TouchableOpacity>
          {inactive ? (
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleActivateProduct(item._id)}>
              <Ionicons name="refresh-circle" size={28} color="#16a34a" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item._id)}>
              <Ionicons name="remove-circle" size={24} color="#dc2626" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderCategoryChips = () => (
    <View style={{ flexDirection: "row", gap: 8, marginBottom: 12, flexWrap: "wrap", justifyContent: "center" }}>
      {["single", "bundle", "course"].map((cat) => (
        <TouchableOpacity key={cat} style={[styles.roleChip, formData.category === cat && styles.roleChipActive]} onPress={() => updateField("category")(cat)}>
          <Text style={[styles.roleChipText, formData.category === cat && styles.roleChipTextActive]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEntitlementFields = () => {
    if (formData.category === "course") {
      return (
        <>
          <TextInput style={styles.input} placeholder="Lessons count" placeholderTextColor="#9CA3AF" value={formData.lessons} onChangeText={updateField("lessons")} keyboardType="numeric" returnKeyType="next" />
          <TextInput style={styles.input} placeholder="Exams count" placeholderTextColor="#9CA3AF" value={formData.exams} onChangeText={updateField("exams")} keyboardType="numeric" returnKeyType="done" />
        </>
      );
    }

    const isLessonActive = (parseInt(formData.lessons) || 0) > 0;
    const isExamActive = (parseInt(formData.exams) || 0) > 0;

    return (
      <>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12, justifyContent: "center" }}>
          {["lesson", "exam"].map((unit) => {
            const active = unit === "lesson" ? isLessonActive : isExamActive;
            return (
              <TouchableOpacity key={unit} style={[styles.roleChip, active && styles.roleChipActive]}
                onPress={() => setFormData({ ...formData, lessons: unit === "lesson" ? "1" : "0", exams: unit === "exam" ? "1" : "0" })}>
                <Text style={[styles.roleChipText, active && styles.roleChipTextActive]}>{unit}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {formData.category === "bundle" ? (
          <TextInput style={styles.input} placeholder="Quantity" placeholderTextColor="#9CA3AF"
            value={isLessonActive ? formData.lessons : formData.exams}
            onChangeText={(text) => setFormData((prev) => isLessonActive ? { ...prev, lessons: text } : { ...prev, exams: text })}
            keyboardType="numeric" returnKeyType="done" />
        ) : (
          <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 12, textAlign: "center" }}>Quantity fixed: 1</Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Product Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleOpenModal()}>
          <Ionicons name="add-circle" size={28} color="#059669" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#059669" /></View>
      ) : (
        <FlatList data={products} renderItem={renderProductItem} keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer} refreshing={loading} onRefresh={loadProducts}
          ListEmptyComponent={<Text style={styles.emptyText}>No products found</Text>} />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ width: "100%" }}>
              <View style={styles.modalContent}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <Text style={styles.modalTitle}>{editingProduct ? "Edit Product" : "Add Product"}</Text>
                  <TextInput style={styles.input} placeholder="Product name" placeholderTextColor="#9CA3AF" value={formData.name} onChangeText={updateField("name")} returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Description (optional)" placeholderTextColor="#9CA3AF" value={formData.description} onChangeText={updateField("description")} multiline returnKeyType="next" />
                  <TextInput style={styles.input} placeholder="Price (PLN)" placeholderTextColor="#9CA3AF" value={formData.price} onChangeText={updateField("price")} keyboardType="numeric" returnKeyType="next" />
                  {renderCategoryChips()}
                  {renderEntitlementFields()}
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveProduct}>
                      <Text style={styles.saveButtonText}>Save</Text>
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
