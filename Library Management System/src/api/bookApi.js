import axios from "axios";

const BASE_URL =
    "https://library-management-system-28ta.onrender.com/api/books";

export const getBooks = async () => {

    const response =
        await axios.get(BASE_URL);

    return response.data;
};

export const addBook = async (
    bookData
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            BASE_URL,
            bookData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const deleteBook = async (
    id
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.delete(
            `${BASE_URL}/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const borrowBook = async (
    id
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            `${BASE_URL}/borrow/${id}`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const returnBook = async (
    id
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            `${BASE_URL}/return/${id}`,
            {},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};