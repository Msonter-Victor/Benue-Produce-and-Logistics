import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const shippingCost = 1000; // Static shipping cost, adjust if dynamic

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemoveItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const finalTotal = cartTotal + shippingCost;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-table">
                        <div className="cart-header">
                            <span className="cart-column product">Product</span>
                            <span className="cart-column price">Price</span>
                            <span className="cart-column quantity">Quantity</span>
                            <span className="cart-column subtotal">Subtotal</span>
                            <span className="cart-column action">Action</span>
                        </div>

                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-row">
                                <div className="cart-column product">
                                    <img src={item.imageUrls[0]} alt={item.productName} className="cart-item-image" />
                                    <span>{item.productName}</span>
                                </div>
                                <div className="cart-column price">₦{item.price}</div>
                                <div className="cart-column quantity">{item.quantity}</div>
                                <div className="cart-column subtotal">₦{item.price * item.quantity}</div>
                                <div className="cart-column action">
                                    <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="cart-footer">
                    <button className="return-shop-btn" onClick={() => navigate("/")}>
                        Return to Shop
                    </button>

                    {cartItems.length > 0 && (
                        <div className="checkout-summary">
                            <h2>Cart Summary</h2>
                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping:</span>
                                <span>₦{shippingCost.toLocaleString()}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total:</span>
                                <span>₦{finalTotal.toLocaleString()}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
