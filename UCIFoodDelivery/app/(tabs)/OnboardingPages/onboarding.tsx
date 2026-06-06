import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Landing Page</Text>

      <View style={appStyles.card}>
        <Text style={appStyles.logo}>ZotEats</Text>
        <Text style={styles.tagline}>UCI food, faster.</Text>

        <View style={styles.buttonGroup}>
          <Pressable style={appStyles.primaryButton} onPress={() => router.push('/OnboardingPages/loginPage')}>
            <Text style={appStyles.primaryButtonText}>Log In</Text>
          </Pressable>

          <Pressable style={appStyles.secondaryButton} onPress={() => router.push('/OnboardingPages/register')}>
            <Text style={appStyles.secondaryButtonText}>Register</Text>
          </Pressable>

          <Pressable style={appStyles.outlineButton} onPress={() => router.push('/home')}>
            <Text style={appStyles.outlineButtonText}>Browse as Guest</Text>
          </Pressable>
        </View>

        <Pressable style={styles.aboutButton} onPress={() => router.push('/OnboardingPages/aboutUs')}>
          <Text style={styles.aboutText}>About Us</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagline: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: UCIColors.textGray,
  },
  buttonGroup: {
    marginTop: 170,
    gap: 22,
    alignItems: 'center',
  },
  aboutButton: {
    position: 'absolute',
    bottom: 24,
  },
  aboutText: {
    color: UCIColors.navy,
    fontSize: 13,
    fontWeight: '800',
  },
});