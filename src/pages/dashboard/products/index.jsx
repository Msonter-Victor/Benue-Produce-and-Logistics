import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./index.module.css";
import AddProductModal from "./addproduct";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/v1/product/findAll");
                setProducts(response.data);
                console.log("products:", response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []); // Run only on component mount

    const toggleStatus = (id) => {
        setProducts(products.map((product) =>
            product.productId === id ? { ...product, status: !product.status } : product
        ));
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.dropdownSec}>
                    <select className={style.dropdown}>
                        <option>Best Sellers</option>
                    </select>
                    <select className={style.dropdown}>
                        <option>All Categories</option>
                    </select>
                </div>
                <button className={style.new_product} onClick={() => setIsModalOpen(true)}>
                    + New Product
                </button>
            </div>
            <div className={style.table_container}>
                <table className={style.product_table}>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Stock</th>
                        <th>Sales</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productName}</td>
                            <td>{product.farmerResponse?.firstName || "N/A"}</td>
                            <td>
                                {product.stock || "0"}
                            </td>
                            <td>{product.sales || "0"}</td>
                            <td>{product.price ? `${product.price}` : "N/A"}</td>
                            <td>
                                <label className={style.switch}>
                                    <input
                                        type="checkbox"
                                        checked={product.status || false}
                                        onChange={() => toggleStatus(product.productId)}
                                    />
                                    <span className={style.slider}></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={style.pagination}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                    <span>Show rows:</span>
                    <select style={{ padding: "5px", borderRadius: "5px" }}>
                        <option>10 rows</option>
                        <option>20 rows</option>
                    </select>
                </div>
                <div className={style.pageNumbers}>
                    <button>&lt;</button>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <button>&gt;</button>
                </div>
            </div>
            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Products;