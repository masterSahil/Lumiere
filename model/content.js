import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema(
  {
    type: { type: String, required: true, enum: ['faq', 'about', 'contact', 'home'] },
    key: { type: String, required: true }, // e.g., 'question', 'section1_title'
    value: { type: String, required: true }, // The actual content/text/HTML
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

if (models.Content) {
  delete models.Content;
}

const Contents = model("Content", ContentSchema);
export default Contents;
