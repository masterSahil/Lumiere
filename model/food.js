import { Schema, model, models } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    primaryImage: { type: String, required: true },
    galleryImages: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    attributes: { type: [String], default: [] }, // e.g., ["Vegan", "Gluten-Free", "Spicy"]
    nutritionalInfo: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      allergens: { type: [String], default: [] }
    },
    isPopular: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
  },{ 
    timestamps: true 
});

const Food = models.Food || model("Food", foodSchema);
export default Food;