import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>About Us Page</Text>

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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>

            <Pressable style={styles.greyBox} onPress={() => router.push('/missionPage')}>
              <Text style={styles.boxText}>Mission Content</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who we serve</Text>

            <Pressable style={styles.greyBox}onPress={() => router.push('/servePage')}>
              <Text style={styles.boxText}>Audience Content</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How it Works</Text>

            <Pressable style={styles.greyBox} onPress={() => router.push('/howItWorksPage')}>
              <Text style={styles.boxText}>How It Works Content</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why Choose Us</Text>

            <Pressable style={styles.greyBox} onPress={() => router.push('/whyUsPage')}>
              <Text style={styles.boxText}>Why Choose Us Content</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Info</Text>

            <Pressable style={styles.greyBox} onPress={() => router.push('/contactPage')}>
              <Text style={styles.boxText}>Contact Information</Text>
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
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 10,
  },

  content: {
    paddingTop: 70,
    alignItems: 'center',
    paddingBottom: 40,
  },

  section: {
    alignItems: 'center',
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },

  greyBox: {
    width: 150,
    height: 70,
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxText: {
    color: '#555',
    fontSize: 12,
  },
});