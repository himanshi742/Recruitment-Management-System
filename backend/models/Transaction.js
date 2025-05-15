import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: String,
  userName: String,
  userEmail: String,
  cartItems: [
    {
      title: String,
      price: Number,
      instructor: String,
      description: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
