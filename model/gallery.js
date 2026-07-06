import { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    title: { type: String, default: "" },
    image: { type: String, required: true }, // Cloudinary URL
    category: { type: String, default: "general" }, // e.g. "interior", "food", "events"
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

if (models.Gallery) {
  delete models.Gallery;
}

const Galleries = model("Gallery", GallerySchema);
export default Galleries;
