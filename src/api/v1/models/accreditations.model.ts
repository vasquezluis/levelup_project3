import { Schema, model } from "mongoose";
import { Accreditation } from "../interfaces/accreditations.interface";

// * accreditation schema based on accreditation interface

const AccreditationSchema = new Schema<Accreditation>(
  {
    userId: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    coupon: {
      type: String,
      default: null,
    },
    paid: {
      type: Boolean,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const AccreditationModel = model("accreditations", AccreditationSchema);
export default AccreditationModel;
