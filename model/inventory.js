import { Schema, model, models } from "mongoose";

const inventorySchema = new Schema(
  {
    ingredientName: { type: String, required: true, trim: true },
    unit: { type: String, required: true, enum: ["kg", "g", "l", "ml", "pieces", "boxes"] },
    currentStock: { type: Number, required: true, min: 0 },
    lowStockThreshold: { type: Number, required: true, min: 0 },
    lastRestocked: { type: Date, default: Date.now },
    supplierInfo: {
      name: { type: String, default: "" },
      contact: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

const Inventory = models.Inventory || model("Inventory", inventorySchema);
export default Inventory;
