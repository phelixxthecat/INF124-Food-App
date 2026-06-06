import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function FavoriteOrders() {
  const router = useRouter();

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Favorite Orders</Text>

      <View style={appStyles.card}>
        <Pressable
          style={appStyles.backButton}
          onPress={() => router.navigate('/(tabs)/ProfilePages/profile')}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={UCIColors.navy}
          />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={appStyles.title}>Favorite Orders</Text>

          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.favoriteCard}>
              <View style={styles.foodImage} />

              <View style={styles.favoriteInfo}>
                <Text style={styles.restaurant}>
                  Zot Pizza Combo
                </Text>

                <Text style={styles.description}>
                  Pizza + Fries + Drink
                </Text>

                <Pressable style={styles.reorderButton}>
                  <Text style={styles.reorderText}>
                    Reorder
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
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

  favoriteCard: {
    width: 260,
    flexDirection: 'row',
    backgroundColor: UCIColors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 14,
  },

  foodImage: {
    width: 78,
    height: 78,
    borderRadius: 16,
    backgroundColor: UCIColors.gray,
  },

  favoriteInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },

  restaurant: {
    fontSize: 15,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  description: {
    marginTop: 5,
    fontSize: 12,
    color: UCIColors.textGray,
  },

  reorderButton: {
    marginTop: 12,
    width: 90,
    height: 32,
    backgroundColor: UCIColors.gold,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reorderText: {
    color: UCIColors.navy,
    fontWeight: '800',
    fontSize: 12,
  },
});