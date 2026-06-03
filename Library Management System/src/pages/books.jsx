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

            <div style={{ width: "100%"}}>

                <div
                    style={{
                        backgroundColor: colors.background,
                        padding: "28px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    {/* Left: Header */}
                    <div style={{ flex: 1 }}>
                        <PageHeader title="Library Collection" subtitle="Browse and borrow books from the digital library." />
                    </div>

                    {/* Right: Search */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        <input
                            type="text"
                            placeholder="Search by title, author or genre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "80%",
                                maxWidth: "420px",
                                padding: "12px 16px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.secondary}`,
                                outline: "none",
                                fontSize: "14px",
                                backgroundColor: colors.white,
                                
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* BOOKS */}

            <div style={{ width: "100%" }}>
                <div style={{ padding: 28, borderRadius: 0, backgroundColor: colors.background }}>

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