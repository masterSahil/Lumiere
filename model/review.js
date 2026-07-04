import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Optional for anonymous or simple guest reviews
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true }, // For admin moderation later
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;
