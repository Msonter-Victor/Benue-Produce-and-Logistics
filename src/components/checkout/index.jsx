import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css"; // Import the CSS file

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const shippingCost = 1000; // Static shipping cost

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const finalTotal = cartTotal + shippingCost;

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.id) {
                alert("User not found. Please log in.");
                return;
            }

            const orderResponse = await axios.post("http://localhost:8001/api/v1/order/create", {
                buyerId: user.id,
                items: cartItems,
                totalAmount: finalTotal
            });

            const orderId = orderResponse.data.id;

            const paymentResponse = await axios.post("http://localhost:8001/api/v1/payment/transfer", {
                orderId,
                amount: finalTotal
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (paymentResponse.data && paymentResponse.data.authorizationUrl) {
                window.location.href = paymentResponse.data.authorizationUrl;
            } else {
                alert("Payment initialization failed.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred during checkout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form-container">
                <div className="billing-details">
                    <h2>Billing Details</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="First Name*" className="input-field" />
                        <input type="text" placeholder="Company Name" className="input-field" />
                        <input type="text" placeholder="Street Address*" className="input-field" />
                        <input type="text" placeholder="Apartment, floor, etc. (optional)" className="input-field" />
                        <input type="text" placeholder="Town/City*" className="input-field" />
                        <input type="text" placeholder="Phone Number*" className="input-field" />
                        <input type="email" placeholder="Email Address*" className="input-field" />
                    </form>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={index} className="summary-item">
                                    <span>{item.productName}</span>
                                    <span>₦{item.price}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="summary-item">
                                <span>Subtotal:</span>
                                <span>₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-item">
                                <span>Shipping:</span>
                                <span>₦{shippingCost.toLocaleString()}</span>
                            </div>
                            <div className="summary-item total">
                                <span>Total:</span>
                                <span>₦{finalTotal.toLocaleString()}</span>
                            </div>
                            <hr />
                            <button className="proceed-button" onClick={handleCheckout} disabled={loading}>
                                {loading ? "Processing..." : "Checkout"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
