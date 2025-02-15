import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import loginImg from "./../../images/signup_img.png";
import googleIcon from "./../../images/google icon.png";
import appleIcon from "./../../images/apple icon.png";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUpNav = (e) => {
        e.preventDefault();
        navigate("/signup");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8001/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Login successful");
            console.log(response.data.data);

            localStorage.setItem('user', JSON.stringify(response.data.data));

            navigate("/dashboard");
        } catch (error) {
            console.error("Error:", error);
            alert("Login failed");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.img_section}>
                <h1 className={style.img_text}>Reach your <br /> customers faster, <br /> <span className={style.with_us}>With Us.</span></h1>
                <img className={style.signup_img} src={loginImg} alt="Signup logo" />
            </div>
            <div className={style.form_container}>
                <h2 className={style.welcome_text}>Welcome back!</h2>
                <p className={style.sub_text}>Enter your credentials to access your account</p>
                <form onSubmit={handleSubmit}>
                    <div className={style.input_group}>
                        <label>Email address</label>
                        <input type="text" name="username" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div className={style.input_group}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                    </div>

                    <button type="submit" className={style.login_button}>Login</button>
                    <div className={style.social_buttons}>
                        <button className={style.social_button}>
                            <img src={googleIcon} alt="Google" /> Sign in with Google
                        </button>
                        <button className={style.social_button}>
                            <img src={appleIcon} alt="Apple" /> Sign in with Apple
                        </button>
                    </div>
                    <p className={style.signup_text}>Don't have an account? <a href="#" onClick={handleSignUpNav}>Sign Up</a></p>
                </form>
            </div>

        </div>
    );
};

export default Login;
