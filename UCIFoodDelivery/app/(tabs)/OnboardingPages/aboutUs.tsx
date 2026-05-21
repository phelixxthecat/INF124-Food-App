import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function AboutUsPage() {
  const router = useRouter();

  const sections = [
    { title: 'Our Mission', subtitle: 'Why ZotEats exists', route: '/AboutUsPages/missionPage' },
    { title: 'Who We Serve', subtitle: 'Students, staff, and campus visitors', route: '/AboutUsPages/servePage' },
    { title: 'How It Works', subtitle: 'Order, pickup, or campus delivery', route: '/AboutUsPages/howItWorksPage' },
    { title: 'Why Choose Us', subtitle: 'Fast UCI-focused food access', route: '/AboutUsPages/whyUsPage' },
    { title: 'Contact Info', subtitle: 'Get help or reach our team', route: '/AboutUsPages/contactPage' },
  ];

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>About Us Page</Text>

      <View style={appStyles.card}>
        <Pressable style={appStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={UCIColors.navy} />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={appStyles.title}>About Us</Text>

          {sections.map((section) => (
            <Pressable
              key={section.title}
              style={styles.infoCard}
              onPress={() => router.push(section.route as any)}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 65,
    paddingBottom: 40,
  },
  infoCard: {
    width: 250,
    backgroundColor: UCIColors.cream,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: UCIColors.navy,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: UCIColors.textGray,
  },
});