import { Link } from "react-router-dom";

const Navbar = () => {

    const token = localStorage.getItem("token");

    return (

        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                borderBottom: "1px solid gray"
            }}
        >

            <Link to="/">
                Books
            </Link>


            {!token ? (

                <>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                    
                </>

            ) : (

                <>

                    <Link to="/mybooks">
                        My Books
                    </Link>

                    <Link to="/admin">
                        Admin
                    </Link>


                    <button
                        onClick={() => {

                            localStorage.removeItem("token");

                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>

                </>

            )}

        </nav>
    );
};

export default Navbar;