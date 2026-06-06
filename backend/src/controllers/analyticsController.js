const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

const getAnalytics = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    const menuItems = await MenuItem.find();

    let openCount = 0;

    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].isOpen) {
        openCount++;
      }
    }

    res.json({
      totalRestaurants: restaurants.length,
      openRestaurants: openCount,
      totalMenuItems: menuItems.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get analytics",
    });
  }
};

module.exports = {
  getAnalytics,
};