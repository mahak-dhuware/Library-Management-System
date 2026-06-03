const express = require("express");

const router = express.Router();

const {
    getBorrowRecords,
    getOverdueBooks,
    getDashboardStats
} = require("../controllers/adminController");

const validateToken =
    require("../middleware/validateTokenHandler");

const adminOnly =
    require("../middleware/adminMiddleware");

router.get(
    "/borrow-records",
    validateToken,
    adminOnly,
    getBorrowRecords
);

router.get(
    "/overdue",
    validateToken,
    adminOnly,
    getOverdueBooks
);

router.get(
    "/stats",
    validateToken,
    getDashboardStats
);

module.exports = router;