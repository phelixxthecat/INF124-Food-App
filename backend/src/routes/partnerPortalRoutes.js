const express = require('express');

const {
  getPartnerPortalSnapshot,
  updatePortalOrderStatus,
} = require('../controllers/partnerPortalController');

const router = express.Router();

router.get('/', getPartnerPortalSnapshot);
router.patch('/orders/:orderId/status', updatePortalOrderStatus);

module.exports = router;