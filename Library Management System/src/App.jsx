import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBooks from "./pages/MyBooks";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
function App() {

    return (

        <BrowserRouter>
            <Navbar />

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;