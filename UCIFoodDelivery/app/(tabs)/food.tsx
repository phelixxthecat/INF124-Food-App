import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../constants/appStyles';

export default function FoodPage() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Food Page</Text>

      <View style={appStyles.card}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={appStyles.title}>Food Delivery</Text>

          <View style={styles.cartPill}>
            <Text style={styles.cartText}>Cart: {cartCount}</Text>
          </View>

          {[
            { name: 'Anteater Burger', price: '$8' },
            { name: 'UCI Pizza', price: '$12' },
            { name: 'Zot Fries', price: '$5' },
          ].map((item) => (
            <View key={item.name} style={styles.foodCard}>
              <View style={styles.foodImage} />

              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price}</Text>

                <Pressable
                  style={styles.addButton}
                  onPress={() => setCartCount(cartCount + 1)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <Pressable
            style={appStyles.primaryButton}
            onPress={() => router.push('/Checkout' as any)}
          >
            <Text style={appStyles.primaryButtonText}>Go to Checkout</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  cartPill: {
    backgroundColor: UCIColors.gold,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 24,
  },

  cartText: {
    color: UCIColors.navy,
    fontWeight: '800',
  },

  foodCard: {
    width: 270,
    flexDirection: 'row',
    backgroundColor: UCIColors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 16,
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: UCIColors.gray,
  },

  foodInfo: {
    flex: 1,
    marginLeft: 14,
  },

  foodName: {
    fontSize: 16,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  foodPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: UCIColors.textGray,
    marginTop: 4,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: UCIColors.navy,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },

  addButtonText: {
    color: UCIColors.white,
    fontWeight: '800',
    fontSize: 12,
  },
});