import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import BookCard from "../components/BookCard.jsx";
import { colors } from "../styles/theme.js";

import PageHeader from "../components/PageHeader.jsx";

import PageContainer from "../components/PageContainer.jsx";

import {
    getBooks,
    borrowBook
} from "../api/bookApi.js";

const Books = () => {

    const [books, setBooks] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        const fetchBooks =
            async () => {

                try {

                    const data =
                        await getBooks();

                    setBooks(data);

                } catch (error) {

                    console.log(error);
                }
            };

        fetchBooks();

    }, []);

    const handleBorrow =
        async (id) => {

            try {

                const response =
                    await borrowBook(id);

                alert(
                    response.message
                );

                setBooks(
                    books.map(
                        (book) =>

                            book._id === id
                                ? {
                                    ...book,

                                    availableCopies:
                                        book.availableCopies -
                                        1
                                }
                                : book
                    )
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Borrow failed"
                );
            }
        };

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

    if (!token) {

        return (
            <Navigate to="/login" />
        );
    }

    return (

        <PageContainer>

            <div
                style={{
                    background: "#F5EFE6", // light brown/beige
                    borderRadius: "24px",
                    padding: "32px",
                    marginBottom: "32px",
                    border: "1px solid #D6C2A8",
                    boxShadow: "0 4px 12px rgba(120, 85, 60, 0.08)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "24px",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Left Section */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "8px",
                            }}
                        >
                            <span style={{ fontSize: "34px" }}>
                                📚
                            </span>

                            <h1
                                style={{
                                    margin: 0,
                                    fontSize: "34px",
                                    fontWeight: "700",
                                    color: "#6B4F3B",
                                }}
                            >
                                Library Collection
                            </h1>
                        </div>

                        <p
                            style={{
                                margin: 0,
                                color: "#8B7355",
                                fontSize: "15px",
                            }}
                        >
                            Browse, search and borrow books from the digital library.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            position: "relative",
                            flexShrink: 0,
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                left: "16px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "18px",
                                color: "#8B7355",
                            }}
                        >
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search books, authors or genres..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "14px 18px 14px 48px",
                                borderRadius: "14px",
                                border: "1px solid #D6C2A8",
                                background: "#FFF8F0",
                                color: "#5B4636",
                                fontSize: "15px",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* BOOKS */}

           <div
    style={{
        width: "100%",
        background: "#F5EFE7", // same warm light brown header theme
        minHeight: "100vh",
        padding: "24px 0 40px",
    }}
>
    <div
        style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
        }}
    >
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
                alignItems: "stretch",
            }}
        >
            {filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    buttonText={
                        book.availableCopies > 0
                            ? "Borrow Book"
                            : "Unavailable"
                    }
                    buttonColor={
                        book.availableCopies > 0
                            ? colors.primary
                            : colors.secondary
                    }
                    showButton={true}
                    onClick={handleBorrow}
                />
            ))}
        </div>
    </div>
</div>
        </PageContainer>

    );
};

export default Books;