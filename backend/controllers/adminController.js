const asyncHandler =
    require("express-async-handler");

const Book = require("../models/bookModel");
const Borrow = require("../models/borrowModel");

const getDashboardStats =
asyncHandler(async (req, res) => {

    const totalBooks =
        await Book.countDocuments();

    const borrowedBooks =
        await Borrow.countDocuments({
            returned: false
        });

    const returnedBooks =
        await Borrow.countDocuments({
            returned: true
        });

    const overdueBooks =
        await Borrow.countDocuments({
            returned: false,
            dueDate: {
                $lt: new Date()
            }
        });

    res.json({
        totalBooks,
        borrowedBooks,
        returnedBooks,
        overdueBooks
    });
});

const getBorrowRecords =
    asyncHandler(async (req, res) => {

        if (req.user.role !== "admin") {

            res.status(403);

            throw new Error(
                "Admin access only"
            );
        }

        const records =
            await Borrow.find()
                .populate("user", "name email")
                .populate("book", "title author genre");

        const result =
            records.map((record) => ({

                ...record.toObject(),

                overdue:
                    !record.returned &&
                    record.dueDate < new Date()

            }));

        res.json(result);
    });

const getOverdueBooks =
    asyncHandler(async (req, res) => {

        if (req.user.role !== "admin") {

            res.status(403);

            throw new Error(
                "Admin access only"
            );
        }

        const overdueBooks =
            await Borrow.find({

                returned: false,

                dueDate: {
                    $lt: new Date()
                }

            })
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "book",
                    "title author genre"
                );

        res.status(200).json(
            overdueBooks
        );
    });

module.exports = {
    getBorrowRecords,
    getOverdueBooks,
    getDashboardStats
};