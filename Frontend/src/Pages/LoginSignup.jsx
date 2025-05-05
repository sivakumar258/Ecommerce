import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login Function Executed", formData);
        let responseData;

        await fetch('http://localhost:4000/login', {
            method: 'POST', // ✅ Fix: method goes here
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.error); // ✅ Fix: backend uses "error"
        }
    };

    const signup = async () => {
        console.log("Signup Function Executed", formData);
        let responseData;

        await fetch('http://localhost:4000/signup', {
            method: 'POST', // ✅ Fix: method goes here
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.error); // ✅ Fix: backend uses "error"
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && (
                        <input
                            name="username"
                            type="text"
                            placeholder="Your Name"
                            value={formData.username}
                            onChange={changeHandler}
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address" // ✅ Fix typo
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
                <button onClick={() => {
                    state === "Login" ? login() : signup();
                }}>Continue</button>

                {state === "Sign Up" ? (
                    <p className='loginsignup-login'>
                        Already have an account?
                        <span onClick={() => setState("Login")}> Login</span>
                    </p>
                ) : (
                    <p className='loginsignup-login'>
                        Create an account
                        <span onClick={() => setState("Sign Up")}> Click here</span>
                    </p>
                )}

                <div className="loginsignup-agree">
                    <input type="checkbox" id="agree" />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
