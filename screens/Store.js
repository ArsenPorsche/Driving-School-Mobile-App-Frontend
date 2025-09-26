import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import { storeStyles } from "../styles/StoreStyles";
import { styles as appStyles } from "../styles/AppStyles";
import { useCart } from "../context/CartContext";

const PRODUCTS = [
  {
    id: "basic-course",
    title: "Basic course",
    desc:
      "15 driving sessions, 5 theory classes, medical exam, and both practical and theoretical exams included. Perfect to start!",
    price: "3400 PLN",
    pricePLN: 3400,
    type: "lesson", // 15 lessons included
    quantity: 15,
  },
  {
    id: "single-lesson",
    title: "Driving lesson",
    desc: "Single practical driving session",
    price: "200 PLN",
    pricePLN: 200,
    type: "lesson",
    quantity: 1,
  },
  {
    id: "package-10",
    title: "10‑lesson package",
    desc: "10 practical driving sessions",
    price: "1900 PLN",
    pricePLN: 1900,
    type: "lesson",
    quantity: 10,
  },
  {
    id: "package-5",
    title: "5‑lesson package",
    desc: "5 practical driving sessions",
    price: "950 PLN",
    pricePLN: 950,
    type: "lesson",
    quantity: 5,
  },
  {
    id: "internal-exam",
    title: "Practical exam",
    desc: "Internal practical exam",
    price: "100 PLN",
    pricePLN: 100,
    type: "exam",
    quantity: 1,
  },
];

const StoreItem = ({ item, onAdd }) => (
  <View style={[storeStyles.item, item.highlighted && storeStyles.itemHighlighted]}>
    <View style={storeStyles.itemLeft}>
      <Text style={storeStyles.itemTitle}>{item.title}</Text>
      {!!item.desc && <Text style={storeStyles.itemDesc}>{item.desc}</Text>}
    </View>
    <View style={storeStyles.itemRight}>
      <Text style={storeStyles.itemPrice}>{item.price}</Text>
      <TouchableOpacity onPress={() => onAdd(item)} style={storeStyles.cartButton} activeOpacity={0.5}>
        <Ionicons name="cart" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const Store = ({ navigation, tokenRole }) => {
  const { addItem, items, totalQty } = useCart();
  const handleAdd = (item) => {
    console.log("Add to cart:", item.id);
    addItem(item, 1);
  };

  const handleOpenCart = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={storeStyles.container}>
      <ScrollView contentContainerStyle={storeStyles.scrollContent}>
        <Text style={appStyles.header}>Shop</Text>
        <View style={storeStyles.introBox}>
          <Text style={storeStyles.introBold}>Welcome to our driving school shop!</Text>
          <Text style={storeStyles.introText}>Here you can easily purchase selected products:</Text>
        </View>

        <FlatList
          data={PRODUCTS}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => <StoreItem item={item} onAdd={handleAdd} />}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={storeStyles.separator} />}
          contentContainerStyle={storeStyles.listContent}
        />
      </ScrollView>

      
      <TouchableOpacity style={storeStyles.floatingCart} onPress={handleOpenCart} activeOpacity={0.85}>
        <Ionicons name="cart" size={24} color="#fff" />
        {totalQty > 0 && (
          <View style={storeStyles.cartBadge}>
            <Text style={storeStyles.cartBadgeText}>{totalQty}</Text>
          </View>
        )}
      </TouchableOpacity>

      <NavBar role={tokenRole} navigation={navigation} />
    </View>
  );
};

export default Store;
