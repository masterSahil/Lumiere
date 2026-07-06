import { Schema, model, models } from "mongoose";

const BannerSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    image: { type: String, required: true }, // Cloudinary URL
    type: {
      type: String,
      enum: ["homepage", "promotional", "seasonal", "hero"],
      default: "promotional",
    },
    link: { type: String, default: "" }, // URL to redirect when clicked
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // For sorting banners
  },
  {
    timestamps: true,
  }
);

if (models.Banner) {
  delete models.Banner;
}

const Banners = model("Banner", BannerSchema);
export default Banners;
