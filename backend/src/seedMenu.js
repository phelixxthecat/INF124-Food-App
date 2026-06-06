require("dotenv").config();

const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");
const menuData = require("./data/menuItems");

const seedMenu = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();

    for (const restaurantMenu of menuData) {
      const restaurant = await Restaurant.findOne({
        name: restaurantMenu.restaurantName,
      });

      if (!restaurant) {
        console.log(`Restaurant not found: ${restaurantMenu.restaurantName}`);
        continue;
      }

      const itemsWithRestaurantId = restaurantMenu.items.map((item) => ({
        ...item,
        restaurantId: restaurant._id,
      }));

      await MenuItem.insertMany(itemsWithRestaurantId);
    }

    console.log("Menu items seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Menu seed failed:", error);
    process.exit(1);
  }
};

seedMenu();