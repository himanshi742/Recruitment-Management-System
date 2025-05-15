import { Router } from "express";
const router = Router();
import Razorpay from "razorpay";
import Transaction from "../models/Transaction.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_XjQigvHeyGzLVe",      // Replace with your Razorpay test key
  key_secret: "CeVy6fNTNxrAMDcQlzk02MmJ",        // Replace with your secret
});

router.post("/checkout", async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt_order_123",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: "Razorpay Error" });
  }
});

router.post("/save", async (req, res) => {
  const { paymentId, orderId, amount, cartItems,userName,userEmail } = req.body;

  try {
    const transaction = new Transaction({
      paymentId,
      orderId,
      amount,
      userName,
      userEmail,
      cartItems,
    });

    await transaction.save();
    res.json({ success: true, message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ success: false, error: "Failed to save transaction" });
  }
});

router.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find(); // assuming your model is Transaction
  res.json(transactions);
});


export default router;
