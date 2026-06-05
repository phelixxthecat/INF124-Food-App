require("dotenv").config();

const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");
const restaurants = require("./data/restaurantsData");

const seedData = async () => {
  try {
    await connectDB();

    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurants);

    console.log("Restaurants seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedData();