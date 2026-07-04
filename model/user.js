import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  zip: { type: String, default: "" },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "customer", "guest"],
      default: "customer",
    },
    restaurantId: {
      type: String, // Changed to String to match DB values like "01"
      default: null,
    },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
    addresses: [addressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Food" }],
  },
  {
    timestamps: true,
  }
);

if (models.User) {
  delete models.User;
}

const Users = model("User", UserSchema);
export default Users;