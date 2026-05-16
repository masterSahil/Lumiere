import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
}, {
    timestamps: true,
})

const Users = models.UserSchema || model("UserSchema", UserSchema);
export default Users;