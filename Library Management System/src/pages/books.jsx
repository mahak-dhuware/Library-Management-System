import { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {

    const [books, setBooks] = useState([]);

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


    const handleBorrow = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.post(
            `http://localhost:5001/api/books/borrow/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

    } catch (error) {

        console.log(error);

        alert("Borrow failed");
    }
};
    return (

    <div>

        <h1>Library Books</h1>

        {books.map((book) => (

            <div
                key={book._id}
                style={{
                    border: "1px solid gray",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "10px"
                }}
            >

                <h2>{book.title}</h2>

                <p>Author: {book.author}</p>

                <p>Genre: {book.genre}</p>

                <p>
                    Available Copies:
                    {book.availableCopies}
                </p>
                <button
    onClick={() => handleBorrow(book._id)}
>
    Borrow
</button>

            </div>

        ))}

    </div>
);
};

export default Books;