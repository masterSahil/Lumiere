import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Optional if it's a global notification
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["order", "promotional", "offer", "coupon", "reservation", "system"],
      default: "system",
    },
    isGlobal: { type: Boolean, default: false }, // If true, applies to all users
    isRead: { type: Boolean, default: false }, // Track read status (for non-global ones)
    // For global notifications, tracking read status per user requires a different approach, 
    // often a separate schema or array of read-by user IDs. We'll add readBy array for global.
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    link: { type: String, default: "" }, // Optional link to redirect user when clicked
  },
  {
    timestamps: true,
  }
);

if (models.Notification) {
  delete models.Notification;
}

const Notifications = model("Notification", NotificationSchema);
export default Notifications;
