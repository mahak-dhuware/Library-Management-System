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

                padding: "80px 40px 24px"
            }}
        >
            {children}
        </div>
    );
};

export default PageContainer;