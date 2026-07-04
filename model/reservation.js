import { Schema, model, models } from "mongoose";

const reservationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:MM
    guests: { type: Number, required: true, min: 1, max: 20 },
    specialRequests: { type: String, default: "" },
    status: { 
      type: String, 
      required: true, 
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"], 
      default: "Pending" 
    },
  },
  { timestamps: true }
);

const Reservation = models.Reservation || model("Reservation", reservationSchema);
export default Reservation;
