import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../../constants/appStyles';
import userAuthentication from '@/src/userAuthentication';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      await userAuthentication.login(email, password);
      router.replace('/home');
    } catch (error: any) {
      let message = 'Unable to log in. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Please enter a valid email address';
          break;
        case 'auth/user-not-found':
          message = 'No user found with this email';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          message = 'Invalid email or password';
          break;
      }
      Alert.alert('Login Failed', message);
      }
  }

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Login Page</Text>

      <View style={appStyles.card}>
        <Pressable style={appStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={UCIColors.navy} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={styles.subtitle}>Welcome back, Anteater.</Text>

          <View style={styles.form}>
            <Text style={appStyles.label}>Email Address</Text>
            <TextInput
              style={appStyles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={appStyles.label}>Password</Text>
            <TextInput
              style={appStyles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Pressable style={appStyles.primaryButton} onPress={handleLogin}>
              <Text style={appStyles.primaryButtonText}>Sign In</Text>
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  subtitle: {
    marginTop: 10,
    color: UCIColors.textGray,
    fontWeight: '700',
  },
  form: {
    width: 230,
    marginTop: 70,
    alignItems: 'center',
  },
});