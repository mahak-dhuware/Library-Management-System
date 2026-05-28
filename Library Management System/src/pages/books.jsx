import { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        const fetchBooks = async () => {

            try {

                const response = await axios.get(
                    "/api/books"
                );

                setBooks(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        fetchBooks();

    }, []);

    return (

        <div>

            <h1>All Books</h1>

            {books.map((book) => (

                <div key={book._id}>

                    <h2>{book.title}</h2>

                    <p>{book.author}</p>

                    <p>{book.genre}</p>

                </div>

            ))}

        </div>
    );
};

export default Books;