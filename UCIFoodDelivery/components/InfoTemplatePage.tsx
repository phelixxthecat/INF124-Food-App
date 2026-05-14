import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type InfoPageProps = {
  pageTitle: string;
  sectionTitle: string;
  bodyText: string;
};

export default function InfoTemplatePage({
  pageTitle,
  sectionTitle,
  bodyText,
}: InfoPageProps) {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Text style={styles.pageLabel}>{pageTitle}</Text>

      <View style={styles.card}>

        {/* BACK BUTTON */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </Pressable>

        <View style={styles.content}>
          <Text style={styles.logo}>Logo</Text>

          <Text style={styles.sectionTitle}>
            {sectionTitle}
          </Text>

          <View style={styles.greyBox}>
            <Text style={styles.bodyText}>
              {bodyText}
            </Text>
          </View>
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

  content: {
    alignItems: 'center',
    paddingTop: 100,
    width: '100%',
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: '#000',
    marginBottom: 50,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 18,
  },

  greyBox: {
    width: 240,
    minHeight: 180,
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: '#999',
    padding: 18,
    justifyContent: 'center',
  },

  bodyText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
});