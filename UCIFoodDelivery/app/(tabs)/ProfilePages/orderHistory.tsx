import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function orderHistory() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>Order History Page</Text>

      <View style={styles.card}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Order History</Text>

          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.orderItem}>
              <Text style={styles.restaurantText}>Restaurant</Text>
              <View style={styles.greyBox} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    paddingTop: 38,
    alignItems: 'center',
  },
  pageLabel: {
    width: 330,
    color: '#777',
    fontSize: 14,
    marginBottom: 8,
  },
  card: {
    width: 330,
    height: 725,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  content: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 35,
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 35,
  },
  orderItem: {
    width: 255,
    marginBottom: 16,
  },
  restaurantText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
  },
  greyBox: {
    width: 255,
    height: 105,
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: '#999',
  },
});