import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [genre, setGenre] = useState("");

  const [totalCopies, setTotalCopies] = useState("");

  const [availableCopies, setAvailableCopies] = useState("");

  const [books, setBooks] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const handleAddBook = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5001/api/books",
        {
          title,
          author,
          genre,
          totalCopies,
          availableCopies
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Book Added");
      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to add book");
    }
  };

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5001/api/books"
        );

        setBooks(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchBooks();

  }, []);

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5001/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBooks(
        books.filter((book) =>
          book._id !== id
        )
      );

      alert("Book Deleted");

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };


  return (

    <div>

      <h1>Admin Dashboard</h1>

      <form onSubmit={handleAddBook}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) =>
            setAuthor(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) =>
            setGenre(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Available Copies"
          value={availableCopies}
          onChange={(e) =>
            setAvailableCopies(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Total Copies"
          value={totalCopies}
          onChange={(e) =>
            setTotalCopies(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Add Book
        </button>

      </form>

      <h2>All Books</h2>

      {books.map((book) => (

        <div
          key={book._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h3>{book.title}</h3>

          <p>{book.author}</p>

          {book.createdBy &&
            book.createdBy._id === currentUser?.id && (

              <button
                onClick={() =>
                  handleDelete(book._id)
                }
              >
                Delete
              </button>

            )}



        </div>

      ))}

    </div>
  );
};

export default AdminDashboard;