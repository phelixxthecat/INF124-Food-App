import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function PortalHeader() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBlue }]}>
      <View style={styles.brandContainer}>
        <Text style={[styles.brandName, { fontFamily: Fonts.sans, color: '#FFFFFF' }]}>UCI Eats</Text>
        <Text style={[styles.portalLabel, { fontFamily: Fonts.serif, color: theme.accentGold }]}>Partner Portal</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => console.log('Notifications pressed')}
          style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={theme.accentGold} />
          <View style={[styles.notificationDot, { backgroundColor: theme.accentGold }]} />
        </Pressable>

        <View style={[styles.avatar, { borderColor: theme.accentGold }]}>
          <Text style={[styles.avatarText, { fontFamily: Fonts.sans }]}>AD</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandContainer: {
    flexShrink: 1,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  portalLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
