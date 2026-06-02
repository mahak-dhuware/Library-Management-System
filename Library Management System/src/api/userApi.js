import axios from "axios";

const API_URL =
    "http://localhost:5001/api/users";

export const getBorrowHistory =
    async () => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_URL}/history`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };