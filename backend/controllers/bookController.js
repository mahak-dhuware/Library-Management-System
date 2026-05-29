// controllers/bookController.js

const asyncHandler = require("express-async-handler");

const Book = require("../models/bookModel");


//@desc Get all books
//@route GET /api/books
//@access public

const getBooks = asyncHandler(async (req, res) => {

    const search = req.query.search || "";

    const genre = req.query.genre || "";

    const query = {

        title: {
            $regex: search,
            $options: "i"
        }
    };

    if (genre) {

        query.genre = {
            $regex: genre,
            $options: "i"
        };
    }

    const books = await Book.find(query)
    .populate("createdBy");

    res.status(200).json(books);
});


//@desc Get single book
//@route GET /api/books/:id
//@access public

const getBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    res.status(200).json(book);
});


//@desc Create book
//@route POST /api/books
//@access private admin

const createBook = asyncHandler(async (req, res) => {

    const {
        title,
        author,
        genre,
        description,
        totalCopies,
        availableCopies,
        image
    } = req.body;

    if (!title || !author || !genre || !totalCopies || !availableCopies) {

        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const book = await Book.create({

        title,
        author,
        genre,
        description,
        totalCopies,
        availableCopies,
        image,

        createdBy: req.user.id

    });

    res.status(201).json(book);
});


//@desc Update book
//@route PUT /api/books/:id
//@access private admin

const updateBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    // ownership check
    if (book.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You can update only your books");
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedBook);
});


//@desc Delete book
//@route DELETE /api/books/:id
//@access private admin

const deleteBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    // ownership check
    if (book.createdBy.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You can delete only your books");
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Book deleted"
    });
});


//@desc Borrow book
//@route POST /api/books/borrow/:id
//@access private

const borrowBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (book.availableCopies <= 0) {
        return res.status(400).json({
            message: "No copies available"
        });
    }

    const alreadyBorrowed = book.borrowedBy.some(
        (id) => id.toString() === req.user.id
    );

    if (alreadyBorrowed) {
        return res.status(400).json({
            message: "Book already borrowed"
        });
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $inc: {
                availableCopies: -1
            },

            $push: {
                borrowedBy: req.user.id
            }
        },
        { new: true }
    );

    res.status(200).json({
        message: "Book borrowed successfully",
        updatedBook
    });

});


//@desc Return book
//@route POST /api/books/return/:id
//@access private

const returnBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const borrowed = book.borrowedBy.some(
        (id) => id.toString() === req.user.id
    );

    if (!borrowed) {
        return res.status(400).json({
            message: "You did not borrow this book"
        });
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $inc: {
                availableCopies: 1
            },

            $pull: {
                borrowedBy: req.user.id
            }
        },
        { new: true }
    );

    res.status(200).json({
        message: "Book returned successfully",
        updatedBook
    });

});


module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};