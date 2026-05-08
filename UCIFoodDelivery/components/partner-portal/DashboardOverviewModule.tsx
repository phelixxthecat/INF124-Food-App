import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type DashboardOverviewModuleProps = {
  activeOrders: number;
  todaysRevenue: number;
  partnerRating: number;
};

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  highlight?: boolean;
  onPress: () => void;
};

function MetricCard({ label, value, detail, iconName, highlight, onPress }: MetricCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} card`}
      style={({ pressed }) => [
        styles.metricCard,
        { borderColor: theme.borderLight, backgroundColor: theme.bgClean },
        pressed && styles.metricCardPressed,
      ]}>
      <View style={styles.metricCardTopRow}>
        <Text style={[styles.metricLabel, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>{label}</Text>
        {iconName ? <Ionicons name={iconName} size={18} color={theme.accentGold} /> : null}
      </View>

      <Text
        style={[
          styles.metricValue,
          { color: highlight ? theme.accentGold : theme.textPrimary, fontFamily: Fonts.sans },
        ]}>
        {value}
      </Text>

      <Text style={[styles.metricDetail, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>{detail}</Text>
    </Pressable>
  );
}

export function DashboardOverviewModule({ activeOrders, todaysRevenue, partnerRating }: DashboardOverviewModuleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Dashboard Overview</Text>

      <View style={styles.metricRow}>
        <MetricCard
          label="Active Orders"
          value={String(activeOrders)}
          detail="Currently moving through the kitchen"
          onPress={() => console.log('Active Orders card pressed')}
        />
        <MetricCard
          label="Today’s Revenue"
          value={`$${todaysRevenue}`}
          detail="Tracked through the portal"
          onPress={() => console.log('Today\'s Revenue card pressed')}
        />
        <MetricCard
          label="Partner Rating"
          value={partnerRating.toFixed(1)}
          detail="Gold customer feedback"
          iconName="star"
          highlight
          onPress={() => console.log('Partner Rating card pressed')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  metricCard: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  metricCardPressed: {
    transform: [{ scale: 0.99 }],
  },
  metricCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  metricDetail: {
    fontSize: 12,
    lineHeight: 17,
  },
});
