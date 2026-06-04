const express = require('express');
const cors = require('cors');

const portalData = require('./data/partnerPortalData');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let orders = portalData.initialOrders.map((order) => ({ ...order }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/partner-portal/overview', (req, res) => {
  res.json({
    dashboardMetrics: portalData.dashboardMetrics,
    orders,
    pickupStations: portalData.pickupStations,
    weeklyRevenue: portalData.weeklyRevenue,
    analyticsSummary: portalData.analyticsSummary,
    couriers: portalData.couriers,
  });
});

app.put('/api/partner-portal/orders/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const orderIndex = orders.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  orders[orderIndex] = { ...orders[orderIndex], status };

  return res.json({ order: orders[orderIndex] });
});

app.listen(port, () => {
  console.log(`Partner portal API listening on port ${port}`);
});
