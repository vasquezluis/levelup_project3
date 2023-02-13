import { Schema, model } from "mongoose";
import { Reservation } from "../interfaces/reservations.interface";

// * reservations schema based on reservation interface

const ReservationsSchema = new Schema<Reservation>(
  {
    userId: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      require: true,
    },
    schedule: {
      type: String,
      require: true,
    },
    cinema: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const ReservationModel = model("reservations", ReservationsSchema);
export default ReservationModel;
