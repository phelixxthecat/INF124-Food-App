import { View, Text, Button } from "react-native";
import { useState } from "react";

export default function FoodPage() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      
      {/* Title */}
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "black" }}>
        Food Delivery
      </Text>

      {/* Cart */}
      <Text style={{ fontSize: 18, marginTop: 10, color: "black" }}>
        Cart: {cartCount}
      </Text>

      {/* Burger Card */}
      <View
        style={{
          marginTop: 20,
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: 18, color: "black" }}>Burger - $8</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Add to Cart"
            onPress={() => setCartCount(cartCount + 1)}
          />
        </View>
      </View>

      {/* Pizza Card */}
      <View
        style={{
          marginTop: 20,
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: 18, color: "black" }}>Pizza - $12</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Add to Cart"
            onPress={() => setCartCount(cartCount + 1)}
          />
        </View>
      </View>

    </View>
  );
}