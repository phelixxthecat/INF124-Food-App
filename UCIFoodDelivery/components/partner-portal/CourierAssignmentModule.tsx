import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import type { Courier } from './types';

type CourierAssignmentModuleProps = {
  couriers: Courier[];
};

function getCourierStatusColor(status: Courier['status'], theme = Colors.light) {
  switch (status) {
    case 'Available':
      return theme.successGreen;
    case 'Busy':
      return theme.warningOrange;
    case 'In Transit':
      return theme.primaryBlue;
    case 'On Break':
      return theme.textSecondary;
    default:
      return theme.textSecondary;
  }
}

export function CourierAssignmentModule({ couriers }: CourierAssignmentModuleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCouriers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return couriers;
    }

    return couriers.filter((courier) => courier.name.toLowerCase().includes(query));
  }, [couriers, searchQuery]);

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Courier Assignment</Text>

      <View style={[styles.card, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.bgAltGray, borderColor: theme.borderLight }]}>
          <Ionicons name="search" size={18} color={theme.textSecondary} />
          <TextInput
            placeholder="Search couriers"
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary, fontFamily: Fonts.sans }]}
            accessibilityLabel="Search couriers"
          />
        </View>

        <View style={styles.listContainer}>
          {filteredCouriers.map((courier) => {
            const statusColor = getCourierStatusColor(courier.status, theme);
            const classroomDelivery = Boolean(courier.classroomRoute);

            return (
              <Pressable
                key={courier.id}
                onPress={() => console.log(`Courier pressed: ${courier.name}`)}
                accessibilityRole="button"
                accessibilityLabel={`${courier.name} courier card`}
                style={({ pressed }) => [styles.courierRow, pressed && styles.rowPressed]}>
                <Image source={{ uri: courier.avatarUri }} style={styles.avatar} contentFit="cover" />

                <View style={styles.courierInfo}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.courierName, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{courier.name}</Text>
                    {classroomDelivery ? (
                      <View style={[styles.routeMarker, { backgroundColor: `${theme.accentGold}22` }]}>
                        <Ionicons name="school-outline" size={12} color={theme.accentGold} />
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.subRow}>
                    <View style={[styles.statusPill, { backgroundColor: `${statusColor}18`, borderColor: statusColor }]}>
                      <Text style={[styles.statusText, { color: statusColor, fontFamily: Fonts.sans }]}>{courier.status}</Text>
                    </View>

                    <Text style={[styles.assignmentsText, { color: theme.textSecondary, fontFamily: Fonts.sans }]}> 
                      {courier.activeAssignments} active assignments
                    </Text>
                  </View>

                  {courier.classroomRoute ? (
                    <Text style={[styles.routeText, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Classroom route: {courier.classroomRoute}</Text>
                  ) : (
                    <Text style={[styles.routeText, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Campus pickup coverage</Text>
                  )}
                </View>

                <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 10,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 0,
  },
  listContainer: {
    gap: 12,
  },
  courierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E5E5',
  },
  rowPressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.92,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  courierInfo: {
    flex: 1,
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  courierName: {
    fontSize: 15,
    fontWeight: '800',
    flexShrink: 1,
  },
  routeMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  assignmentsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routeText: {
    fontSize: 12,
    lineHeight: 17,
  },
});
