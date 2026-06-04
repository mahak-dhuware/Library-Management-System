import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Books from "./pages/Books.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Navbar from "./components/navbar.jsx";
import History
from "./pages/History.jsx";

function AppContent() {

    const location = useLocation();

    const hideNavbarRoutes = [
        "/login",
        "/register"
    ];

    return (

        <>

            {!hideNavbarRoutes.includes(
                location.pathname
            ) && <Navbar />}

            <Routes>

                <Route
                    path="/"
                    element={<Books />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/mybooks"
                    element={<MyBooks />}
                />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
    path="/history"
    element={<History />}
/>

            </Routes>

        </>

    );
}

function App() {

    return (

        <BrowserRouter>

            <AppContent />

        </BrowserRouter>

    );
}

export default App;