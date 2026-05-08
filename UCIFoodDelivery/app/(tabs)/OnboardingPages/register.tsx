import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordChecks = useMemo(() => {
    return {
      length: password.length >= 6 && password.length <= 12,
      special: /[^A-Za-z0-9]/.test(password),
      number: /[0-9]/.test(password),
      letter: /[A-Za-z]/.test(password),
      match: password.length > 0 && password === confirmPassword,
    };
  }, [password, confirmPassword]);

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>Register Page</Text>

      <View style={styles.card}>
        {/* BACK BUTTON */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Create Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.requirements}>
              <Text
                style={[
                  styles.requirementText,
                  passwordChecks.length && styles.checkedText,
                ]}
              >
                {passwordChecks.length ? '✓' : '○'} 6-12 characters
              </Text>

              <Text
                style={[
                  styles.requirementText,
                  passwordChecks.special && styles.checkedText,
                ]}
              >
                {passwordChecks.special ? '✓' : '○'} One special character
              </Text>

              <Text
                style={[
                  styles.requirementText,
                  passwordChecks.number && styles.checkedText,
                ]}
              >
                {passwordChecks.number ? '✓' : '○'} One number
              </Text>

              <Text
                style={[
                  styles.requirementText,
                  passwordChecks.letter && styles.checkedText,
                ]}
              >
                {passwordChecks.letter ? '✓' : '○'} One letter
              </Text>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <Text
              style={[
                styles.requirementText,
                passwordChecks.match && styles.checkedText,
                styles.matchText,
              ]}
            >
              {passwordChecks.match ? '✓' : '○'} Passwords match
            </Text>

            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </View>
        </ScrollView>
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

  content: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: '#000',
    marginBottom: 40,
  },

  form: {
    width: 210,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 18,
    color: '#000',
  },

  requirements: {
    marginTop: -10,
    marginBottom: 18,
  },

  requirementText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 4,
  },

  checkedText: {
    color: '#000',
    fontWeight: '700',
  },

  matchText: {
    marginTop: -10,
    marginBottom: 20,
  },

  button: {
    width: 195,
    height: 62,
    backgroundColor: '#1f1f1f',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});