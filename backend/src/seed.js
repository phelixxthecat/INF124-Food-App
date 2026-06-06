require("dotenv").config();

const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");
const PartnerPortal = require("./models/PartnerPortal");
const restaurants = require("./data/restaurantsData");
const menuItemsData = require("./data/menuItemsData");
const partnerPortalData = require("./data/partnerPortalData");

const seedData = async () => {
  try {
    await connectDB();

    await Restaurant.deleteMany();
    const createdRestaurants = await Restaurant.insertMany(restaurants);

    const restaurantIdByName = new Map(
      createdRestaurants.map((restaurant) => [restaurant.name, restaurant._id])
    );

    const menuItems = menuItemsData
      .map((item) => {
        const restaurantId = restaurantIdByName.get(item.restaurantName);
        if (!restaurantId) {
          return null;
        }

        return {
          restaurantId,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          available: item.available,
        };
      })
      .filter(Boolean);

    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);

    await PartnerPortal.deleteMany();
    await PartnerPortal.create(partnerPortalData);

    console.log("Restaurants seeded successfully!");
    console.log("Menu items seeded successfully!");
    console.log("Partner portal seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedData();