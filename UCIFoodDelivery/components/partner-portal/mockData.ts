import type { Courier, PickupStation, PortalOrder, WeeklyRevenuePoint } from './types';

export const DASHBOARD_METRICS = {
  activeOrders: 8,
  todaysRevenue: 425,
  partnerRating: 4.9,
};

export const INITIAL_ORDERS: PortalOrder[] = [
  {
    id: '1',
    orderNumber: '#2048',
    items: "Peter's Poke Bowl x1, Citrus Sparkling Tea x1",
    customer: 'Mia Chen',
    campusLocation: 'ICS1 420',
    status: 'Out for Delivery',
    destinationType: 'Classroom',
    thumbnailUri:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    orderNumber: '#2049',
    items: 'Bacon Avocado Burger x2',
    customer: 'Jordan Lee',
    campusLocation: 'Aldrich Hall',
    status: 'Preparing',
    destinationType: 'Campus Pickup',
    thumbnailUri:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    orderNumber: '#2050',
    items: 'Chicken Katsu Plate x1',
    customer: 'Sofia Ramirez',
    campusLocation: 'Student Center',
    status: 'Ready for Pickup',
    destinationType: 'Campus Pickup',
    thumbnailUri:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    orderNumber: '#2051',
    items: 'Salmon Grain Bowl x1, Matcha Latte x1',
    customer: 'Ethan Wu',
    campusLocation: 'Langson Library',
    status: 'Delivered',
    destinationType: 'Classroom',
    thumbnailUri:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=80',
  },
];

export const PICKUP_STATIONS: PickupStation[] = [
  { id: 'ALDRICH HALL', capacity: 85 },
  { id: 'ICS COURTYARD', capacity: 93 },
  { id: 'STUDENT CENTER', capacity: 61 },
  { id: 'LANGSON LIBRARY', capacity: 74 },
];

export const WEEKLY_REVENUE: WeeklyRevenuePoint[] = [
  { day: 'Mon', amount: 280 },
  { day: 'Tue', amount: 335 },
  { day: 'Wed', amount: 315 },
  { day: 'Thu', amount: 460 },
  { day: 'Fri', amount: 425 },
  { day: 'Sat', amount: 390 },
  { day: 'Sun', amount: 305 },
];

export const ANALYTICS_SUMMARY = {
  bestSellingItem: "Peter's Poke Bowl",
  peakHour: '12:00 PM',
};

export const COURIERS: Courier[] = [
  {
    id: '1',
    name: 'Avery Park',
    status: 'In Transit',
    activeAssignments: 3,
    classroomRoute: 'ICS1 420',
    avatarUri:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Noah Johnson',
    status: 'Available',
    activeAssignments: 1,
    classroomRoute: null,
    avatarUri:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Isabella Tran',
    status: 'Busy',
    activeAssignments: 4,
    classroomRoute: 'GMP 2200',
    avatarUri:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Marcus Reed',
    status: 'On Break',
    activeAssignments: 0,
    classroomRoute: null,
    avatarUri:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];
