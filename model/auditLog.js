import { Schema, model, models } from "mongoose";

const AuditLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    action: { type: String, required: true },
    entity: { type: String, required: true }, // e.g., 'User', 'Order', 'Food'
    entityId: { type: Schema.Types.ObjectId, required: false },
    details: { type: Object, default: {} },
    ipAddress: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

if (models.AuditLog) {
  delete models.AuditLog;
}

const AuditLogs = model("AuditLog", AuditLogSchema);
export default AuditLogs;
