import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import type { PortalOrder } from './types';

type LiveOrderManagementModuleProps = {
  orders: PortalOrder[];
  onStatusPress: (order: PortalOrder) => void;
};

function getStatusColor(status: PortalOrder['status'], theme = Colors.light) {
  switch (status) {
    case 'Delivered':
      return theme.successGreen;
    case 'Preparing':
      return theme.warningOrange;
    case 'Out for Delivery':
      return theme.primaryBlue;
    case 'Ready for Pickup':
      return theme.accentGold;
    default:
      return theme.textSecondary;
  }
}

function StatusBadge({ order, onPress }: { order: PortalOrder; onPress: () => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const statusColor = getStatusColor(order.status, theme);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Change status for order ${order.orderNumber}`}
      style={({ pressed }) => [
        styles.statusBadge,
        { backgroundColor: `${statusColor}18`, borderColor: statusColor },
        pressed && styles.badgePressed,
      ]}>
      <Text style={[styles.statusBadgeText, { color: statusColor, fontFamily: Fonts.sans }]}>{order.status}</Text>
    </Pressable>
  );
}

export function LiveOrderManagementModule({ orders, onStatusPress }: LiveOrderManagementModuleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Live Order Management</Text>
      <View style={[styles.card, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableBody}>
            <View style={[styles.tableHeaderRow, { borderBottomColor: theme.borderLight }]}>
              <Text style={[styles.headerCell, styles.orderCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Order #</Text>
              <Text style={[styles.headerCell, styles.itemsCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Items</Text>
              <Text style={[styles.headerCell, styles.customerCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Customer</Text>
              <Text style={[styles.headerCell, styles.locationCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Campus Location</Text>
              <Text style={[styles.headerCell, styles.statusCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Status</Text>
              <Text style={[styles.headerCell, styles.actionsCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Actions</Text>
            </View>

            {orders.map((order) => {
              const classroomDelivery = order.destinationType === 'Classroom';

              return (
                <View key={order.id} style={[styles.tableRow, { borderBottomColor: theme.borderLight }]}>
                  <View style={styles.orderCell}>
                    <Text style={[styles.orderNumber, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{order.orderNumber}</Text>
                    <View style={[styles.destinationPill, { borderColor: theme.borderLight, backgroundColor: theme.bgAltGray }]}>
                      <Ionicons name={classroomDelivery ? 'school-outline' : 'storefront-outline'} size={12} color={theme.textSecondary} />
                      <Text style={[styles.destinationText, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>
                        {order.destinationType}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.itemsCell, styles.itemsRow]}>
                    <Image source={{ uri: order.thumbnailUri }} style={styles.thumbnail} contentFit="cover" />
                    <Text style={[styles.cellText, { color: theme.textPrimary, fontFamily: Fonts.sans }]} numberOfLines={2}>
                      {order.items}
                    </Text>
                  </View>

                  <Text style={[styles.cellText, styles.customerCell, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{order.customer}</Text>

                  <View style={[styles.locationCell, styles.locationRow]}>
                    <Ionicons name="location-outline" size={14} color={theme.primaryBlue} />
                    <Text style={[styles.cellText, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{order.campusLocation}</Text>
                  </View>

                  <View style={styles.statusCell}>
                    <StatusBadge order={order} onPress={() => onStatusPress(order)} />
                  </View>

                  <View style={styles.actionsCell}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`View details for order ${order.orderNumber}`}
                      onPress={() => console.log(`View details for ${order.orderNumber}`)}
                      style={({ pressed }) => [styles.actionButton, pressed && styles.badgePressed]}>
                      <Ionicons name="ellipsis-horizontal" size={18} color={theme.textSecondary} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
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
  tableBody: {
    minWidth: 860,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerCell: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cellText: {
    fontSize: 13,
    lineHeight: 18,
  },
  orderCell: {
    width: 120,
    paddingRight: 12,
  },
  itemsCell: {
    width: 220,
    paddingRight: 12,
  },
  customerCell: {
    width: 150,
    paddingRight: 12,
  },
  locationCell: {
    width: 190,
    paddingRight: 12,
  },
  statusCell: {
    width: 160,
    paddingRight: 12,
  },
  actionsCell: {
    width: 80,
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  destinationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  destinationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumbnail: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  badgePressed: {
    opacity: 0.75,
  },
});
