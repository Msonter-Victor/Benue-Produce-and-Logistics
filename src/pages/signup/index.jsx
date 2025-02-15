import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import style from "./index.module.css";
import signUpImg from "./../../images/signup_img.png";

const InputField = ({ label, type, name, placeholder, value, onChange }) => (
    <div className={style.input_group}>
        <label htmlFor={name} className={style.label}>{label}</label>
        <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCaptcha = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the reCAPTCHA verification.");
            return;
        }

        if (Object.values(formData).some((value) => !value)) {
            alert("All fields are required.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const formattedRole = formData.role.toUpperCase();
        const payload = {
            ...formData,
            role: formattedRole,
            captchaToken
        };
        delete payload.confirmPassword;

        const baseUrl = "http://localhost:8001/api/v1";
        const registerEndpoint = `${baseUrl}/${formattedRole.toLowerCase()}/register`;
        const loginEndpoint = `${baseUrl}/auth/login`;

        try {
            await axios.post(registerEndpoint, payload, {
                headers: { "Content-Type": "application/json" },
            });

            const loginResponse = await axios.post(loginEndpoint, {
                username: formData.email,
                password: formData.password,
            }, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
            alert("User registered successfully.");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration/Login failed. Please try again.");
        } finally {
            // Reset reCAPTCHA after submission
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.img_section}>
                <h1 className={style.img_text}>
                    Reach your <br /> customers faster, <br /> <span className={style.with_us}>With Us.</span>
                </h1>
                <img className={style.signupImg} src={signUpImg} alt="Signup logo" />
            </div>
            <div className={style.form_container}>
                <h2>Get Started Now</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.fields}>
                        <div className={style.row}>
                            <InputField label="First Name" type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                            <InputField label="Last Name" type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className={style.row}>
                            <InputField label="Email Address" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                            <InputField label="Phone Number" type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className={style.input_group}>
                            <label htmlFor="role" className={style.label}>Select Role</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FARMER">Farmer</option>
                                <option value="BUYER">Buyer</option>
                                <option value="LOGISTICS">Rider</option>
                            </select>
                        </div>
                        <div className={style.row}>
                            <InputField label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                            <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                    </div>

                    {/* reCAPTCHA */}
                    <div className={style.recaptcha}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY}
                            onChange={handleCaptcha}
                        />
                    </div>

                    <div className={style.button_group}>
                        <button type="submit" className={style.register_button}>
                            Register
                        </button>
                    </div>
                </form>
                <p className={style.signup_text}>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    );
};

export default SignUp;
