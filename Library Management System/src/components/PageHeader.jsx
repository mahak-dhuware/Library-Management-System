import { colors } from "../styles/theme";

const PageHeader = ({
    title,
    subtitle
}) => {

    return (

        <div
        >

            <h1
                style={{
                    fontSize: "40px",

                    color: colors.primary,

                    marginBottom: "0px"
                }}
            >
                {title}
            </h1>

            <p
                style={{
                    color: "#64748B",

                    fontSize: "15px"
                }}
            >
                {subtitle}
            </p>

        </div>
    );
};

export default PageHeader;