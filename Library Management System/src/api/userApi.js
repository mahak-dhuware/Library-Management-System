import axios from "axios";

const API_URL =
    "https://library-management-system-28ta.onrender.com/api/users";

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