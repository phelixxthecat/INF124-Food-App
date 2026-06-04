import axios from 'axios';

import type {
    OrderStatus,
    PartnerPortalOverview,
    PortalOrder,
} from '@/components/partner-portal/types';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
});

export async function fetchPartnerPortalOverview(): Promise<PartnerPortalOverview> {
  const response = await apiClient.get<PartnerPortalOverview>('/api/partner-portal/overview');
  return response.data;
}

export async function updatePartnerPortalOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<PortalOrder> {
  const response = await apiClient.put<{ order: PortalOrder }>(
    `/api/partner-portal/orders/${orderId}/status`,
    { status },
  );

  return response.data.order;
}
