import { Schema, model } from "mongoose";
import { Reservation } from "../interfaces/reservations.interface";

// * reservations schema based on reservation interface

const ReservationsSchema = new Schema<Reservation>(
  {
    userId: {
      type: String,
      required: true,
    },
    movie: {
      type: String,
      require: true,
    },
    schedule: {
      schedule: {
        type: String,
      },
      date: {
        type: Date,
      },
      cinema: {
        type: String,
      },
    },
    seats: [String],
    totalCredits: Number,
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
