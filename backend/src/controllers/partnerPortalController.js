const PartnerPortal = require('../models/PartnerPortal');
const partnerPortalData = require('../data/partnerPortalData');

const getPartnerPortalSnapshot = async (req, res) => {
  try {
    const portal = await PartnerPortal.findOne().sort({ updatedAt: -1 });

    if (!portal) {
      const createdPortal = await PartnerPortal.create(partnerPortalData);
      return res.json(createdPortal);
    }

    res.json(portal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch partner portal data' });
  }
};

const updatePortalOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const portal = await PartnerPortal.findOne().sort({ updatedAt: -1 }) || await PartnerPortal.create(partnerPortalData);

    const order = portal.orders.find(
      (portalOrder) => portalOrder.id === req.params.orderId || portalOrder.orderNumber === req.params.orderId,
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    portal.dashboardMetrics.activeOrders = portal.orders.filter(
      (portalOrder) => portalOrder.status !== 'Delivered',
    ).length;

    await portal.save();

    res.json(portal);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order status' });
  }
};

module.exports = {
  getPartnerPortalSnapshot,
  updatePortalOrderStatus,
};