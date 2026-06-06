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
import { appStyles, UCIColors } from '../constants/appStyles';

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
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>{pageTitle}</Text>

      <View style={appStyles.card}>
        {/* BACK BUTTON */}
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

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={appStyles.logo}>ZotEats</Text>

          <Text style={styles.sectionTitle}>
            {sectionTitle}
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.bodyText}>
              {bodyText}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
    width: '100%',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: UCIColors.navy,
    marginBottom: 20,
    textAlign: 'center',
  },

  infoCard: {
    width: 260,
    backgroundColor: UCIColors.cream,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    paddingVertical: 28,
    paddingHorizontal: 22,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  bodyText: {
    fontSize: 14,
    color: UCIColors.black,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});