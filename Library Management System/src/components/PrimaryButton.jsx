const PrimaryButton = ({
    text,
    onClick,
    backgroundColor = "#0F766E",
    type = "button"
}) => {

    return (

        <button
            type={type}

            onClick={onClick}

            style={{
                width: "100%",

                padding: "14px",

                border: "none",

                borderRadius: "12px",

                backgroundColor,

                color: "white",

                fontWeight: "600",

                fontSize: "15px",

                cursor: "pointer"
            }}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;