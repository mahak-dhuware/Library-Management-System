import PrimaryButton from "./PrimaryButton";

import { colors } from "../styles/theme";

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
                backgroundColor:
                    colors.white,

                border:
                    `1px solid ${colors.border}`,

                borderRadius:
                    "20px",

                padding: "24px",

                minHeight: "260px",

                display: "flex",

                flexDirection:
                    "column",

                justifyContent:
                    "space-between",

                boxShadow:
                    "0 8px 24px rgba(15,118,110,0.05)"
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
                {showCopies && (

    <p
        style={{
            color:
                book.availableCopies > 0
                    ? "#0F766E"
                    : "#F87171",

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