import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../constants/appStyles';

type PageItem = {
  title: string;
  route: string;
};

type FolderSection = {
  title: string;
  pages: PageItem[];
};

export default function HomePage() {
  const router = useRouter();
  const [openFolder, setOpenFolder] = useState<string | null>('Main');

  const folders: FolderSection[] = [
    {
      title: 'Main',
      pages: [
        { title: 'Food', route: '/food' },
        { title: 'Checkout', route: '/Checkout' },
      ],
    },
    {
      title: 'Onboarding',
      pages: [
        { title: 'Onboarding', route: '/OnboardingPages/onboarding' },
        { title: 'Login', route: '/OnboardingPages/loginPage' },
        { title: 'Register', route: '/OnboardingPages/register' },
        { title: 'About Us', route: '/OnboardingPages/aboutUs' },
      ],
    },
    {
      title: 'About Us',
      pages: [
        { title: 'Our Mission', route: '/AboutUsPages/missionPage' },
        { title: 'Who We Serve', route: '/AboutUsPages/servePage' },
        { title: 'How It Works', route: '/AboutUsPages/howItWorksPage' },
        { title: 'Why Choose Us', route: '/AboutUsPages/whyUsPage' },
        { title: 'Contact Info', route: '/AboutUsPages/contactPage' },
      ],
    },
    {
      title: 'Profile',
      pages: [
        { title: 'Profile', route: '/ProfilePages/profile' },
        { title: 'Order History', route: '/ProfilePages/orderHistory' },
        { title: 'Favorite Orders', route: '/ProfilePages/favoriteOrders' },
        { title: 'Saved Locations', route: '/ProfilePages/savedLocations' },
      ],
    },
    {
      title: 'Partner Portal',
      pages: [
        { title: 'Partner Portal Home', route: '/partner-portal' },
      ],
    },
  ];

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Home Page</Text>

      <View style={appStyles.card}>
        <Text style={appStyles.logo}>ZotEats</Text>
        <Text style={styles.subtitle}>App Navigation</Text>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {folders.map((folder) => {
            const isOpen = openFolder === folder.title;

            return (
              <View key={folder.title} style={styles.folder}>
                <Pressable
                  style={styles.folderHeader}
                  onPress={() => setOpenFolder(isOpen ? null : folder.title)}
                >
                  <Text style={styles.folderTitle}>{folder.title}</Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={UCIColors.navy}
                  />
                </Pressable>

                {isOpen && (
                  <View style={styles.dropdown}>
                    {folder.pages.map((page) => (
                      <Pressable
                        key={page.title}
                        style={styles.pageButton}
                        onPress={() => router.push(page.route as any)}
                      >
                        <Text style={styles.pageButtonText}>{page.title}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 10,
    marginBottom: 20,
    color: UCIColors.textGray,
    fontWeight: '700',
  },

  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  folder: {
    width: 260,
    marginBottom: 14,
  },

  folderHeader: {
    backgroundColor: UCIColors.cream,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  folderTitle: {
    color: UCIColors.navy,
    fontSize: 15,
    fontWeight: '800',
  },

  dropdown: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
  },

  pageButton: {
    width: 230,
    height: 42,
    backgroundColor: UCIColors.navy,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pageButtonText: {
    color: UCIColors.white,
    fontSize: 12,
    fontWeight: '800',
  },
});