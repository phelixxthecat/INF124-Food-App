import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';


export default function LandingPage() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>Landing Page</Text>

      <View style={styles.card}>
        <Text style={styles.logo}>Logo</Text>

        <View style={styles.buttonGroup}>
          <Pressable style={styles.darkButton} onPress={() => router.push('/loginPage')}>
            <Text style={styles.darkButtonText}>Log in</Text>
            
          </Pressable>

          <Pressable style={styles.darkButton} onPress={() => router.push('/register')}>
            <Text style={styles.darkButtonText}>Register</Text>
            
          </Pressable>

          <Pressable style={styles.lightButton} onPress={() => router.push('/')}>
            <Text style={styles.lightButtonText}>Browse as Guest</Text>
          </Pressable>
        </View>

        <Pressable style={styles.aboutButton} onPress={() => router.push('/aboutUs')}>
          <Text style={styles.aboutText}>About Us</Text>
        </Pressable>
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

  logo: {
    marginTop: 105,
    fontSize: 38,
    fontWeight: '800',
    color: '#000',
  },

  buttonGroup: {
    marginTop: 170,
    gap: 35,
    alignItems: 'center',
  },

  darkButton: {
    width: 155,
    height: 47,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  darkButtonText: {
    color: '#fff',
    fontSize: 12,
  },

  lightButton: {
    width: 155,
    height: 47,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lightButtonText: {
    color: '#000',
    fontSize: 12,
  },

  aboutButton: {
    position: 'absolute',
    bottom: 18,
  },

  aboutText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
});