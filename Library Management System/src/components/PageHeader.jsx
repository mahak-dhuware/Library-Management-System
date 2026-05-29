import { colors } from "../styles/theme";

const PageHeader = ({
    title,
    subtitle
}) => {

    return (

        <div
            style={{
                marginBottom: "35px"
            }}
        >

            <h1
                style={{
                    fontSize: "42px",

                    color: colors.primary,

                    marginBottom: "10px"
                }}
            >
                {title}
            </h1>

            <p
                style={{
                    color: "#64748B",

                    fontSize: "17px"
                }}
            >
                {subtitle}
            </p>

        </div>
    );
};

export default PageHeader;