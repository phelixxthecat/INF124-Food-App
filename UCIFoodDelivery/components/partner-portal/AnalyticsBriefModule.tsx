import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import type { WeeklyRevenuePoint } from './types';

type AnalyticsBriefModuleProps = {
  revenueSeries: WeeklyRevenuePoint[];
  bestSellingItem: string;
  peakHour: string;
};

export function AnalyticsBriefModule({ revenueSeries, bestSellingItem, peakHour }: AnalyticsBriefModuleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const maxValue = Math.max(...revenueSeries.map((point) => point.amount));

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Analytics Brief</Text>

      <Pressable
        onPress={() => console.log('Analytics brief pressed')}
        accessibilityRole="button"
        accessibilityLabel="Analytics brief"
        style={[styles.card, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
        <View style={styles.chartArea}>
          {revenueSeries.map((point) => {
            const barHeight = Math.max((point.amount / maxValue) * 100, 18);

            return (
              <View key={point.day} style={styles.chartColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${barHeight}%`,
                        backgroundColor: point.amount === maxValue ? theme.accentGold : theme.primaryBlue,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.dayLabel, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>{point.day}</Text>
                <Text style={[styles.amountLabel, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>
                  ${point.amount}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.bgAltGray }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Best-Selling Item</Text>
            <Text style={[styles.summaryValue, { color: theme.accentGold, fontFamily: Fonts.sans }]}>{bestSellingItem}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Peak Hour</Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary, fontFamily: Fonts.serif }]}>{peakHour}</Text>
          </View>
        </View>
      </Pressable>
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
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 170,
    gap: 10,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  barTrack: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 12,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  summaryCard: {
    marginTop: 16,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  summaryRow: {
    gap: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '800',
  },
});
