import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import type { PickupStation } from './types';

type PickupStationManagementModuleProps = {
  stations: PickupStation[];
};

function getCapacityColor(capacity: number, theme = Colors.light) {
  if (capacity > 90) {
    return theme.errorRed;
  }

  if (capacity > 75) {
    return theme.warningOrange;
  }

  return theme.successGreen;
}

export function PickupStationManagementModule({ stations }: PickupStationManagementModuleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Pickup Station Management</Text>

      <View style={[styles.card, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
        {stations.map((station) => {
          const capacityColor = getCapacityColor(station.capacity, theme);

          return (
            <Pressable
              key={station.id}
              onPress={() => console.log(`Station pressed: ${station.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`Pickup station ${station.id}`}
              style={({ pressed }) => [styles.stationRow, pressed && styles.stationRowPressed]}>
              <View style={styles.stationInfo}>
                <Text style={[styles.stationId, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{station.id}</Text>
                <Text style={[styles.stationLabel, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Live capacity</Text>
              </View>

              <View style={styles.capacityColumn}>
                <View style={[styles.capacityTrack, { backgroundColor: theme.bgAltGray }]}>
                  <View style={[styles.capacityFill, { width: `${station.capacity}%`, backgroundColor: capacityColor }]} />
                </View>
                <Text style={[styles.capacityText, { color: capacityColor, fontFamily: Fonts.sans }]}>
                  {station.capacity}%
                </Text>
              </View>
            </Pressable>
          );
        })}
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
  card: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  stationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  stationRowPressed: {
    backgroundColor: '#FAFAFA',
  },
  stationInfo: {
    gap: 4,
    flex: 1,
    paddingRight: 14,
  },
  stationId: {
    fontSize: 15,
    fontWeight: '800',
  },
  stationLabel: {
    fontSize: 12,
  },
  capacityColumn: {
    flex: 1,
    maxWidth: 270,
    alignItems: 'flex-end',
    gap: 6,
  },
  capacityTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 999,
  },
  capacityText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
