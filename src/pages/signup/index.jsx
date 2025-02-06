import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import signUpImg from "./../../images/signup_img.png";

const InputField = ({ label, type, name, placeholder, value, onChange }) => (
    <div className={style.input_group}>
        <label htmlFor={name} className={style.label}>{label}</label>
        <input id={name} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
    </div>
);

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        termsAgreed: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            alert("All fields are required.");
            return;
        }

        if (!formData.role) {
            alert("Please select a role before proceeding.");
            return;
        }

        if (!formData.termsAgreed) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        const formattedRole = formData.role.toUpperCase();
        const payload = { ...formData, role: formattedRole };
        delete payload.confirmPassword;

        const baseUrl = "http://localhost:8001/api/v1";
        const rolePath = formattedRole.toLowerCase();
        const endpoint = `${baseUrl}/${rolePath}/register`;

        try {
            const response = await axios.post(endpoint, payload, {
                headers: { "Content-Type": "application/json" },
            });

            alert(response.data.message);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                termsAgreed: false,
            });
            navigate("/login");
        } catch (error) {
            console.error("Error registering:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.form_container}>
                <h2>Get Started Now</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.fields}>
                        <InputField label="First Name" type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                        <InputField label="Last Name" type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                        <InputField label="Email Address" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />

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

                        <InputField label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className={style.terms_checkbox}>
                        <input type="checkbox" id="termsAgreed" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} required />
                        <label htmlFor="termsAgreed">
                            I agree to the <a href="#">Terms of Use and Conditions</a>
                        </label>
                    </div>

                    <div className={style.button_group}>
                        <button type="submit" className={style.register_button}>
                            Register
                        </button>
                    </div>
                </form>
                <p className={style.signup_text}>Already have an account? <a href="#" >Sign in</a></p>
            </div>
            <div className={style.img_section}>
                <h1 className={style.img_text}>
                    Reach your <br /> customers faster, <br /> <span className={style.with_us}>With Us.</span>
                </h1>
                <img className={style.signupImg} src={signUpImg} alt="Signup logo" />
            </div>
        </div>
    );
};

export default SignUp;
