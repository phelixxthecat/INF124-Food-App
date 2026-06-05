const mongoose = require('mongoose');

const portalOrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    items: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    campusLocation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'],
    },
    destinationType: {
      type: String,
      required: true,
      enum: ['Campus Pickup', 'Classroom'],
    },
    thumbnailUri: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const courierSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Busy', 'In Transit', 'On Break'],
    },
    activeAssignments: {
      type: Number,
      required: true,
    },
    classroomRoute: {
      type: String,
      default: null,
    },
    avatarUri: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const weeklyRevenuePointSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const partnerPortalSchema = new mongoose.Schema(
  {
    dashboardMetrics: {
      activeOrders: {
        type: Number,
        required: true,
      },
      todaysRevenue: {
        type: Number,
        required: true,
      },
      partnerRating: {
        type: Number,
        required: true,
      },
    },
    analyticsSummary: {
      bestSellingItem: {
        type: String,
        required: true,
      },
      peakHour: {
        type: String,
        required: true,
      },
    },
    orders: {
      type: [portalOrderSchema],
      default: [],
    },
    couriers: {
      type: [courierSchema],
      default: [],
    },
    weeklyRevenue: {
      type: [weeklyRevenuePointSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('PartnerPortal', partnerPortalSchema);