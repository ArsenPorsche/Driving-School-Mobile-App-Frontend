import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { checkoutStyles } from "../styles/CheckoutStyles";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import { lessonService } from "../services/api";

// Uses shared cart context so changes reflect in Store
const Checkout = ({ navigation, token, userId, tokenRole }) => {
  const { items, updateQty, totalPrice, clearCart } = useCart();
  const total = totalPrice;

  const placeOrder = async () => {
    if (!items.length) {
      Alert.alert("Cart is empty", "Please add items before placing the order.");
      return;
    }
    try {
      console.log("Checkout: Cart items before purchase:", items);
      const result = await lessonService.purchaseItems(userId, items);
      Alert.alert("Success", "Purchase completed!");
      clearCart();
    } catch (error) {
      console.log("Checkout error:", error);
      Alert.alert("Error", "Purchase failed: " + error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={checkoutStyles.itemRow}>
      <View style={checkoutStyles.itemLeft}>
        <Text style={checkoutStyles.itemTitle}>{item.title}</Text>
        <View style={checkoutStyles.qtyControls}>
          <TouchableOpacity
            style={checkoutStyles.qtyBtn}
            onPress={() => updateQty(item.id, -1)}
            activeOpacity={0.8}
          >
            <Text style={checkoutStyles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={checkoutStyles.qtyValue}>{item.qty}</Text>
          <TouchableOpacity
            style={checkoutStyles.qtyBtn}
            onPress={() => updateQty(item.id, +1)}
            activeOpacity={0.8}
          >
            <Text style={checkoutStyles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={checkoutStyles.itemPrice}>{item.pricePLN} PLN</Text>
    </View>
  );

  return (
    <View style={checkoutStyles.container}>
      {/* Header */}
      <View style={checkoutStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={checkoutStyles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#2d4150" />
        </TouchableOpacity>
        <Text style={checkoutStyles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Payment method row (placeholder) */}
      {/* <TouchableOpacity style={checkoutStyles.paymentRow} activeOpacity={0.8}>
        <Text style={checkoutStyles.paymentLabel}>PAYMENT</Text>
        <View style={checkoutStyles.paymentRight}>
          <Text style={checkoutStyles.paymentMethod}>Visa •••• 1234</Text>
          <Ionicons name="chevron-forward" size={18} color="#6b7280" />
        </View>
      </TouchableOpacity> */}

      {/* Divider */}
      <View style={checkoutStyles.sectionDivider} />

      {/* Items header */}
      <View style={checkoutStyles.columnsHeader}>
        <Text style={[checkoutStyles.colText, { flex: 1 }]}>ITEMS</Text>
        <Text style={[checkoutStyles.colText, { width: 80, textAlign: "right" }]}>PRICE</Text>
      </View>

      {/* Items list */}
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={checkoutStyles.itemSeparator} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Total and CTA */}
      <View style={checkoutStyles.totalRow}>
        <Text style={checkoutStyles.totalLabel}>Total</Text>
        <Text style={checkoutStyles.totalValue}>{total} PLN</Text>
      </View>

      <TouchableOpacity style={checkoutStyles.ctaButton} onPress={placeOrder} activeOpacity={0.9}>
        <Text style={checkoutStyles.ctaText}>Place order</Text>
      </TouchableOpacity>

      <NavBar role={tokenRole} navigation={navigation} />
    </View>
  );
};

export default Checkout;
