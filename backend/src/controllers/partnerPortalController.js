const Order = require('../models/Order');
const { couriers } = require('../data/partnerPortalData');

const RESTAURANT_NAME = 'Panda Express';
const DEFAULT_THUMBNAIL_URI = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80';
const DEFAULT_PEAK_HOUR = '12:00 PM';
const DEFAULT_PARTNER_RATING = 4.9;
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const formatOrderNumber = (orderId) => {
  const suffix = String(orderId).slice(-4).toUpperCase();
  return `#${suffix}`;
};

const normalizeOrderItemEntries = (items) =>
  items.map((item) => `${item.name} x${item.quantity}`).join(', ');

const formatDisplayHour = (date) => {
  const hour = date.getHours();
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${suffix}`;
};

const buildPortalOrder = (order) => ({
  id: order._id.toString(),
  orderNumber: formatOrderNumber(order._id.toString()),
  restaurantName: order.restaurantName,
  items: normalizeOrderItemEntries(order.items),
  customer: order.customer || 'Guest Customer',
  campusLocation: order.campusLocation || 'UCI Campus',
  status: order.status === 'Preparing' ? 'Preparing' : order.status,
  destinationType: order.destinationType || 'Campus Pickup',
  thumbnailUri: order.thumbnailUri || DEFAULT_THUMBNAIL_URI,
});

const buildAnalyticsSummary = (orders) => {
  const itemCounts = new Map();
  const hourCounts = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      itemCounts.set(item.name, (itemCounts.get(item.name) ?? 0) + item.quantity);
    });

    const createdAt = new Date(order.createdAt);
    const hourLabel = formatDisplayHour(createdAt);
    hourCounts.set(hourLabel, (hourCounts.get(hourLabel) ?? 0) + 1);
  });

  const bestSellingItem = [...itemCounts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] || 'No orders yet';
  const peakHour = [...hourCounts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] || DEFAULT_PEAK_HOUR;

  return {
    bestSellingItem,
    peakHour,
  };
};

const buildWeeklyRevenue = (orders) => {
  const revenueByDay = new Map(WEEK_DAYS.map((day) => [day, 0]));

  orders.forEach((order) => {
    const day = WEEK_DAYS[new Date(order.createdAt).getDay() === 0 ? 6 : new Date(order.createdAt).getDay() - 1];
    revenueByDay.set(day, (revenueByDay.get(day) ?? 0) + order.total);
  });

  return WEEK_DAYS.map((day) => ({
    day,
    amount: Number((revenueByDay.get(day) ?? 0).toFixed(2)),
  }));
};

const buildDashboardMetrics = (orders) => {
  const activeOrders = orders.filter((order) => order.status !== 'Delivered').length;
  const todaysRevenue = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    })
    .reduce((sum, order) => sum + order.total, 0);

  const deliveredOrders = orders.filter((order) => order.status === 'Delivered').length;
  const partnerRating = orders.length === 0
    ? DEFAULT_PARTNER_RATING
    : Number((4.2 + (deliveredOrders / orders.length) * 0.8).toFixed(1));

  return {
    activeOrders,
    todaysRevenue: Number(todaysRevenue.toFixed(2)),
    partnerRating,
  };
};

const buildSnapshot = (orders) => ({
  dashboardMetrics: buildDashboardMetrics(orders),
  analyticsSummary: buildAnalyticsSummary(orders),
  orders: orders.map(buildPortalOrder),
  couriers,
  weeklyRevenue: buildWeeklyRevenue(orders),
});

const getPandaExpressOrders = async () => {
  const orders = await Order.find({ restaurantName: RESTAURANT_NAME }).sort({ createdAt: -1 });
  return orders;
};

const getPartnerPortalSnapshot = async (req, res) => {
  try {
    const orders = await getPandaExpressOrders();
    return res.json(buildSnapshot(orders));
  } catch (error) {
    console.error('Failed to load partner portal orders:', error.message);
    return res.json(buildSnapshot([]));
  }
};

const updatePortalOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orders = await getPandaExpressOrders();
    const portalOrder = orders.find((order) => {
      const orderId = order._id.toString();
      const orderNumber = formatOrderNumber(orderId);
      return orderId === req.params.orderId || orderNumber === req.params.orderId;
    });

    if (!portalOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    portalOrder.status = status;
    await portalOrder.save();

    const refreshedOrders = await getPandaExpressOrders();
    return res.json(buildSnapshot(refreshedOrders));
  } catch (error) {
    console.error('Failed to update partner portal order:', error.message);
    return res.status(500).json({ message: 'Failed to update order status' });
  }
};

module.exports = {
  getPartnerPortalSnapshot,
  updatePortalOrderStatus,
};
