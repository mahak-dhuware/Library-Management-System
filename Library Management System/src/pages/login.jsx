import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import InputField from "../components/InputField";

import PrimaryButton from "../components/PrimaryButton";

import { colors } from "../styles/theme";

const Login = () => {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response =
                await axios.post(
                    "http://localhost:5001/api/users/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            alert(
                "Login Successful"
            );

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",

                backgroundColor:
                    colors.background,

                display: "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",

                    maxWidth: "420px",

                    backgroundColor:
                        colors.white,

                    border:
                        `1px solid ${colors.secondary}`,

                    borderRadius:
                        "24px",

                    padding: "40px",

                    boxShadow:
                        "0 10px 30px rgba(15,118,110,0.08)"
                }}
            >

                <div
                    style={{
                        textAlign: "center",

                        marginBottom: "35px"
                    }}
                >

                    <div
                        style={{
                            fontSize: "52px",

                            marginBottom:
                                "12px"
                        }}
                    >
                        📚
                    </div>

                    <h1
                        style={{
                            color:
                                colors.primary,

                            fontSize:
                                "34px",

                            marginBottom:
                                "10px"
                        }}
                    >
                        Welcome Back
                    </h1>

                    <p
                        style={{
                            color:
                                colors.textLight,

                            fontSize:
                                "15px"
                        }}
                    >
                        Login to access
                        your library
                        account
                    </p>

                </div>

                <form
                    onSubmit={
                        handleLogin
                    }
                    style={{
                        display: "flex",

                        flexDirection:
                            "column",

                        gap: "18px"
                    }}
                >

                    <InputField
                        type="email"

                        placeholder="Enter email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <InputField
                        type="password"

                        placeholder="Enter password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <PrimaryButton
                        text="Login"

                        type="submit"
                    />

                </form>

                <p
                    style={{
                        marginTop: "24px",

                        textAlign: "center",

                        color:
                            colors.textLight
                    }}
                >
                    Don’t have an
                    account?{" "}

                    <Link
                        to="/register"
                        style={{
                            color:
                                colors.primary,

                            textDecoration:
                                "none",

                            fontWeight:
                                "600"
                        }}
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;