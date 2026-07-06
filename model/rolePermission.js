import { Schema, model, models } from "mongoose";

const RolePermissionSchema = new Schema(
  {
    roleName: { type: String, required: true, unique: true }, // e.g. "admin", "superadmin", "manager"
    permissions: [{ type: String }], // Array of permission strings like "manage_users", "manage_orders"
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

if (models.RolePermission) {
  delete models.RolePermission;
}

const RolePermissions = model("RolePermission", RolePermissionSchema);
export default RolePermissions;
