import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function OrderHistory() {
  const router = useRouter();

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Order History</Text>

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
          <Text style={appStyles.title}>Order History</Text>

          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.orderCard}>
              <Image style={styles.foodImage} source={require('../../../assets/images/utcburger.jpg')}/>

              <View style={styles.orderInfo}>
                <Text style={styles.restaurant}>
                  UTC Burger
                </Text>

                <Text style={styles.details}>
                  2 Items • $24.99
                </Text>

                <Text style={styles.date}>
                  April 22, 2026
                </Text>
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

  orderCard: {
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

  orderInfo: {
    marginLeft: 14,
    justifyContent: 'center',
  },

  restaurant: {
    fontSize: 16,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  details: {
    marginTop: 4,
    fontSize: 13,
    color: UCIColors.black,
    fontWeight: '600',
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: UCIColors.textGray,
  },
});