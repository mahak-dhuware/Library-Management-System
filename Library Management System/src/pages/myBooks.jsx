import { useEffect, useState } from "react";

import BookCard from "../components/BookCard";

import InputField from "../components/InputField";

import PageHeader from "../components/PageHeader";

import PageContainer from "../components/PageContainer";

import {
  returnBook
} from "../api/bookApi";

import axios from "axios";

import { colors } from "../styles/theme";

const MyBooks = () => {

  const [books, setBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const fetchMyBooks =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axios.get(
              "http://localhost:5001/api/users/mybooks",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setBooks(
            response.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchMyBooks();

  }, []);

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

  const handleReturn =
    async (id) => {

      try {

        const response =
          await returnBook(
            id
          );

        alert(
          response.message
        );

        setBooks(
          books.filter(
            (book) =>
              book._id !== id
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Return failed"
        );
      }
    };

  return (

    <PageContainer>

      <PageHeader
        title="My Borrowed Books"

        subtitle="Manage books currently borrowed from the library."
      />

      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "28px" }}>
        <div style={{ width: "100%", maxWidth: "760px", alignSelf: "flex-start" }}>
          <InputField
            placeholder="Search my borrowed books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {books.length === 0 ? (

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
                "52px",

              marginBottom:
                "16px"
            }}
          >
            📚
          </div>

          <h2
            style={{
              marginBottom:
                "10px",

              color:
                colors.textDark
            }}
          >
            No Borrowed Books
          </h2>

          <p>
            Borrow books from
            the library to
            see them here.
          </p>

        </div>

      ) : filteredBooks.length === 0 ? (
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
            No matching borrowed books
          </h2>
          <p>
            Try a different title,
            author, or genre.
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

          {filteredBooks.map(
            (book) => (

              <BookCard
                key={
                  book._id
                }

                book={book}

                buttonText="Return Book"

                buttonColor={
                  colors.primary
                }

                showButton={true}

                showCopies={false}

                onClick={
                  handleReturn
                }
              />

            )
          )}

        </div>

      )}

    </PageContainer>
  );
};

export default MyBooks;