import { Schema, model } from "mongoose";
import { Movie } from "../interfaces/movies.interface";

// * movie schema based on movie interface

const MoviesSchema = new Schema<Movie>(
  {
    name: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      require: true,
    },
    genders: [String],
    description: {
      type: String,
      required: true,
    },
    schedules: [{ schedule: String, date: Date }],
    cinemas: [String],
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const MovieModel = model("movies", MoviesSchema);
export default MovieModel;
