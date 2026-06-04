import PrimaryButton from "./PrimaryButton.jsx";

import { colors } from "../styles/theme.js";

const BookCard = ({
    book,
    buttonText,
    buttonColor,
    onClick,
    showButton = true,
    showCopies = true
})  => {

    return (

        <div
    style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        padding: "24px",
        borderRadius: "0px",
        // boxShadow: "0 4px 12px rgba(15,118,110,0.08)",

        height: "75%",
        minHeight: "360px",

        display: "flex",
        flexDirection: "column",
    }}
>

            <div>

                <div
                    style={{
                        width: "60px",

                        height: "60px",

                        borderRadius:
                            "14px",

                        backgroundColor:
                            colors.primaryLight,

                        display: "flex",

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        fontSize: "30px",

                        marginBottom:
                            "18px"
                    }}
                >
                    📘
                </div>

                <h3
                    style={{
                        fontSize: "28px",

                        height: "60px",

                        marginBottom:
                            "16px",

                        color:
                            colors.textDark
                    }}
                >
                    {book.title}
                </h3>

                <p
                    style={{
                        color:
                            colors.textLight,

                        marginBottom:
                            "10px"
                    }}
                >
                    <strong>
                        Author:
                    </strong>{" "}
                    {book.author}
                </p>

                <p
                    style={{
                        color:
                            colors.textLight,

                        marginBottom:
                            "10px"
                    }}
                >
                    <strong>
                        Genre:
                    </strong>{" "}
                    {book.genre}
                </p>
                {book.borrowDate && (

    <p
        style={{
            color: colors.textLight,
            marginBottom: "10px"
        }}
    >
        <strong>
            Borrowed:
        </strong>{" "}
        {new Date(
            book.borrowDate
        ).toLocaleDateString()}
    </p>

)}

{book.dueDate && (

    <p
        style={{
            color:
                new Date(book.dueDate) < new Date()
                    ? colors.danger
                    : colors.primary,

            fontWeight: "600",

            marginBottom: "10px"
        }}
    >
        <strong>
            Due:
        </strong>{" "}
        {new Date(
            book.dueDate
        ).toLocaleDateString()}
    </p>

)}
                {showCopies && (

        <p
            style={{
                color:
                    book.availableCopies > 0
                        ? colors.green
                        : colors.danger,

                fontWeight: "600",

                marginBottom:
                    "10px"
            }}
        >
            Available Copies:{" "}
            {book.availableCopies}
        </p>

    )}
            </div>

            {showButton && (

                <PrimaryButton
                    text={buttonText}

                    

                    onClick={() =>
                        onClick(book._id)
                    }

                    backgroundColor={
                        buttonColor
                    }
                />

            )}

        </div>

    );
};

export default BookCard;
