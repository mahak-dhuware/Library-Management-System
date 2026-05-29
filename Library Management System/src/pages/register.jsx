import { useState } from "react";
import axios from "axios";

const Register = () => {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5001/api/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

            alert("Registration Successful");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (

        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;