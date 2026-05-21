import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function ProfilePage() {
  const router = useRouter();

  const buttons = [
    {
      title: 'Favorite Orders',
      route: '/ProfilePages/favoriteOrders',
    },
    {
      title: 'Order History',
      route: '/ProfilePages/orderHistory',
    },
    {
      title: 'Saved Locations',
      route: '/ProfilePages/savedLocations',
    },
    {
      title: 'Notifications',
      route: '/home',
    },
    {
      title: 'Payment',
      route: '/home',
    },
    {
      title: 'Help & Support',
      route: '/home',
    },
  ];

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Profile Page</Text>

      <View style={appStyles.card}>
        <Pressable
          style={appStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={UCIColors.navy}
          />
        </Pressable>

        <View style={styles.profileSection}>
          <View style={styles.profilePic} />

          <Text style={styles.name}>
            Anteater User
          </Text>

          <Text style={styles.email}>
            student@uci.edu
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          {buttons.map((button) => (
            <Pressable
              key={button.title}
              style={styles.button}
              onPress={() => router.push(button.route as any)}
            >
              <Text style={styles.buttonText}>
                {button.title}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={UCIColors.white}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 35,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: UCIColors.gray,
    borderWidth: 4,
    borderColor: UCIColors.gold,
  },

  name: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  email: {
    marginTop: 6,
    fontSize: 13,
    color: UCIColors.textGray,
    fontWeight: '600',
  },

  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },

  button: {
    width: 240,
    height: 52,
    backgroundColor: UCIColors.navy,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  buttonText: {
    color: UCIColors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});