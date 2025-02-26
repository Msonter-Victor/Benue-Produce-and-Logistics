import React, { useState } from "react";
import axios from "axios";
import style from "./index.module.css";
import exitIcon from "./../../../../images/exit icon.png";
import uploadIcon from "./../../../../images/cloud-upload.png";
import API_BASE_URL from "../../../../config/ApiConfig";

const AddProductModal = ({ isOpen, onClose }) => {
    const [productData, setProductData] = useState({
        productName: "",
        stock: "",
        unitPrice: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productData.productName || !productData.stock || !productData.unitPrice || !productData.description || images.length === 0) {
            setError("All fields are required, including at least one image.");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("stock", productData.stock);
        formData.append("unitPrice", productData.unitPrice);
        formData.append("description", productData.description);
        images.forEach((image) => formData.append("images", image));

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/product/add`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`, // Add authorization header
                    },
                }
            );

            console.log("Product saved successfully:", response.data);
            alert("Product added successfully!"); // Notify user of success
            clearForm();
        } catch (error) {
            console.error("Error saving product:", error);
            setError(error.response?.data?.message || "Failed to add product. Please try again."); // Display error message
        }
    };

    const clearForm = () => {
        setProductData({
            productName: "",
            stock: "",
            unitPrice: "",
            description: "",
        });
        setImages([]);
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <h2>Product Information</h2>
                    <img src={exitIcon} alt="Close" onClick={clearForm} className={style.exitIcon} />
                </div>

                {error && <p className={style.errorText}>{error}</p>}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={style.imageUploadSection}>
                        <label>Product Images</label>
                        <p>JPEG, PNG. Max size: 1200 x 1200px</p>
                        <div className={style.imagePreviewContainer}>
                            {images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} className={style.productImage} />
                            ))}
                            <label className={style.addImageBtn}>
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className={style.fileInput} />
                                <img src={uploadIcon} alt="Upload" />
                                <p style={{ marginTop: "2px", color: "blue" }}>New Image</p>
                            </label>
                        </div>
                    </div>

                    <div className={style.formGroup}>
                        <label>Product Name</label>
                        <input type="text" name="productName" value={productData.productName} onChange={handleInputChange} required />
                    </div>

                    <div className={style.formGroup}>
                        <label>Stock</label>
                        <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} required />
                    </div>

                    <div className={style.formGroup}>
                        <label>Unit Price</label>
                        <input type="number" name="unitPrice" value={productData.unitPrice} onChange={handleInputChange} required />
                    </div>

                    <div className={style.formGroup}>
                        <label>Description</label>
                        <textarea name="description" value={productData.description} onChange={handleInputChange} required />
                    </div>

                    <div className={style.modalActions}>
                        <button type="button" className={style.cancelBtn} onClick={clearForm}>Cancel</button>
                        <button type="submit" className={style.submitBtn}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;