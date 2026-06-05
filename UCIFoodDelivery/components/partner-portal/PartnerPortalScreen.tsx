import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { AnalyticsBriefModule } from './AnalyticsBriefModule';
import { CourierAssignmentModule } from './CourierAssignmentModule';
import { DashboardOverviewModule } from './DashboardOverviewModule';
import { LiveOrderManagementModule } from './LiveOrderManagementModule';
import { PortalHeader } from './PortalHeader';
import type { OrderStatus, PartnerPortalSnapshot, PortalOrder } from './types';

const STATUS_OPTIONS: OrderStatus[] = ['Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
const API_BASE_URL = 'http://localhost:5000';

export function PartnerPortalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [portalData, setPortalData] = useState<PartnerPortalSnapshot | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<PortalOrder | null>(null);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const selectedOrderStatus = useMemo(() => selectedOrder?.status ?? null, [selectedOrder]);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/partner-portal`);

        if (!response.ok) {
          throw new Error('Failed to load partner portal data');
        }

        const data: PartnerPortalSnapshot = await response.json();
        setPortalData(data);
        setLoadError(null);
      } catch (error) {
        setLoadError('Unable to load partner portal data.');
        console.error('Failed to fetch partner portal data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortalData();
  }, []);

  const orders = portalData?.orders ?? [];

  const openStatusModal = (order: PortalOrder) => {
    setSelectedOrder(order);
    setIsStatusModalVisible(true);
  };

  const updateOrderStatus = async (status: OrderStatus) => {
    if (!selectedOrder) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/partner-portal/orders/${selectedOrder.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedPortalData: PartnerPortalSnapshot = await response.json();
      setPortalData(updatedPortalData);
      console.log(`Updated ${selectedOrder.orderNumber} to ${status}`);
      setIsStatusModalVisible(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bgAltGray }]}>
      <PortalHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="UCI Eats partner portal screen">
        {isLoading ? (
          <View style={[styles.loadingState, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
            <ActivityIndicator size="large" color={theme.primaryBlue} />
            <Text style={[styles.loadingText, { color: theme.textSecondary, fontFamily: Fonts.sans }]}>Loading partner portal...</Text>
          </View>
        ) : loadError ? (
          <View style={[styles.loadingState, { backgroundColor: theme.bgClean, borderColor: theme.borderLight }]}>
            <Text style={[styles.loadingText, { color: theme.errorRed, fontFamily: Fonts.sans }]}>{loadError}</Text>
          </View>
        ) : portalData ? (
          <>
            <DashboardOverviewModule
              activeOrders={portalData.dashboardMetrics.activeOrders}
              todaysRevenue={portalData.dashboardMetrics.todaysRevenue}
              partnerRating={portalData.dashboardMetrics.partnerRating}
            />

            <LiveOrderManagementModule orders={orders} onStatusPress={openStatusModal} />

            <AnalyticsBriefModule
              revenueSeries={portalData.weeklyRevenue}
              bestSellingItem={portalData.analyticsSummary.bestSellingItem}
              peakHour={portalData.analyticsSummary.peakHour}
            />

            <CourierAssignmentModule couriers={portalData.couriers} />
          </>
        ) : null}
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
  loadingState: {
    minHeight: 220,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
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
