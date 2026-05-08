import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>Login Page</Text>

      <View style={styles.card}>

        {/* BACK BUTTON */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        <Text style={styles.logo}>Logo</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry />

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
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

  logo: {
    marginTop: 105,
    fontSize: 38,
    fontWeight: '800',
    color: '#000',
  },

  form: {
    width: 210,
    marginTop: 55,
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
    marginBottom: 38,
    color: '#000',
  },

  button: {
    width: 195,
    height: 62,
    backgroundColor: '#1f1f1f',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});