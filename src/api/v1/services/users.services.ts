import UserModel from "../models/users.model";
import ReservationModel from "../models/reservations.model";

class UsersServices {
  public response: any; //* public variable for response

  //* function to get all items
  public async getUsers() {
    try {
      this.response = await UserModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item
  public async createUser(user: any) {
    try {
      this.response = await UserModel.create(user);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to get all items for a certain user
  public async getUserReservations(userId: string) {
    try {
      this.response = await ReservationModel.find({ userId });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const usersServices = new UsersServices();
