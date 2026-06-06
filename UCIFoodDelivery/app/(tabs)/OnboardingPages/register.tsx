import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../../constants/appStyles';
import { userAuthentication } from '@/src/userAuthentication';
import { updateProfile } from 'firebase/auth';

export default function RegisterPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordChecks = useMemo(() => ({
    length: password.length >= 6 && password.length <= 12,
    special: /[^A-Za-z0-9]/.test(password),
    number: /[0-9]/.test(password),
    letter: /[A-Za-z]/.test(password),
    match: password.length > 0 && password === confirmPassword,
  }), [password, confirmPassword]);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (Object.values(passwordChecks).some(check => !check)) {
      Alert.alert('Error', 'Password does not meet requirements.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const result = await userAuthentication.register(name, email, password);
    if (result.success) {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/home');
      
      if (result.user) {
        await updateProfile(result.user, {
          displayName: name.trim(),
        });
      }
    } else {
      Alert.alert('Error', result.error);
    }
  }

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Register Page</Text>

      <View style={appStyles.card}>
        <Pressable style={appStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={UCIColors.navy} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={styles.subtitle}>Create your UCI food account.</Text>

          <View style={styles.form}>
            <Text style={appStyles.label}>Name</Text>
            <TextInput style={appStyles.input} value={name} onChangeText={setName} />

            <Text style={appStyles.label}>Phone Number</Text>
            <TextInput style={appStyles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

            <Text style={appStyles.label}>Email Address</Text>
            <TextInput style={appStyles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <Text style={appStyles.label}>Create Password</Text>
            <TextInput style={appStyles.input} value={password} onChangeText={setPassword} secureTextEntry />

            <View style={styles.requirements}>
              <Text style={[styles.requirementText, passwordChecks.length && styles.checkedText]}>
                {passwordChecks.length ? '✓' : '○'} 6-12 characters
              </Text>
              <Text style={[styles.requirementText, passwordChecks.special && styles.checkedText]}>
                {passwordChecks.special ? '✓' : '○'} One special character
              </Text>
              <Text style={[styles.requirementText, passwordChecks.number && styles.checkedText]}>
                {passwordChecks.number ? '✓' : '○'} One number
              </Text>
              <Text style={[styles.requirementText, passwordChecks.letter && styles.checkedText]}>
                {passwordChecks.letter ? '✓' : '○'} One letter
              </Text>
            </View>

            <Text style={appStyles.label}>Confirm Password</Text>
            <TextInput style={appStyles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <Text style={[styles.requirementText, passwordChecks.match && styles.checkedText]}>
              {passwordChecks.match ? '✓' : '○'} Passwords match
            </Text>

            <Pressable style={[appStyles.primaryButton, styles.registerButton]} onPress={handleSignUp}>
              <Text style={appStyles.primaryButtonText}>Register</Text>
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
    marginTop: 8,
    marginBottom: 28,
    color: UCIColors.textGray,
    fontWeight: '700',
  },
  form: {
    width: 230,
    alignItems: 'center',
  },
  requirements: {
    width: '100%',
    marginTop: -8,
    marginBottom: 16,
  },
  requirementText: {
    fontSize: 11,
    color: UCIColors.textGray,
    marginBottom: 4,
  },
  checkedText: {
    color: UCIColors.navy,
    fontWeight: '800',
  },
  registerButton: {
    marginTop: 20,
  },
});