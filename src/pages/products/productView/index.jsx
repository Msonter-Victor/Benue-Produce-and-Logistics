import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productview.css";
import { FaShoppingCart } from "react-icons/fa";
import StarRating from "../../../components/starRating";
import API_BASE_URL from "../../../config/ApiConfig";


const ProductView = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cartCount, setCartCount] = useState(0);
    const [orderId, setOrderId] = useState(localStorage.getItem("orderId"));

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/api/v1/product/findBy/${id}`);
            setProduct(response.data);
            setSelectedImage(response.data.imageUrls[0]);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("You need to be logged in to add items to cart.");
            navigate("/login");
            return;
        }

        const user = JSON.parse(storedUser);
        const token = user.token;
        console.log("token: "+token)

        if (!token) {
            alert("Session expired. Please log in again.");
            navigate("/login");
            return;
        }

        if (quantity > product.stock) {
            alert(`Only ${product.stock} items are available.`);
            return;
        }
        console.log("product id: ", product.id);

        try {
            const requestBody = {
                productId: product.id,
                orderId: orderId || null, 
                quantity: quantity,
            };


            const response = await axios.post(
                `${API_BASE_URL}/api/v1/order/addToOrder`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // If the order was just created, store the new orderId
            if (!orderId) {
                const newOrderId = response.data.orderId;
                setOrderId(newOrderId);
                localStorage.setItem("orderId", newOrderId);
            }

            updateCartCount(quantity);
            alert("Product added to cart successfully!");
            saveToLocalStorageCart(product, quantity);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert(error.response?.data?.message || "Failed to add product to cart. Please try again.");
        }
    };

    const updateCartCount = (addedQuantity) => {
        setCartCount((prev) => prev + addedQuantity);
    };

    const saveToLocalStorageCart = (product, quantity) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = storedCart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            storedCart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="product-view-container">
            {cartCount > 0 && (
                <div className="cart-icon" onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
                    <FaShoppingCart size={24} />
                    <span className="cart-count">{cartCount}</span>
                </div>
            )}

            <div className="product-images">
                <div className="image-thumbnails">
                    {product.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index}`}
                            onClick={() => setSelectedImage(url)}
                            className={selectedImage === url ? "active-thumbnail" : ""}
                        />
                    ))}
                </div>
                <div className="main-image">
                    <img src={selectedImage} alt={product.productName} />
                </div>
            </div>

            <div className="product-details">
                <h1>{product.productName}</h1>
                <p><StarRating /> (0 reviews)</p>
                <p className="description">Product Description: {product.description}</p>
                <p>Stock: {product.stock}</p>
                <p className="price">Unit price: ₦{product.price}</p>
                <hr className="divider" />
                <div className="buy-section">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Select Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                let val = parseInt(e.target.value) || 1;
                                if (val > product.stock) val = product.stock;
                                if (val < 1) val = 1;
                                setQuantity(val);
                            }}
                            min="1"
                            max={product.stock}
                        />
                    </div>
                    <button className="buy-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
