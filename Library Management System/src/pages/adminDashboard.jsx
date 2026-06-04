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

    const [activeSection, setActiveSection] =
        useState("addBook");

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
            <>
                <PageHeader
                    title="Admin Dashboard"
                    subtitle="Manage books and monitor library inventory."
                />

                {/* Stats */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                        marginBottom: "35px",
                    }}
                >
                    <div
                        style={{
                            minHeight: "130px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#fff",
                            padding: "24px",
                            borderRadius: "20px",
                            border: "1px solid #E2E8F0",
                            textAlign: "center",
                        }}
                    >
                        <h3>Total Books</h3>
                        <h1>{totalBooks}</h1>
                    </div>

                    <div
                        style={{
                            minHeight: "130px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#fff",
                            padding: "24px",
                            borderRadius: "20px",
                            border: "1px solid #E2E8F0",
                            textAlign: "center",
                        }}
                    >
                        <h3>Active Borrows</h3>
                        <h1>{activeBorrows}</h1>
                    </div>


                    <div
                        style={{
                            minHeight: "130px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#fff",
                            padding: "24px",
                            borderRadius: "20px",
                            border: "1px solid #E2E8F0",
                            textAlign: "center",
                        }}
                    >
                        <h3>Overdue Books</h3>
                        <h1>{overdueCount}</h1>
                    </div>
                </div>

                {/* Add Book + Insights */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "280px 1fr",
                        gap: "24px",
                        alignItems: "stretch",
                    }}
                >

                    <div
                        style={{
                            background: "#fff",
                            border: "1px solid #E2E8F0",
                            borderRadius: "24px",
                            padding: "24px",
                            position: "sticky",
                            top: "20px",
                            alignSelf: "stretch",
                        }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                                marginBottom: "24px",
                                color: colors.textDark,
                            }}
                        >
                            Quick Access
                        </h2>

                        <button
                            onClick={() =>
                                setActiveSection("addBook")
                            }
                            style={{
                                padding: "18px",
                                borderRadius: "10px",
                                border: activeSection === "addBook"
                                    ? `2px solid ${colors.primary}`
                                    : "1px solid #E2E8F0",
                                background:
                                    activeSection === "addBook"
                                        ? "#F0FDFA"
                                        : "#F8FAFC",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontSize: "15px",
                                fontWeight: "600",
                                width: "100%",
                            }}
                        >
                            <span style={{ fontSize: "22px" }}>
                                ➕
                            </span>
                            Add New Book
                        </button>
                        <br />

                        <button
                            onClick={() =>
                                setActiveSection("books")
                            }
                            style={{
                                padding: "18px",
                                borderRadius: "10px",
                                border: activeSection === "books"
                                    ? `2px solid ${colors.primary}`
                                    : "1px solid #E2E8F0",
                                background:
                                    activeSection === "books"
                                        ? "#F0FDFA"
                                        : "#F8FAFC",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontSize: "15px",
                                fontWeight: "600",
                                transition: "0.2s",
                                width: "100%",
                            }}
                        >
                            <span style={{ fontSize: "22px" }}>
                                📚
                            </span>
                            Library Books
                        </button>
                        <br />

                        <button
                            onClick={() =>
                                setActiveSection("records")
                            }
                            style={{
                                padding: "18px",
                                borderRadius: "10px",
                                border: activeSection === "records"
                                    ? `2px solid ${colors.primary}`
                                    : "1px solid #E2E8F0",
                                background:
                                    activeSection === "records"
                                        ? "#F0FDFA"
                                        : "#F8FAFC",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontSize: "15px",
                                fontWeight: "600",
                                transition: "0.2s",
                                width: "100%",
                            }}
                        >
                            <span style={{ fontSize: "22px" }}>
                                📖
                            </span>
                            Borrow Records
                        </button>
                        <br />

                        <button
                            onClick={() =>
                                setActiveSection("overdue")
                            }
                            style={{
                                padding: "18px",
                                borderRadius: "10px",
                                border: activeSection === "overdue"
                                    ? `2px solid ${colors.primary}`
                                    : "1px solid #E2E8F0",
                                background:
                                    activeSection === "overdue"
                                        ? "#F0FDFA"
                                        : "#F8FAFC",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                fontSize: "15px",
                                fontWeight: "600",
                                transition: "0.2s",
                                width: "100%",
                            }}
                        >
                            <span style={{ fontSize: "22px" }}>
                                ⚠️
                            </span>
                            Overdue Books
                        </button>
                        <br />

                       
                    </div>



                    <div
                        style={{
                            background: "#fff",
                            border: "1px solid #E2E8F0",
                            borderRadius: "24px",
                            padding: "28px",
                            minHeight: "600px",
                        }}
                    >
                        {activeSection && (
                            <div

                            >

                                {activeSection === "addBook" && (
                                    <>
                                        {/* Header */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "32px",
                                                flexWrap: "wrap",
                                                gap: "12px",
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "28px",
                                                        fontWeight: "700",
                                                        color: colors.textDark,
                                                    }}
                                                >
                                                    ➕ Add New Book
                                                </h2>

                                                <p
                                                    style={{
                                                        margin: "6px 0 0",
                                                        color: "#64748B",
                                                    }}
                                                >
                                                    Add a new book to your library collection.
                                                </p>
                                            </div>

                                            <div
                                                style={{
                                                    background: "#F0FDFA",
                                                    color: colors.primary,
                                                    padding: "10px 16px",
                                                    borderRadius: "999px",
                                                    fontWeight: "600",
                                                    border: `1px solid ${colors.secondary}`,
                                                }}
                                            >
                                                Library Management
                                            </div>
                                        </div>

                                        {/* Form Card */}
                                        <div
                                            style={{
                                                background: "#F8FAFC",
                                                border: "1px solid #E2E8F0",
                                                borderRadius: "20px",
                                                padding: "28px",
                                            }}
                                        >
                                            <form
                                                onSubmit={handleAddBook}
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "repeat(auto-fit, minmax(260px, 1fr))",
                                                    gap: "20px",
                                                }}
                                            >
                                                <div>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Book Title
                                                    </label>

                                                    <InputField
                                                        placeholder="Enter book title"
                                                        value={title}
                                                        onChange={(e) =>
                                                            setTitle(e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Author
                                                    </label>

                                                    <InputField
                                                        placeholder="Author name"
                                                        value={author}
                                                        onChange={(e) =>
                                                            setAuthor(e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Genre
                                                    </label>

                                                    <InputField
                                                        placeholder="e.g. Fiction"
                                                        value={genre}
                                                        onChange={(e) =>
                                                            setGenre(e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Total Copies
                                                    </label>

                                                    <InputField
                                                        type="number"
                                                        placeholder="Total copies"
                                                        value={totalCopies}
                                                        onChange={(e) =>
                                                            setTotalCopies(e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            marginBottom: "8px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Available Copies
                                                    </label>

                                                    <InputField
                                                        type="number"
                                                        placeholder="Available copies"
                                                        value={availableCopies}
                                                        onChange={(e) =>
                                                            setAvailableCopies(e.target.value)
                                                        }
                                                    />
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "flex-end",
                                                    }}
                                                >
                                                    <PrimaryButton
                                                        text="📚 Add Book"
                                                        type="submit"
                                                    />
                                                </div>
                                            </form>

                                            <div
                                                style={{
                                                    marginTop: "24px",
                                                    padding: "16px",
                                                    background: "#FFFFFF",
                                                    borderRadius: "12px",
                                                    border: "1px solid #E2E8F0",
                                                    color: "#64748B",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                💡 Ensure the available copies do not exceed the total copies.
                                            </div>
                                        </div>
                                    </>
                                )}
                                {activeSection === "books" && (
                                    <>
                                        {/* Header */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "20px",
                                                marginBottom: "28px",
                                                paddingBottom: "18px",
                                                borderBottom: "1px solid #E2E8F0",
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        color: colors.textDark,
                                                    }}
                                                >
                                                    📚 Library Books
                                                </h2>

                                                <p
                                                    style={{
                                                        margin: "6px 0 0",
                                                        color: "#64748B",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Browse and manage all books available in the library.
                                                </p>
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "16px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        background: "#F1F5F9",
                                                        padding: "8px 14px",
                                                        borderRadius: "999px",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        color: colors.textDark,
                                                    }}
                                                >
                                                    {filteredBooks.length} Books
                                                </div>

                                                <div style={{ width: "320px" }}>
                                                    <InputField
                                                        placeholder="🔍 Search books..."
                                                        value={search}
                                                        onChange={(e) =>
                                                            setSearch(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Empty State */}
                                        {filteredBooks.length === 0 ? (
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    padding: "80px 20px",
                                                    color: "#64748B",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "48px",
                                                        marginBottom: "12px",
                                                    }}
                                                >
                                                    📚
                                                </div>

                                                <h3
                                                    style={{
                                                        margin: "0 0 8px",
                                                    }}
                                                >
                                                    No Books Found
                                                </h3>

                                                <p
                                                    style={{
                                                        margin: 0,
                                                    }}
                                                >
                                                    Try changing your search term.
                                                </p>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "repeat(auto-fill,minmax(320px,1fr))",
                                                    gap: "28px",
                                                }}
                                            >
                                                {filteredBooks.map((book) => (
                                                    <BookCard
                                                        key={book._id}
                                                        book={book}
                                                        buttonText="Delete Book"
                                                        buttonColor={colors.danger}
                                                        showButton={
                                                            book.createdBy &&
                                                            book.createdBy._id ===
                                                            currentUser?.id
                                                        }
                                                        onClick={handleDelete}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeSection === "records" && (
                                    <>
                                        {/* Header */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "20px",
                                                marginBottom: "28px",
                                                paddingBottom: "18px",
                                                borderBottom: "1px solid #E2E8F0",
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        color: colors.textDark,
                                                    }}
                                                >
                                                    📖 Borrow Records
                                                </h2>

                                                <p
                                                    style={{
                                                        margin: "6px 0 0",
                                                        color: "#64748B",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Track all book borrowing activities.
                                                </p>
                                            </div>

                                            <div
                                                style={{
                                                    background: "#F1F5F9",
                                                    padding: "8px 14px",
                                                    borderRadius: "999px",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {records.length} Records
                                            </div>
                                        </div>

                                        {/* Empty State */}
                                        {records.length === 0 ? (
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    padding: "80px 20px",
                                                    color: "#64748B",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "48px",
                                                        marginBottom: "12px",
                                                    }}
                                                >
                                                    📖
                                                </div>

                                                <h3>No Borrow Records</h3>

                                                <p>
                                                    Borrow activity will appear here.
                                                </p>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "repeat(auto-fill, minmax(340px, 1fr))",
                                                    gap: "20px",
                                                }}
                                            >
                                                {records.map((record) => (
                                                    <div
                                                        key={record._id}
                                                        style={{
                                                            background: "#fff",
                                                            border: "1px solid #E2E8F0",
                                                            borderRadius: "18px",
                                                            padding: "22px",
                                                            boxShadow:
                                                                "0 4px 12px rgba(0,0,0,0.04)",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                marginBottom: "16px",
                                                            }}
                                                        >
                                                            <h3
                                                                style={{
                                                                    margin: 0,
                                                                    fontSize: "17px",
                                                                }}
                                                            >
                                                                📚 {record.book?.title}
                                                            </h3>

                                                            <span
                                                                style={{
                                                                    padding: "6px 12px",
                                                                    borderRadius: "999px",
                                                                    fontSize: "13px",
                                                                    fontWeight: "600",
                                                                    background:
                                                                        record.returned
                                                                            ? "#DCFCE7"
                                                                            : "#FEF3C7",
                                                                    color:
                                                                        record.returned
                                                                            ? "#166534"
                                                                            : "#92400E",
                                                                }}
                                                            >
                                                                {record.returned
                                                                    ? "Returned"
                                                                    : "Active"}
                                                            </span>
                                                        </div>

                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "10px",
                                                                color: "#475569",
                                                            }}
                                                        >
                                                            <div>
                                                                <strong>👤 User:</strong>{" "}
                                                                {record.user?.name}
                                                            </div>

                                                            <div>
                                                                <strong>📅 Borrowed:</strong>{" "}
                                                                {new Date(
                                                                    record.borrowDate
                                                                ).toLocaleDateString()}
                                                            </div>

                                                            <div>
                                                                <strong>⏳ Due Date:</strong>{" "}
                                                                {new Date(
                                                                    record.dueDate
                                                                ).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeSection === "overdue" && (
                                    <>
                                        {/* Header */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "28px",
                                                flexWrap: "wrap",
                                                gap: "12px",
                                            }}
                                        >
                                            <div>
                                                <h2
                                                    style={{
                                                        margin: 0,
                                                        fontSize: "28px",
                                                        fontWeight: "700",
                                                        color: "#DC2626",
                                                    }}
                                                >
                                                    🚨 Overdue Books
                                                </h2>

                                                <p
                                                    style={{
                                                        margin: "6px 0 0",
                                                        color: "#64748B",
                                                    }}
                                                >
                                                    Books that have crossed their due date.
                                                </p>
                                            </div>

                                            <div
                                                style={{
                                                    background: "#FEF2F2",
                                                    color: "#DC2626",
                                                    padding: "10px 16px",
                                                    borderRadius: "999px",
                                                    fontWeight: "600",
                                                    border: "1px solid #FECACA",
                                                }}
                                            >
                                                {overdueBooks.length} Overdue
                                            </div>
                                        </div>

                                        {/* Empty State */}
                                        {overdueBooks.length === 0 ? (
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    padding: "60px 20px",
                                                    background: "#F8FAFC",
                                                    borderRadius: "20px",
                                                    border: "1px dashed #CBD5E1",
                                                }}
                                            >
                                                <div style={{ fontSize: "48px" }}>
                                                    ✅
                                                </div>

                                                <h3>No Overdue Books</h3>

                                                <p
                                                    style={{
                                                        color: "#64748B",
                                                    }}
                                                >
                                                    Great! All borrowed books are within the due date.
                                                </p>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gap: "18px",
                                                }}
                                            >
                                                {overdueBooks.map((record) => (
                                                    <div
                                                        key={record._id}
                                                        style={{
                                                            background: "#FFFFFF",
                                                            border: "1px solid #FECACA",
                                                            borderLeft: "6px solid #DC2626",
                                                            borderRadius: "18px",
                                                            padding: "22px",
                                                            boxShadow:
                                                                "0 4px 12px rgba(220,38,38,0.08)",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                flexWrap: "wrap",
                                                                gap: "12px",
                                                            }}
                                                        >
                                                            <div>
                                                                <h3
                                                                    style={{
                                                                        margin: "0 0 8px",
                                                                        color: "#0F172A",
                                                                    }}
                                                                >
                                                                    {record.book?.title}
                                                                </h3>

                                                                <p
                                                                    style={{
                                                                        margin: 0,
                                                                        color: "#64748B",
                                                                    }}
                                                                >
                                                                    Borrowed by{" "}
                                                                    <strong>
                                                                        {record.user?.name}
                                                                    </strong>
                                                                </p>
                                                            </div>

                                                            <span
                                                                style={{
                                                                    background: "#FEF2F2",
                                                                    color: "#DC2626",
                                                                    padding: "8px 14px",
                                                                    borderRadius: "999px",
                                                                    fontSize: "13px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                Overdue
                                                            </span>
                                                        </div>

                                                        <div
                                                            style={{
                                                                marginTop: "18px",
                                                                display: "flex",
                                                                gap: "30px",
                                                                flexWrap: "wrap",
                                                            }}
                                                        >
                                                            <div>
                                                                <div
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "#94A3B8",
                                                                    }}
                                                                >
                                                                    DUE DATE
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        fontWeight: "600",
                                                                        color: "#DC2626",
                                                                    }}
                                                                >
                                                                    {new Date(
                                                                        record.dueDate
                                                                    ).toLocaleDateString()}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "#94A3B8",
                                                                    }}
                                                                >
                                                                    BORROWER
                                                                </div>

                                                                <div
                                                                    style={{
                                                                        fontWeight: "600",
                                                                    }}
                                                                >
                                                                    {record.user?.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                            </div>


                        )
                        }</div></div>
            </>
        </PageContainer >

    );
}

export default AdminDashboard;