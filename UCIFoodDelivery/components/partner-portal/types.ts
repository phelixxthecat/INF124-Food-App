export type OrderStatus = 'Delivered' | 'Preparing' | 'Out for Delivery' | 'Ready for Pickup';

export type OrderDestinationType = 'Campus Pickup' | 'Classroom';

export type PortalOrder = {
  id: string;
  orderNumber: string;
  items: string;
  customer: string;
  campusLocation: string;
  status: OrderStatus;
  destinationType: OrderDestinationType;
  thumbnailUri: string;
};

export type PickupStation = {
  id: string;
  capacity: number;
};

export type CourierStatus = 'Available' | 'Busy' | 'In Transit' | 'On Break';

export type Courier = {
  id: string;
  name: string;
  status: CourierStatus;
  activeAssignments: number;
  classroomRoute: string | null;
  avatarUri: string;
};

export type WeeklyRevenuePoint = {
  day: string;
  amount: number;
};
