// routes/bookRoutes.js

const express = require("express");

const router = express.Router();

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
} = require("../controllers/bookController");

const validateToken = require("../middleware/validateTokenHandler");

const adminMiddleware = require("../middleware/adminMiddleware");

router.post(
    "/borrow/:id",
    validateToken,
    borrowBook
);

router.post(
    "/return/:id",
    validateToken,
    returnBook
);


router.route("/")
.get(getBooks)
.post(
    validateToken,
    adminMiddleware,
    createBook
);


router.route("/:id")
.get(getBook)
.put(
    validateToken,
    adminMiddleware,
    updateBook
)
.delete(
    validateToken,
    adminMiddleware,
    deleteBook
);

module.exports = router;