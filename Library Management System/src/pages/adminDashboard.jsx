import { useState, useEffect } from "react";

import BookCard from "../components/BookCard";

import PageHeader from "../components/PageHeader";

import PageContainer from "../components/PageContainer";

import InputField from "../components/InputField";

import PrimaryButton from "../components/PrimaryButton";

import {
    getBooks,
    addBook,
    deleteBook
} from "../api/bookApi";

import { colors } from "../styles/theme";


import {
    getBorrowRecords,
    getOverdueBooks,
    getDashboardStats
} from "../api/adminApi.js";

const AdminDashboard = () => {


    const [title, setTitle] =
        useState("");

    const [author, setAuthor] =
        useState("");

    const [genre, setGenre] =
        useState("");

    const [totalCopies,
        setTotalCopies] =
        useState("");

    const [availableCopies,
        setAvailableCopies] =
        useState("");

    const [books, setBooks] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [records, setRecords] =
        useState([]);

    const [overdueBooks,
        setOverdueBooks] =
        useState([]);
    const totalBooks = books.length;

    const activeBorrows =
        records.filter(
            (record) =>
                !record.returned
        ).length;

    const overdueCount =
        overdueBooks.length;

    const [stats, setStats] =
    useState({
        totalBooks: 0,
        borrowedBooks: 0,
        returnedBooks: 0,
        overdueBooks: 0
    });


    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const filteredBooks =
        books.filter((book) =>
            book.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||
            book.author
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||
            book.genre
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    useEffect(() => {

        const fetchData =
            async () => {

                try {

                    const booksData =
                        await getBooks();

                    setBooks(
                        booksData
                    );

                    const recordsData =
                        await getBorrowRecords();

                    setRecords(
                        recordsData
                    );

                    const overdueData =
                        await getOverdueBooks();

                    setOverdueBooks(
                        overdueData
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchData();

    }, []);
    const handleAddBook =
        async (e) => {

            e.preventDefault();

            try {

                const data =
                    await addBook({
                        title,
                        author,
                        genre,
                        totalCopies,
                        availableCopies
                    });

                setBooks([
                    ...books,
                    data
                ]);

                setTitle("");
                setAuthor("");
                setGenre("");
                setTotalCopies("");
                setAvailableCopies("");

                alert(
                    "Book Added"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to add book"
                );
            }
        };



    const handleDelete =
        async (id) => {

            try {

                await deleteBook(id);

                setBooks(
                    books.filter(
                        (book) =>
                            book._id !== id
                    )
                );

                alert(
                    "Book Deleted"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Delete failed"
                );
            }
        };

    return (

        <PageContainer>

            <PageHeader
                title="Admin Dashboard"

                subtitle="Manage books and monitor library inventory."
            />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(3, 1fr)",
                    gap: "20px",
                    marginBottom: "40px"
                }}
            >

                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "20px",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <h3>Total Books</h3>
                    <h1>{totalBooks}</h1>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "20px",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <h3>Active Borrows</h3>
                    <h1>{activeBorrows}</h1>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "20px",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <h3>Overdue Books</h3>
                    <h1>{overdueCount}</h1>
                </div>

            </div>
            <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "35px"
    }}
>

    <div className="stat-card">
        <h3>Total Books</h3>
        <h1>{stats.totalBooks}</h1>
    </div>

    <div className="stat-card">
        <h3>Borrowed Books</h3>
        <h1>{stats.borrowedBooks}</h1>
    </div>

    <div className="stat-card">
        <h3>Returned Books</h3>
        <h1>{stats.returnedBooks}</h1>
    </div>

    <div className="stat-card">
        <h3>Overdue Books</h3>
        <h1>{stats.overdueBooks}</h1>
    </div>

</div>

            {/* FORM */}

            <div
                style={{
                    backgroundColor:
                        colors.white,

                    border:
                        `1px solid ${colors.secondary}`,

                    borderRadius:
                        "24px",

                    padding: "32px",

                    marginBottom:
                        "40px",

                    boxShadow:
                        "0 8px 24px rgba(15,118,110,0.05)"
                }}
            >

                <h2
                    style={{
                        marginBottom:
                            "24px",

                        color:
                            colors.textDark
                    }}
                >
                    Add New Book
                </h2>

                <form
                    onSubmit={
                        handleAddBook
                    }
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",

                        gap: "18px"
                    }}
                >

                    <InputField
                        placeholder="Book Title"

                        value={title}

                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <InputField
                        placeholder="Author"

                        value={author}

                        onChange={(e) =>
                            setAuthor(
                                e.target.value
                            )
                        }
                    />

                    <InputField
                        placeholder="Genre"

                        value={genre}

                        onChange={(e) =>
                            setGenre(
                                e.target.value
                            )
                        }
                    />

                    <InputField
                        type="number"

                        placeholder="Total Copies"

                        value={
                            totalCopies
                        }

                        onChange={(e) =>
                            setTotalCopies(
                                e.target.value
                            )
                        }
                    />

                    <InputField
                        type="number"

                        placeholder="Available Copies"

                        value={
                            availableCopies
                        }

                        onChange={(e) =>
                            setAvailableCopies(
                                e.target.value
                            )
                        }
                    />

                    <PrimaryButton
                        text="Add Book"

                        type="submit"
                    />

                </form>

            </div>

            {/* BOOKS */}

            <div>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                        <h2
                            style={{
                                margin: 0,
                                color:
                                    colors.textDark
                            }}
                        >
                            Library Books
                        </h2>
                        <div style={{ width: "100%", maxWidth: "360px" }}>
                            <InputField
                                placeholder="Search library books..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {filteredBooks.length === 0 ? (
                    <div
                        style={{
                            backgroundColor:
                                colors.white,
                            border:
                                `1px solid ${colors.secondary}`,
                            borderRadius:
                                "20px",
                            padding:
                                "40px",
                            textAlign:
                                "center",
                            color:
                                colors.textLight
                        }}
                    >
                        <div
                            style={{
                                fontSize:
                                    "32px",
                                marginBottom:
                                    "16px"
                            }}>
                            🔎
                        </div>
                        <h2
                            style={{
                                marginBottom:
                                    "10px",
                                color:
                                    colors.textDark
                            }}>
                            No library books found
                        </h2>
                        <p>
                            Update your search
                            term to see more
                            results.
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(320px, 320px))",
                            gap: "28px",
                            justifyContent:
                                "start"
                        }}
                    >
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                buttonText="Delete Book"

                                buttonColor={
                                    colors.danger
                                }

                                showButton={
                                    book.createdBy &&
                                    book
                                        .createdBy
                                        ._id ===
                                    currentUser?.id
                                }

                                onClick={
                                    handleDelete
                                }
                            />
                        ))}
                    </div>
                )}

            </div>

            <h2
                style={{
                    marginTop: "50px"
                }}
            >
                Borrow Records
            </h2>

            {records.map((record) => (

                <div
                    key={record._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        marginBottom: "12px"
                    }}
                >

                    <p>
                        User:
                        {record.user?.name}
                    </p>

                    <p>
                        Book:
                        {record.book?.title}
                    </p>

                    <p>
                        Borrowed:
                        {new Date(
                            record.borrowDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        Due:
                        {new Date(
                            record.dueDate
                        ).toLocaleDateString()}
                    </p>

                    <p>
                        Status:
                        {record.returned
                            ? "Returned"
                            : "Active"}
                    </p>

                </div>

            ))}

            <h2
                style={{
                    marginTop: "50px"
                }}
            >
                Overdue Books
            </h2>
            {overdueBooks.length === 0 ? (

                <p>
                    No overdue books
                </p>

            ) : (

                overdueBooks.map(
                    (record) => (

                        <div
                            key={record._id}
                            style={{
                                border:
                                    "1px solid red",

                                padding:
                                    "12px",

                                marginBottom:
                                    "12px"
                            }}
                        >

                            <p>
                                User:
                                {record.user?.name}
                            </p>

                            <p>
                                Book:
                                {record.book?.title}
                            </p>

                            <p>
                                Due Date:
                                {new Date(
                                    record.dueDate
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    )
                )

            )}
        </PageContainer>

    );
}

export default AdminDashboard;