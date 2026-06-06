import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { appStyles, UCIColors } from '../../../constants/appStyles';
import { router } from 'expo-router';

export default function SettingsPage() {
  const [pushNotifications, setPushNotifications] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Settings</Text>

      <View style={appStyles.card}>
        <Pressable
            style={appStyles.backButton}
            onPress={() => router.navigate('/(tabs)/ProfilePages/profile')}
        >
            <Ionicons
                name="arrow-back"
                size={24}
                color={UCIColors.navy}
            />
        </Pressable>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>
            Notifications
          </Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>
              Push Notifications
            </Text>

            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingText}>
              Email Notifications
            </Text>

            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
          </View>

          <Text style={styles.sectionTitle}>
            Payment
          </Text>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name="card-outline"
                size={22}
                color={UCIColors.navy}
              />

              <Text style={styles.menuText}>
                Payment Methods
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={UCIColors.textGray}
            />
          </Pressable>

          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name="person-outline"
                size={22}
                color={UCIColors.navy}
              />

              <Text style={styles.menuText}>
                Edit Profile
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={UCIColors.textGray}
            />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={UCIColors.navy}
              />

              <Text style={styles.menuText}>
                Change Password
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={UCIColors.textGray}
            />
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
    paddingTop: 70,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: UCIColors.navy,
    marginTop: 30,
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 14,
  },

  settingText: {
    fontSize: 16,
    color: UCIColors.navy,
    fontWeight: '600',
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: UCIColors.gray,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: UCIColors.navy,
    fontWeight: '600',
  },
});