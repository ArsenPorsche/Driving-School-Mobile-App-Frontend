import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { productApi } from "../services/productApi";
import { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";
import { storeStyles } from "../styles/StoreStyles";

function StoreItem({ item, onAdd }) {
  const displayPrice = `${(item.priceMinor / 100).toFixed(0)} PLN`;
  return (
    <View style={storeStyles.item}>
      <View style={storeStyles.itemLeft}>
        <Text style={storeStyles.itemTitle}>{item.title}</Text>
        <Text style={storeStyles.itemDesc}>{item.description}</Text>
      </View>
      <View style={storeStyles.itemRight}>
        <Text style={storeStyles.itemPrice}>{displayPrice}</Text>
        <TouchableOpacity onPress={() => onAdd(item)} style={storeStyles.cartButton} activeOpacity={0.5}>
          <Ionicons name="cart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Store({ navigation }) {
  const { addItem, totalQty } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getProducts();
      setProducts(data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleAdd = (item) => {
    addItem({ id: item.code, title: item.title, priceMinor: item.priceMinor, entitlements: item.entitlements }, 1);
  };

  return (
    <View style={storeStyles.container}>
      <ScrollView contentContainerStyle={storeStyles.scrollContent}>
        <Text style={storeStyles.header}>Shop</Text>
        <Text style={storeStyles.description}>
          Welcome to our driving school shop!{"\n"}Here you can easily purchase selected products:
        </Text>
        {loading ? (
          <View style={storeStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={storeStyles.loadingText}>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={storeStyles.errorContainer}>
            <Text style={storeStyles.errorText}>{error}</Text>
            <TouchableOpacity onPress={loadProducts} style={storeStyles.retryButton}>
              <Text style={storeStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => <StoreItem item={item} onAdd={handleAdd} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={storeStyles.separator} />}
            contentContainerStyle={storeStyles.listContent}
          />
        )}
      </ScrollView>
      <TouchableOpacity style={storeStyles.floatingCart} onPress={() => navigation.navigate("Checkout")} activeOpacity={0.85}>
        <Ionicons name="cart" size={24} color="#fff" />
        {totalQty > 0 && (
          <View style={storeStyles.cartBadge}>
            <Text style={storeStyles.cartBadgeText}>{totalQty}</Text>
          </View>
        )}
      </TouchableOpacity>
      <NavBar navigation={navigation} />
    </View>
  );
}
