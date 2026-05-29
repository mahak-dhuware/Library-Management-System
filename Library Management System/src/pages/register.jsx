import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import InputField from "../components/InputField";

import PrimaryButton from "../components/PrimaryButton";

import { colors } from "../styles/theme";

const Register = () => {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5001/api/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(
                "Registration Successful"
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                "Registration Failed"
            );
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

                    maxWidth: "430px",

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
                        Create Account
                    </h1>

                    <p
                        style={{
                            color:
                                colors.textLight,

                            fontSize:
                                "15px"
                        }}
                    >
                        Join the library
                        management system
                    </p>

                </div>

                <form
                    onSubmit={
                        handleRegister
                    }
                    style={{
                        display: "flex",

                        flexDirection:
                            "column",

                        gap: "18px"
                    }}
                >

                    <InputField
                        type="text"

                        placeholder="Enter name"

                        value={name}

                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

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
                        text="Register"

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
                    Already have an
                    account?{" "}

                    <Link
                        to="/login"
                        style={{
                            color:
                                colors.primary,

                            textDecoration:
                                "none",

                            fontWeight:
                                "600"
                        }}
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;