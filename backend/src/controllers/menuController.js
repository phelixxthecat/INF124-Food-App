const MenuItem = require("../models/MenuItem");

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("restaurantId");
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({
      restaurantId: req.params.restaurantId,
    });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurant menu" });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to create menu item" });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemsByRestaurant,
  createMenuItem,
};