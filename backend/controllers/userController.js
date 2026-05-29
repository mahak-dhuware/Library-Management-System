const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check existing user
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // Response
    if (user) {

        res.status(201).json({
            _id: user.id,
            email: user.email,
            role: user.role
        });

    } else {

        res.status(400);
        throw new Error("User data is not valid");
    }

});

//@desc Login User
//@route POST /api/Users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    // Compare password
    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
    accessToken,
    user: {
        id: user.id,
        role: user.role
    }
});

    } else {

        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc current User info
//@route POST /api/Users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const myBooks = asyncHandler(async (req, res) => {

    const books = await Book.find({
        borrowedBy: req.user.id
    });

    res.status(200).json(books);
});

module.exports = {registerUser, loginUser, currentUser, myBooks};