require("dotenv").config();

const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");
const PartnerPortal = require("./models/PartnerPortal");
const restaurants = require("./data/restaurantsData");
const partnerPortalData = require("./data/partnerPortalData");

const seedData = async () => {
  try {
    await connectDB();

    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurants);

    await PartnerPortal.deleteMany();
    await PartnerPortal.create(partnerPortalData);

    console.log("Restaurants seeded successfully!");
    console.log("Partner portal seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedData();