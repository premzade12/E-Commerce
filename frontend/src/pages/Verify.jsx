import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";

function Verify({ serverUrl }) {
    const { setCartItem } = useContext(shopDataContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orderId = params.get("orderId");
        const sessionId = params.get("sessionId"); // Stripe session ID

        if (sessionId && orderId) {
            const verifyPayment = async () => {
                try {
                    // Call backend to verify payment
                    await axios.post(
                        `${serverUrl}/api/order/verifyStripe`,
                        { orderId, sessionId },
                        { withCredentials: true }
                    );

                    // ✅ Clear frontend cart
                    
                    setCartItem({});
                    navigate("/order");
                } catch (error) {
                    console.log("Payment verification failed:", error);
                    navigate("/order?failed=true");
                }
            };
            verifyPayment();
        } else {
            navigate("/order?failed=true");
        }
    }, [location, navigate, serverUrl]);

    return (
        <div className="w-full h-screen flex items-center justify-center text-white text-lg">
            Verifying payment...
        </div>
    );
}

export default Verify;
