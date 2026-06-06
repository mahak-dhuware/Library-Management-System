import { useEffect, useState } from "react";
import axios from "axios";

import BookCard from "../components/BookCard.jsx";
import InputField from "../components/InputField.jsx";
import PageHeader from "../components/PageHeader.jsx";
import PageContainer from "../components/PageContainer.jsx";

import { returnBook } from "../api/bookApi.js";
import { colors } from "../styles/theme.js";

const MyBooks = () => {

  const [books, setBooks] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
              "https://library-management-system-28ta.onrender.com/api/users/mybooks",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          const historyResponse =
            await axios.get(
              "https://library-management-system-28ta.onrender.com/api/users/history",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );
          console.log("Books:", booksResponse.data);
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

      {/* ================= HEADER WRAPPER ================= */}
      <div
        style={{
          position: "relative",
          marginBottom: "24px",
        }}
      >

        {/* PAGE HEADER (FULL WIDTH) */}
        <PageHeader
          title="My Borrowed Books"
          subtitle="Track and manage your library activity"
          icon="📖"
        />

        {/* MENU BUTTON (INSIDE HEADER AREA - TOP RIGHT) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              background: colors.white,
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            ⋮
          </button>

          {/* DROPDOWN */}
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "52px",
                background: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
                width: "180px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                overflow: "hidden",
                zIndex: 20,
              }}
            >
              <div
                onClick={() => {
                  setActiveTab("current");
                  setMenuOpen(false);
                }}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  background:
                    activeTab === "current"
                      ? colors.background
                      : "transparent",
                }}
              >
                📚 Current Books
              </div>

              <div
                onClick={() => {
                  setActiveTab("history");
                  setMenuOpen(false);
                }}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  background:
                    activeTab === "history"
                      ? colors.background
                      : "transparent",
                }}
              >
                🕘 History
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div>
        {activeTab === "current" && (
          books.filter((borrow) => borrow?.book).length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: colors.white,
                borderRadius: "16px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📚</div>
              <h3 style={{ marginBottom: "8px" }}>No Borrowed Books</h3>
              <p style={{ color: colors.textLight }}>
                You haven't borrowed any books yet.
              </p>
            </div>) :
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {books
                .filter((borrow) => borrow?.book)
                .map((borrow) => (
                  <BookCard
                    key={borrow._id}
                    book={borrow.book}
                    buttonText="Return Book"
                    buttonColor={colors.primary}
                    showButton={true}
                    onClick={() => handleReturn(borrow.book._id)}
                  />
                ))}
            </div>
        )}

        {activeTab === "history" && (
          history.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: colors.white,
                borderRadius: "16px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🕘</div>
              <h3 style={{ marginBottom: "8px" }}>No Borrowing History</h3>
              <p style={{ color: colors.textLight }}>
                Your borrowing history will appear here.
              </p>
            </div>
          ) :
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {history.map((record) => (
                <div
                  key={record._id}
                  style={{
                    background: colors.white,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "16px",
                    padding: "18px",
                  }}
                >
                  <div style={{ fontSize: "24px" }}>📚</div>

                  <h3 style={{ margin: "8px 0", color: colors.textDark }}>
                    {record.book?.title}
                  </h3>

                  <p style={{ color: colors.textLight }}>
                    {record.book?.author}
                  </p>

                  <div
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      color: colors.textLight,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span>
                      Borrowed:{" "}
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </span>

                    <span>
                      Returned:{" "}
                      {record.returnDate
                        ? new Date(record.returnDate).toLocaleDateString()
                        : "Not Returned"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>

    </PageContainer>
  );
};

export default MyBooks;