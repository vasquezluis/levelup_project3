import { Schema, model } from "mongoose";
import { Seat } from "../interfaces/seats.interface";

// * seat schema based on movie interface

const SeatsSchema = new Schema<Seat>(
  {
    movieId: {
      type: String,
      required: true,
    },
    movie: {
      type: String,
    },
    available: [String],
    occupied: [String],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const SeatModel = model("seats", SeatsSchema);
export default SeatModel;
