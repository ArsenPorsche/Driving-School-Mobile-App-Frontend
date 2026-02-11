import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { productApi } from "../services/productApi";
import NavBar from "../components/NavBar";
import { checkoutStyles } from "../styles/CheckoutStyles";

export default function Checkout({ navigation }) {
  const { items, updateQty, clearCart } = useCart();

  const total = useMemo(() => items.reduce((sum, it) => sum + it.priceMinor * it.qty, 0), [items]);
  const totalPLN = (total / 100).toFixed(0);

  const placeOrder = async () => {
    if (!items.length) {
      Alert.alert("Cart is empty", "Please add items before placing the order.");
      return;
    }
    try {
      const result = await productApi.createOrder(items);
      Alert.alert("Success", `Order created! Added ${result.addedLessons} lessons and ${result.addedExams} exams to your account.`);
      clearCart();
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "Purchase failed: " + err.message);
    }
  };

  const renderItem = ({ item }) => {
    const itemTotal = (item.priceMinor * item.qty) / 100;
    return (
      <View style={checkoutStyles.itemRow}>
        <View style={checkoutStyles.itemLeft}>
          <Text style={checkoutStyles.itemTitle}>{item.title}</Text>
          <View style={checkoutStyles.qtyControls}>
            <TouchableOpacity style={checkoutStyles.qtyBtn} onPress={() => updateQty(item.id, -1)} activeOpacity={0.8}>
              <Text style={checkoutStyles.qtyBtnText}></Text>
            </TouchableOpacity>
            <Text style={checkoutStyles.qtyValue}>{item.qty}</Text>
            <TouchableOpacity style={checkoutStyles.qtyBtn} onPress={() => updateQty(item.id, +1)} activeOpacity={0.8}>
              <Text style={checkoutStyles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={checkoutStyles.itemPrice}>{itemTotal.toFixed(0)} PLN</Text>
      </View>
    );
  };

  return (
    <View style={checkoutStyles.container}>
      <View style={checkoutStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={checkoutStyles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2d4150" />
        </TouchableOpacity>
        <Text style={checkoutStyles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={checkoutStyles.sectionDivider} />
      <View style={checkoutStyles.columnsHeader}>
        <Text style={[checkoutStyles.colText, { flex: 1 }]}>ITEMS</Text>
        <Text style={[checkoutStyles.colText, { width: 80, textAlign: "right" }]}>PRICE</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={checkoutStyles.itemSeparator} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={checkoutStyles.totalRow}>
        <Text style={checkoutStyles.totalLabel}>Total</Text>
        <Text style={checkoutStyles.totalValue}>{totalPLN} PLN</Text>
      </View>
      <TouchableOpacity style={checkoutStyles.ctaButton} onPress={placeOrder} activeOpacity={0.5}>
        <Text style={checkoutStyles.ctaText}>Place order</Text>
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </View>
  );
}
