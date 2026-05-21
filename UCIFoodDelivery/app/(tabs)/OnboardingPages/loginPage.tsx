import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Login Page</Text>

      <View style={appStyles.card}>
        <Pressable style={appStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={UCIColors.navy} />
        </Pressable>

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

          <Pressable style={appStyles.primaryButton} onPress={() => router.replace('/home')}>
            <Text style={appStyles.primaryButtonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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