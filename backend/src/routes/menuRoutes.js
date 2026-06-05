const express = require("express");
const {
  getMenuItems,
  getMenuItemsByRestaurant,
  createMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenuItems);
router.get("/restaurant/:restaurantId", getMenuItemsByRestaurant);
router.post("/", createMenuItem);

module.exports = router;