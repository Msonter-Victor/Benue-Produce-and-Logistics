import { useEffect, useState } from "react";
import axios from "axios";
import arrow from "./../../../images/green arrow.png";
import style from "./index.module.css";

import Spinner from "../../../components/spinner/index";

const FeaturedSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/v1/product/findAll");
                setProducts(response.data || []);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Spinner />; // Show spinner while loading
    if (error || !products || products.length === 0) return null;

    return (
        <div className={style.container}>
            <div className={style.textSection}>
                <h2>Featured Products</h2>
                <p>View all <img src={arrow} alt="View all" /></p>
            </div>
            <div className={style.products_container}>
                {products.slice(0, 4).map((product) => (
                    <div key={product.productId} className={style.product_card}>
                        <div className={style.product}>
                            {product.imageUrls && product.imageUrls.length > 0 && (
                                <img src={product.imageUrls[0]} alt={product.productName} className={style.product_image} />
                            )}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                                    <h3>{product.productName}</h3>
                                    <p className={style.featuredPrice}>${(product.price).toFixed(2)}</p>
                                </div>
                                <button className={style.viewButton}>View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;
