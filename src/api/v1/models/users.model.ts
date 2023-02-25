import { Schema, model } from "mongoose";
import { User } from "../interfaces/users.interface";

// * users schema based on user interface

const UsersSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      default: 300,
    },
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [String],
    permissions: [String],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const UserModel = model("users", UsersSchema);
export default UserModel;
