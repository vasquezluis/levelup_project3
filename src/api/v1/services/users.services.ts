import UserModel from "../models/users.model";
import ReservationModel from "../models/reservations.model";
import AccreditationModel from "../models/accreditations.model";

class UsersServices {
  public response: any; // * public variable for response

  // * function to get one item
  public async getUser(id: string) {
    try {
      this.response = await UserModel.findById(id);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all items
  public async getUsers() {
    try {
      this.response = await UserModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all active items
  public async getActiveUsers() {
    try {
      this.response = await UserModel.find({ active: true });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to create an item
  public async createUser(user: any) {
    try {
      this.response = await UserModel.create(user);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to update an item
  public async updateUser(id: string, body: any) {
    try {
      this.response = await UserModel.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to soft delete an item
  public async deleteUser(id: string) {
    try {
      this.response = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all reservations for a certain user
  public async getUserReservations(id: string) {
    try {
      this.response = await ReservationModel.find({ userId: id });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all accreditations for a certain user
  public async getUserAccreditations(id: string) {
    try {
      this.response = await AccreditationModel.find({ userId: id });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const usersServices = new UsersServices();
