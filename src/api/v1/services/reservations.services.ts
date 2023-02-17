import MovieModel from "../models/movies.model";
import ReservationModel from "../models/reservations.model";
import UserModel from "../models/users.model";

class ReservationsServices {
  public response: any; //* public variable for response
  public movieFound: any; //* public variable for response
  public userFound: any; //* public variable for response
  public movieCost: any; //* public variable for response
  public newUserCredits: any; //* public variable for response
  public newReservationData: any; //* public variable for response
  public scheduleFound: any; //* public variable for response
  public totalCredits: any; //* public variable for response

  // * function to get one item
  public async getReservation(id: string) {
    try {
      this.response = await ReservationModel.findById(id);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to get all items
  public async getReservations() {
    try {
      this.response = await ReservationModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all active items
  public async getActiveReservations() {
    try {
      this.response = await ReservationModel.find({ active: true });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item

  public async createReservation(reservation: any) {
    try {
      this.movieFound = await MovieModel.findById(reservation.movieId);
      this.userFound = await UserModel.findById(reservation.userId);
      this.movieCost = parseInt(this.movieFound.cost);
      this.scheduleFound = this.movieFound.schedules.filter(
        (item: any) => item._id == reservation.schedule
      )[0];
      this.totalCredits = this.movieCost * reservation.seats.length;
      this.newReservationData = {
        userId: reservation.userId,
        movie: this.movieFound.name,
        schedule: this.scheduleFound,
        seats: reservation.seats,
        totalCredits: this.totalCredits,
      };

      if (this.userFound.credits > this.movieCost * reservation.seats.length) {
        // TODO creating a reservation item
        this.response = await ReservationModel.create(this.newReservationData);

        // TODO update user credits
        this.newUserCredits =
          this.userFound.credits - this.movieCost * reservation.seats.length;
        await UserModel.findByIdAndUpdate(reservation.userId, {
          credits: this.newUserCredits,
        });

        return this.response;
      } else {
        return "Insufficient credits";
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to update an item
  public async updateReservation(id: string, body: any) {
    try {
      this.response = await ReservationModel.findByIdAndUpdate(
        { _id: id },
        body,
        {
          new: true,
        }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to soft delete an item
  public async deleteReservation(id: string) {
    try {
      this.response = await ReservationModel.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const reservationsServices = new ReservationsServices();
