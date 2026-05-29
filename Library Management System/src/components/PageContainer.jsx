import { colors } from "../styles/theme";

const PageContainer = ({
    children
}) => {

    return (

        <div
            style={{
                minHeight: "100vh",

                backgroundColor:
                    colors.background,

                padding: "24px 40px"
            }}
        >
            {children}
        </div>
    );
};

export default PageContainer;