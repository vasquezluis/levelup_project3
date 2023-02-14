import MovieModel from "../models/movies.model";

class MoviesServices {
  public response: any; //* public variable for response

  //* function to get one item
  public async getMovie(name: string) {
    try {
      this.response = await MovieModel.findOne({ name });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to get all items
  public async getMovies() {
    try {
      this.response = await MovieModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item
  public async createMovie(movie: any) {
    try {
      this.response = await MovieModel.create(movie);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const moviesServices = new MoviesServices();
