import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './products.css';
import Spinner from "../../components/spinner";
import ProductCard from "./productcard";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/v1/product/findAll");
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); // Redirect to product view page
    };

    return (
        <div className="product-grid-container">
            <div className="location">
                <h1>All Products</h1>
                <p>Explore all available products</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.productId} onClick={() => handleProductClick(product.productId)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
