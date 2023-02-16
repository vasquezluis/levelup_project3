import MovieModel from "../models/movies.model";

class MoviesServices {
  public response: any; //* public variable for response

  //* function to get one item
  public async getMovie(id: string) {
    try {
      this.response = await MovieModel.findById(id);

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

  // * function to get all active items
  public async getActiveMovies() {
    try {
      this.response = await MovieModel.find({ active: true });

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

  // * function to update an item
  public async updateMovie(id: string, body: any) {
    try {
      this.response = await MovieModel.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to soft delete an item
  public async deleteMovie(id: string) {
    try {
      this.response = await MovieModel.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const moviesServices = new MoviesServices();
