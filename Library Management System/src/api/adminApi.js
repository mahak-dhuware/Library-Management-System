import axios from "axios";

export const getBorrowRecords = async () => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.get(
           "https://library-management-system-28ta.onrender.com/api/admin/borrow-records",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const getOverdueBooks =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                "http://localhost:5001/api/admin/overdue",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };

    export const getDashboardStats =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                "http://localhost:5001/api/admin/stats",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };