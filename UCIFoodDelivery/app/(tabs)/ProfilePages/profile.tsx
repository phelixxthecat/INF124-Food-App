import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { appStyles, UCIColors } from '../../../constants/appStyles';
import userAuthentication from '@/src/userAuthentication';
import { auth } from '@/src/firebase';

export default function ProfilePage() {
  const router = useRouter();
  let user = auth.currentUser;

  const handleLogout = async () => {
    const result = await userAuthentication.logout();
    if (result.success) {
      user = null;
      router.replace('/OnboardingPages/onboarding');
    } else {
      Alert.alert('Unable to logout', result.error);

    }
  }

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
      title: 'Settings',
      route: '/ProfilePages/settings',
    },
  ];

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Profile Page</Text>

      <View style={appStyles.card}>
        <Pressable
          style={appStyles.backButton}
          onPress={() => router.navigate('/home')}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={UCIColors.navy}
          />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.profilePic} />

            <Text style={styles.name}>
              {user?.displayName || 'Anteater User'}
            </Text>

            <Text style={styles.email}>
              {user?.email || 'student@uci.edu'}
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            {buttons.map((button) => (
              <Pressable
                key={button.title}
                style={styles.button}
                onPress={() => router.navigate(button.route as any)}
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
            <Pressable
                key="Log Out"
                style={styles.button_logout}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText_logout}>Log Out</Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={UCIColors.navy}
                />
              </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 35,
  },

  profilePic: {
    width: 100,
    height: 100,
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
    height: 50,
    backgroundColor: UCIColors.navy,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  button_logout: {
    width: 240,
    height: 50,
    backgroundColor: UCIColors.gray,
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

  buttonText_logout: {
    color: UCIColors.navy,
    fontSize: 14,
    fontWeight: '800',
  },
});