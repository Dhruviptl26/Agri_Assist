import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get("orderId"); 
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!paymentId) {
            setError("Invalid Payment ID.");
            return;
        }
        axios.get(`http://localhost:8080/api/orders/${paymentId}`)
            .then(response =>{setPaymentDetails(response.data);} )
            .catch(err => setError("Error fetching payment details: " + err.message));
           
    }, [paymentId]); 

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : paymentDetails ? (
                <div>
                    <h2>Payment Details</h2>
                    <p><strong>Total Price:</strong> ₹{paymentDetails.totalPrice}</p>
                    <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
                    <p><strong>Status:</strong> {paymentDetails.status}</p>
                    <p><strong>Created At:</strong> {new Date(paymentDetails.createdAt).toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
};

export default PaymentPage;
