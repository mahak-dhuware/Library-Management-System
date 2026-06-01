import { colors } from "../styles/theme";

const InputField = ({
    type = "text",
    placeholder,
    value,
    onChange
}) => {

    return (

        <input
            type={type}

            placeholder={placeholder}

            value={value}

            onChange={onChange}

            style={{
                width: "100%",

                padding: "14px 16px",

                borderRadius: "8px",

                border:
                    `1px solid ${colors.secondary}`,

                outline: "none",

                fontSize: "15px",

                boxSizing: "border-box"
            }}
        />
    );
};

export default InputField;