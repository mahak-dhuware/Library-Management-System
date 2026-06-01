import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import BookCard from "../components/BookCard";
import { colors } from "../styles/theme";

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

            <div style={{ width: "100%", marginBottom: "35px", marginTop: "0px" }}>
                <div style={{ backgroundColor: colors.background, padding: "", borderRadius: 0 }}>
                    <div style={{ width: "100%", maxHeight: "54px" }}>
                        <PageHeader
                            title="Library Collection"
                            subtitle="Browse and borrow books from the digital library."
                        />
                    </div>

                    
                </div>
            </div>

            {/* BOOKS */}

            <div style={{ width: "100%" }}>
                <div style={{ padding: 28, borderRadius: 0, backgroundColor: colors.background }}>
                    <div style={{ width: "100%", marginBottom: "12px", display: "flex", justifyContent: "flex-start" }}>
                        <input
                            type="text"
                            placeholder="Search by title, author or genre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                maxWidth: "520px",
                                padding: "14px 18px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.secondary}`,
                                outline: "none",
                                fontSize: "15px",
                                backgroundColor: colors.white
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(280px, 1fr))",

                            gap: "12px",

                            gridAutoFlow: "dense",

                            alignItems: "stretch"
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
                                    ? colors.primary
                                    : colors.secondary
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
                </div>
            </div>

        </PageContainer>
    );
};

export default Books;