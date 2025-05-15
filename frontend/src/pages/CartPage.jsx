import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-toastify";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');


  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => {
    const cleanPrice = typeof item.price === "string" 
      ? parseFloat(item.price.replace(/[₹,]/g, "")) 
      : parseFloat(item.price);
  
    return total + (isNaN(cleanPrice) ? 0 : cleanPrice);
  }, 0);

 


  const handlePayment = async () => {
    const res = await axios.post("http://localhost:5000/api/payment/checkout", {
      amount: totalAmount * 100,
      cartItems, // sending cart data to backend
    });
  
    const options = {
      key: "rzp_test_XjQigvHeyGzLVe",
      amount: res.data.amount,
      currency: "INR",
      name: "RMS Certification",
      description: "Test Payment",
      order_id: res.data.id,
      handler: async function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
  
        // Save transaction to MongoDB
        await axios.post("http://localhost:5000/api/payment/save", {
          paymentId: response.razorpay_payment_id,
          orderId: res.data.id,
          amount: res.data.amount,
          userName: username,
          userEmail: email,
          cartItems, // include cart items
        });
  
        setCartItems([]);
        localStorage.removeItem("cartItems");
      },
      prefill: {
        name: username,
        email: email,
      },
      theme: {
        color: "#6366f1",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} className="mb-4 p-4">
              <CardTitle>{item.title}</CardTitle>
              <CardContent>
                <p>{item.description}</p>
                <p className="text-sm text-gray-500">Instructor: {item.instructor}</p>
                <p className="font-semibold">{item.price}</p>
              </CardContent>
            </Card>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ₹{totalAmount}</p>
            <Button onClick={handlePayment} className="bg-green-600 text-white">
              Pay Now
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
