import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import BookCard from "../components/BookCard";

import PageHeader from "../components/PageHeader";

import PageContainer from "../components/PageContainer";

import {
    getBooks,
    borrowBook
} from "../api/bookApi";

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

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <PageHeader
                    title="Library Collection"
                    subtitle="Browse and borrow books from the digital library."
                />

                <div style={{ width: "100%", maxWidth: "760px" }}>
                    <input
                        type="text"
                        placeholder="Search by title, author or genre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "14px 18px",
                            borderRadius: "14px",
                            border: "1px solid #E2E8F0",
                            outline: "none",
                            fontSize: "15px",
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 2px 10px rgba(2,6,23,0.06)"
                        }}
                    />
                </div>
            </div>

            {/* BOOKS */}

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

                {filteredBooks.map(
                    (book) => (

                        <BookCard
                            key={
                                book._id
                            }

                            book={book}

                            buttonText={
                                book.availableCopies > 0
                                    ? "Borrow Book"
                                    : "Unavailable"
                            }

                            buttonColor={
                                book.availableCopies > 0
                                    ? "#0F766E"
                                    : "#94A3B8"
                            }

                            showButton={
                                true
                            }

                            onClick={
                                handleBorrow
                            }
                        />

                    )
                )}

            </div>

        </PageContainer>
    );
};

export default Books;