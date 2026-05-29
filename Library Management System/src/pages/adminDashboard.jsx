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

        </PageContainer>
    );
}

export default AdminDashboard;