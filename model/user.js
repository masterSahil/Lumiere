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
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: function () {
        // SuperAdmins don't belong to a specific restaurant
        return this.role !== "superadmin" && this.role !== "guest";
      },
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

const Users = models.User || model("User", UserSchema);
export default Users;