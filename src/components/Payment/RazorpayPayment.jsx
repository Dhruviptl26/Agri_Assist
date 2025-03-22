import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../../App.css"

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true); // SDK already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorpayPayment = () => {
  const location = useLocation();
  const { searchResult, formData, calculatedPrice } = location.state || {};

  useEffect(() => {
    if (!searchResult || !formData || !calculatedPrice) {
      console.error("Missing required data for payment");
      return;
    }

    console.log("Payment Data:", { searchResult, formData, calculatedPrice });

    loadRazorpayScript().then((loaded) => {
      if (!loaded) {
        console.error("Failed to load Razorpay SDK");
        return;
      }

      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: "rzp_test_R3oVxK5oFhf59G", // ⚠️ Replace with your Razorpay Key
        amount: calculatedPrice * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "Your App Name",
        description: "Purchase Details",
        image: "/logo.png",
        handler: function (response) {
          console.log("Payment Success:", response);
        },
        prefill: {
          name: formData.name || "Guest",
          email: formData.email || "guest@example.com",
          contact: formData.phone || "0000000000",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      console.log("Razorpay Options:", options);
      rzp.open();
    });
  }, [searchResult, formData, calculatedPrice]);

  return <h2>Processing Payment...</h2>;
};

export default RazorpayPayment;
