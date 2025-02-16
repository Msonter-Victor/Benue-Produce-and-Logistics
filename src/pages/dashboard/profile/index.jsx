import React, { useState } from "react";
import axios from "axios";
import style from "./index.module.css";
import defaultImg from "./../../../images/default head shot.jpg";

const Profile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    console.log("user : "+ storedUser.toString())
    console.log("phone: ", storedUser?.phone);

    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(storedUser?.mediaUrl || defaultImg);
    const [showModal, setShowModal] = useState(false);
    const [viewingImage, setViewingImage] = useState(false);

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("photoUrl", file);

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8001/api/v1/user/uploadProfilePhoto",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Photo uploaded successfully");
            setProfileImage(URL.createObjectURL(file)); // Update UI with new image
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload photo");
        } finally {
            setLoading(false);
            setShowModal(false); // Close modal after upload
        }
    };

    const renderUserDetails = () => {
        const fields = [
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone Number" },
            { key: "role", label: "Role" },
            { key: "password", label: "Password", value: "**********" },
        ];

        return fields.map((field) => (
            <div key={field.key} className={style.input_group}>
                <label>{field.label}</label>
                <span>{field.value || storedUser?.[field.key] || "N/A"}</span>
            </div>
        ));
    };

    return (
        <div className={style.profile_container}>
            <div className={style.profile_form}>
                <div className={style.profile_image_section}>
                    <img
                        src={profileImage}
                        alt="Profile"
                        onClick={() => setShowModal(true)}
                        className={style.profile_image}
                    />
                </div>

                {showModal && (
                    <div className={style.modal_overlay}>
                        {!viewingImage ? (
                            <div className={style.modal_content}>
                                <button type="button" onClick={() => setViewingImage(true)}>
                                    View Photo
                                </button>
                                <button type="button" onClick={() => document.getElementById("fileInput").click()}>
                                    {loading ? "Uploading..." : "Change Photo"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)}>Close</button>
                                <input type="file" id="fileInput" hidden onChange={handlePhotoChange} accept="image/*" />
                            </div>
                        ) : (
                            <div className={style.image_viewer}>
                                <img src={profileImage} alt="Full Profile" className={style.full_image} />
                                <button type="button" onClick={() => setViewingImage(false)}>Exit</button>
                            </div>
                        )}
                    </div>
                )}

                <form>
                    {renderUserDetails()}
                </form>
            </div>
        </div>
    );
};

export default Profile;