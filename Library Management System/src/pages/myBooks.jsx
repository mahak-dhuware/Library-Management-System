import { useEffect, useState } from "react";
import axios from "axios";

const MyBooks = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    const fetchMyBooks = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5001/api/users/mybooks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBooks(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchMyBooks();

  }, []);

  const handleReturn = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5001/api/books/return/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      setBooks(
        books.filter((book) =>
          book._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Return failed");
    }
  };

  return (

    <div>

      <h1>My Borrowed Books</h1>

      {books.map((book) => (

        <div key={book._id}>

          <h2>{book.title}</h2>

          <p>{book.author}</p>

          <p>{book.genre}</p>

          <button
            onClick={() => handleReturn(book._id)}
          >
            Return
          </button>

        </div>



      ))}

    </div>
  );
};

export default MyBooks;