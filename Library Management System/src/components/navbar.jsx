import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { colors } from "../styles/theme.js";

const Navbar = () => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const location =
        useLocation();

    const isActive = (path) =>
        location.pathname === path;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const linkStyle = (path) => ({

        textDecoration: "none",

        padding: "8px 12px",

        borderRadius: "12px",

        fontWeight: "600",

        transition: "0.2s",

        color: isActive(path)
            ? "#FFFFFF"
            : colors.textDark,

        backgroundColor:
            isActive(path)
                ? colors.primary
                : "transparent"
    });

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "/login";
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: colors.white,
                borderBottom: `1px solid ${colors.secondary}`,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "54px",
                zIndex: 1000,
                gap: "12px"
            }}
        >

            {/* LOGO */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer"
                }}
                onClick={() => (window.location.href = "/")}
            >
                <div style={{ fontSize: "28px" }}>📚</div>
                <h2 style={{ color: colors.primary, fontSize: "20px", margin: 0 }}>
                    Nebula Library
                </h2>
            </div>

            {/* LINKS (desktop) */}
            {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, justifyContent: "center" }}>
                    {token && (
                        <Link to="/" style={linkStyle("/")} onClick={() => setMenuOpen(false)}>
                            Books
                        </Link>
                    )}
                    {token && (
                        <Link to="/mybooks" style={linkStyle("/mybooks")} onClick={() => setMenuOpen(false)}>
                            My Books
                        </Link>
                    )}
                    
                    {token && user?.role === "admin" && (
                        <Link to="/admin" style={linkStyle("/admin")} onClick={() => setMenuOpen(false)}>
                            Admin Dashboard
                        </Link>
                    )}
                </div>
            )}

            {/* AUTH + Hamburger */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {!token ? (
                    <>
                        <Link to="/login" style={{ textDecoration: "none", color: colors.primary, fontWeight: 600 }}>
                            Login
                        </Link>
                        <Link to="/register" style={{ textDecoration: "none", backgroundColor: colors.primary, color: "#FFFFFF", padding: "8px 14px", borderRadius: "10px", fontWeight: 600 }}>
                            Register
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{ backgroundColor: colors.danger, color: "#FFFFFF", border: "none", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontWeight: 600, marginRight: "45px" }}>
                        Logout
                    </button>
                )}

                {/* Hamburger for mobile */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen((s) => !s)}
                        aria-label="Toggle menu"
                        style={{
                            background: "transparent",
                            border: "1px solid " + colors.secondary,
                            padding: "8px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div style={{ width: 18, height: 2, background: colors.textDark, marginBottom: 4 }} />
                        <div style={{ width: 18, height: 2, background: colors.textDark, marginTop: 4 }} />
                    </button>
                )}
            </div>

            {/* Mobile menu overlay */}
            {isMobile && menuOpen && (
                <div style={{ position: "absolute", top: 64, left: 12, right: 12, background: colors.white, border: `1px solid ${colors.secondary}`, borderRadius: 12, padding: 12, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {token && (
                            <Link to="/" style={{ ...linkStyle("/"), display: "block" }} onClick={() => setMenuOpen(false)}>
                                Books
                            </Link>
                        )}
                        {token && (
                            <Link to="/mybooks" style={{ ...linkStyle("/mybooks"), display: "block" }} onClick={() => setMenuOpen(false)}>
                                My Books
                            </Link>
                        )}
                        {token && user?.role === "admin" && (
                            <Link to="/admin" style={{ ...linkStyle("/admin"), display: "block" }} onClick={() => setMenuOpen(false)}>
                                Admin Dasboard
                            </Link>
                        )}
                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;