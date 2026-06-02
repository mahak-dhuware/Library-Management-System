import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBooks from "./pages/MyBooks";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";
import History
from "./pages/History";

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