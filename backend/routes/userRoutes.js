const express = require("express");
const {currentUser, registerUser, loginUser,myBooks, getBorrowHistory } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get("/mybooks", validateToken, myBooks);

router.get(
    "/history",
    validateToken,
    getBorrowHistory
);

module.exports = router;