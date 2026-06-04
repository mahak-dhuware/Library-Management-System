import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Books from "./pages/books.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import MyBooks from "./pages/myBooks.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";

import Navbar from "./components/navbar.jsx";
import History
from "./pages/history.jsx";

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