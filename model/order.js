import { Schema, model, models } from "mongoose";

const orderItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, default: "" },
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Optional for guest checkout
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    deliveryInstructions: { type: String, default: "" },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Apple Pay", "Razorpay"] },
    paymentStatus: { type: String, required: true, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    transactionId: { type: String, default: "" },
    orderStatus: { type: String, required: true, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"], default: "Pending" },
  },
  { 
    timestamps: true 
  }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
