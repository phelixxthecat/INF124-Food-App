import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>Profile Page</Text>

      <View style={styles.card}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        <View style={styles.profilePic} />
        <Text style={styles.profileText}>Profile pic</Text>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.button} onPress={() => router.push('/favoriteOrders')}>
            <Text style={styles.buttonText}>Favorite Orders</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push('/orderHistory')}>
            <Text style={styles.buttonText}>Order History</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push('/savedLocations')}>
            <Text style={styles.buttonText}>Saved Locations</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Notification</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Payment</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Help & Support</Text>
          </Pressable>
        </View>
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
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d9d9d9',
    marginTop: 80,
  },
  profileText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 50,
  },
  buttonGroup: {
    gap: 18,
  },
  button: {
    width: 175,
    height: 45,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});