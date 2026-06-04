import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import {
  fetchPartnerPortalOverview,
  updatePartnerPortalOrderStatus,
} from '@/services/partnerPortalApi';
import { AnalyticsBriefModule } from './AnalyticsBriefModule';
import { CourierAssignmentModule } from './CourierAssignmentModule';
import { DashboardOverviewModule } from './DashboardOverviewModule';
import { LiveOrderManagementModule } from './LiveOrderManagementModule';
import { PickupStationManagementModule } from './PickupStationManagementModule';
import { PortalHeader } from './PortalHeader';
import type {
  AnalyticsSummary,
  Courier,
  DashboardMetrics,
  OrderStatus,
  PickupStation,
  PortalOrder,
  WeeklyRevenuePoint,
} from './types';

const STATUS_OPTIONS: OrderStatus[] = ['Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];

export function PartnerPortalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [orders, setOrders] = useState<PortalOrder[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [pickupStations, setPickupStations] = useState<PickupStation[]>([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState<WeeklyRevenuePoint[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PortalOrder | null>(null);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const selectedOrderStatus = useMemo(() => selectedOrder?.status ?? null, [selectedOrder]);

  const openStatusModal = (order: PortalOrder) => {
    setSelectedOrder(order);
    setIsStatusModalVisible(true);
  };

  const updateOrderStatus = async (status: OrderStatus) => {
    if (!selectedOrder) {
      return;
    }

    try {
      const updatedOrder = await updatePartnerPortalOrderStatus(selectedOrder.id, status);
      setOrders((currentOrders) =>
        currentOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
      );
      console.log(`Updated ${selectedOrder.orderNumber} to ${status}`);
    } catch (error) {
      console.log('Failed to update order status', error);
    }

    setIsStatusModalVisible(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      setLoadError(null);

      try {
        const overview = await fetchPartnerPortalOverview();
        if (!isMounted) {
          return;
        }

        setDashboardMetrics(overview.dashboardMetrics);
        setOrders(overview.orders);
        setPickupStations(overview.pickupStations);
        setWeeklyRevenue(overview.weeklyRevenue);
        setAnalyticsSummary(overview.analyticsSummary);
        setCouriers(overview.couriers);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setLoadError('Unable to load partner portal data.');
      } finally {
        // Loading state is derived from data readiness.
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const isReady = Boolean(dashboardMetrics && analyticsSummary && weeklyRevenue.length);

  if (!isReady) {
    return (
      <View style={[styles.screen, { backgroundColor: theme.bgAltGray }]}>
        <PortalHeader />
        <View style={styles.loadingState}>
          <Text style={[styles.loadingText, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Loading portal data...</Text>
          {loadError ? (
            <Text style={[styles.errorText, { color: theme.errorRed, fontFamily: Fonts.sans }]}>{loadError}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.bgAltGray }]}>
      <PortalHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="UCI Eats partner portal screen">
        <DashboardOverviewModule
          activeOrders={dashboardMetrics.activeOrders}
          todaysRevenue={dashboardMetrics.todaysRevenue}
          partnerRating={dashboardMetrics.partnerRating}
        />

        <LiveOrderManagementModule orders={orders} onStatusPress={openStatusModal} />

        <PickupStationManagementModule stations={pickupStations} />

        <AnalyticsBriefModule
          revenueSeries={weeklyRevenue}
          bestSellingItem={analyticsSummary.bestSellingItem}
          peakHour={analyticsSummary.peakHour}
        />

        <CourierAssignmentModule couriers={couriers} />
      </ScrollView>

      <Modal
        visible={isStatusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsStatusModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.bgClean }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>Update Status</Text>
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary, fontFamily: Fonts.sans }]}> 
              {selectedOrder?.orderNumber ?? ''} {selectedOrder?.customer ? `- ${selectedOrder.customer}` : ''}
            </Text>

            <View style={styles.modalOptionList}>
              {STATUS_OPTIONS.map((status) => {
                const isSelected = selectedOrderStatus === status;
                const isActive = selectedOrder?.status === status;
                const statusColor =
                  status === 'Delivered'
                    ? theme.successGreen
                    : status === 'Preparing'
                      ? theme.warningOrange
                      : status === 'Ready for Pickup'
                        ? theme.accentGold
                        : theme.primaryBlue;

                return (
                  <Pressable
                    key={status}
                    onPress={() => updateOrderStatus(status)}
                    style={({ pressed }) => [
                      styles.modalOption,
                      {
                        borderColor: isSelected ? statusColor : theme.borderLight,
                        backgroundColor: isSelected ? `${statusColor}12` : theme.bgClean,
                      },
                      pressed && styles.modalOptionPressed,
                    ]}>
                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    <Text style={[styles.modalOptionText, { color: theme.textPrimary, fontFamily: Fonts.sans }]}>{status}</Text>
                    {isActive ? <Ionicons name="checkmark-circle" size={18} color={statusColor} /> : null}
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => setIsStatusModalVisible(false)}
              style={({ pressed }) => [
                styles.closeButton,
                { backgroundColor: theme.primaryBlue },
                pressed && styles.modalOptionPressed,
              ]}>
              <Text style={[styles.closeButtonText, { color: theme.bgClean, fontFamily: Fonts.sans }]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.48)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  modalOptionList: {
    gap: 10,
    marginBottom: 16,
  },
  modalOption: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalOptionPressed: {
    opacity: 0.84,
  },
  loadingState: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 13,
  },
  modalOptionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  closeButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
