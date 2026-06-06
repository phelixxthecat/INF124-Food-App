const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const {
      restaurantId,
      restaurantName,
      items,
      customer,
      campusLocation,
      destinationType,
      thumbnailUri,
    } = req.body;

    if (!restaurantId || !restaurantName || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "restaurantId, restaurantName, and items are required" });
    }

    const normalizedItems = [];

    for (const item of items) {
      if (!item.menuItemId || !mongoose.Types.ObjectId.isValid(item.menuItemId)) {
        return res.status(400).json({ message: "Each item must include a valid menuItemId" });
      }

      const quantity = Number(item.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Each item must include a quantity greater than 0" });
      }

      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${item.menuItemId}` });
      }

      normalizedItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
      });
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Number((subtotal * 0.1).toFixed(2));
    const deliveryFee = subtotal > 0 ? 2.99 : 0;
    const total = Number((subtotal + tax + deliveryFee).toFixed(2));

    const order = await Order.create({
      restaurantId,
      restaurantName,
      customer,
      campusLocation,
      destinationType,
      thumbnailUri,
      items: normalizedItems,
      subtotal,
      tax,
      deliveryFee,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  }
};

module.exports = {
  placeOrder,
};
