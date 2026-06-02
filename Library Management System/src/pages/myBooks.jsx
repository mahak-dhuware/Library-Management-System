import { useEffect, useState } from "react";
import axios from "axios";

import BookCard from "../components/BookCard";
import InputField from "../components/InputField";
import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";

import { returnBook } from "../api/bookApi";
import { colors } from "../styles/theme";

const MyBooks = () => {

  const [books, setBooks] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("current");

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const booksResponse =
            await axios.get(
              "http://localhost:5001/api/users/mybooks",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const historyResponse =
            await axios.get(
              "http://localhost:5001/api/users/history",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setBooks(
            booksResponse.data
          );

          setHistory(
            historyResponse.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchData();

  }, []);

  const filteredBooks =
    books.filter((borrow) =>

      borrow.book?.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      borrow.book?.author
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      borrow.book?.genre
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  const handleReturn =
    async (id) => {

      try {

        const response =
          await returnBook(id);

        alert(
          response.message
        );

        setBooks(
          books.filter(
            (borrow) =>
              borrow.book._id !== id
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
    title="My Books"
    subtitle="Manage your library activity."
/>

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-start",
          marginBottom:
            "28px"
        }}
      >

        <div
          style={{
            width: "100%",
            maxWidth:
              "760px"
          }}
        >

          <InputField
            placeholder="Search my borrowed books..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "30px"
            }}
          >

            <button
              onClick={() =>
                setActiveTab("current")
              }
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "current"
                    ? colors.primary
                    : colors.white,
                color:
                  activeTab === "current"
                    ? "white"
                    : colors.textDark
              }}
            >
              Current Books ({books.length})
            </button>

            <button
              onClick={() =>
                setActiveTab("history")
              }
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "history"
                    ? colors.primary
                    : colors.white,
                color:
                  activeTab === "history"
                    ? "white"
                    : colors.textDark
              }}
            >
              Borrow History ({history.length})
            </button>

          </div>

        </div>

      </div>
      {activeTab === "current" &&
 filteredBooks.length > 0 && (



        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill, minmax(320px, 320px))",

            gap: "28px",

            justifyContent:
              "start",

            marginBottom:
              "60px"
          }}
        >

          {filteredBooks.map(
            (borrow) => (

              <BookCard
                key={
                  borrow._id
                }

                book={{
                  ...borrow.book,

                  dueDate:
                    borrow.dueDate,

                  borrowDate:
                    borrow.borrowDate
                }}

                buttonText="Return Book"

                buttonColor={
                  colors.primary
                }

                showButton={
                  true
                }

                showCopies={
                  false
                }

                onClick={
                  handleReturn
                }
              />

            )
          )}

        </div>

      )}

      {activeTab === "current" &&
 filteredBooks.length === 0 && (

        <div
          style={{
            backgroundColor:
              colors.white,

            border:
              `1px solid ${colors.border}`,

            padding:
              "40px",

            borderRadius:
              "20px",

            textAlign:
              "center"
          }}
        >

          <h2>
            No Borrowed Books
          </h2>

          <p>
            Borrow books from the library to see them here.
          </p>

        </div>

      )}

      {activeTab === "history" && (
        <>
          

          {history.length === 0 ? (

            <div
              style={{
                backgroundColor:
                  colors.white,

                border:
                  `1px solid ${colors.border}`,

                padding:
                  "40px",

                borderRadius:
                  "20px",

                textAlign:
                  "center"
              }}
            >

              <h2>
                No History Found
              </h2>

              <p>
                Returned books will appear here.
              </p>

            </div>

          ) : (

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fill, minmax(320px, 320px))",

                gap: "24px",

                justifyContent:
                  "start"
              }}
            >

              {history.map((record) => (

                <div
                  key={record._id}
                  style={{
                    background: colors.white,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "16px",
                    padding: "20px"
                  }}
                >

                  <h3>{record.book?.title}</h3>

                  <p>
                    Author: {record.book?.author}
                  </p>

                  <p>
                    Borrowed:
                    {" "}
                    {new Date(
                      record.borrowDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    Returned:{" "}
                    {record.returnDate
                      ? new Date(
                        record.returnDate
                      ).toLocaleDateString()
                      : "Not Returned"}
                  </p>
                </div>
                

              ))}

            </div>
            


          )}
          </>
)}

        </PageContainer>
      );
};

      export default MyBooks;