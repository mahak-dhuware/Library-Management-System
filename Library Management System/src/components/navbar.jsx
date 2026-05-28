import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const context = useContext(AuthContext);
if (!context) {
  return <div>Loading...</div>;
}

const { user, logout } = context;

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/books">Books</Link>

      {user && <Link to="/mybooks">MyBooks</Link>}

      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {user?.role === "admin" && (
        <Link to="/admin">Admin</Link>
      )}
    </nav>
  );
};

export default Navbar;