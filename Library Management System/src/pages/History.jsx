import {
    useEffect,
    useState
} from "react";

import PageContainer
from "../components/PageContainer";

import PageHeader
from "../components/PageHeader";

import {
    getBorrowHistory
} from "../api/userApi";

const History = () => {

    const [history,
        setHistory] =
        useState([]);

    useEffect(() => {

        const fetchHistory =
            async () => {

                try {

                    const data =
                        await getBorrowHistory();

                    setHistory(data);

                } catch (error) {

                    console.log(error);
                }
            };

        fetchHistory();

    }, []);

    return (

        <PageContainer>

            <PageHeader
                title="Borrow History"
                subtitle="View your borrowing activity."
            />

            <div
                style={{
                    display: "grid",
                    gap: "20px"
                }}
            >

                {history.map(
                    (record) => (

                        <div
                            key={record._id}
                            style={{
                                background:
                                    "#fff",

                                border:
                                    "1px solid #E2E8F0",

                                padding:
                                    "20px",

                                borderRadius:
                                    "16px"
                            }}
                        >

                            <h3>
                                {
                                    record.book
                                        ?.title
                                }
                            </h3>

                            <p>
                                Author:
                                {" "}
                                {
                                    record.book
                                        ?.author
                                }
                            </p>

                            <p>
                                Borrowed:
                                {" "}
                                {new Date(
                                    record.borrowDate
                                )
                                    .toLocaleDateString()}
                            </p>

                            <p>
                                Due:
                                {" "}
                                {new Date(
                                    record.dueDate
                                )
                                    .toLocaleDateString()}
                            </p>

                            <p>
                                Status:
                                {" "}
                                {
                                    record.returned
                                        ? "Returned"
                                        : "Active"
                                }
                            </p>

                            {record.fine >
                                0 && (

                                <p
                                    style={{
                                        color:
                                            "red",

                                        fontWeight:
                                            "600"
                                    }}
                                >
                                    Fine:
                                    ₹
                                    {
                                        record.fine
                                    }
                                </p>

                            )}

                        </div>

                    )
                )}

            </div>

        </PageContainer>
    );
};

export default History;