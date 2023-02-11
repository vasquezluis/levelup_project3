import { Schema, model } from "mongoose";
import { Reservation } from "../interfaces/reservations.interface";

// * reservations schema based on reservation interface

const ReservationsSchema = new Schema<Reservation>(
  {
    userId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const ReservationModel = model("reservations", ReservationsSchema);
export default ReservationModel;
