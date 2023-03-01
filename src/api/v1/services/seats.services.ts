import SeatsModel from "../models/seats.model";

class SeatsServices {
  public response: any; //* public variable for response

  //* function to get one item
  public async getSeat(id: string) {
    try {
      this.response = await SeatsModel.findById(id);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to get all items
  public async getSeats() {
    try {
      this.response = await SeatsModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all active items
  public async getActiveSeats() {
    try {
      this.response = await SeatsModel.find({ active: true });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item
  public async createSeat(seats: any) {
    try {
      this.response = await SeatsModel.create(seats);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to update available and occupied seats
  public async updateSeats(id: string, body: any) {
    try {
      this.response = await SeatsModel.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to soft delete an item
  public async deleteSeat(id: string) {
    try {
      this.response = await SeatsModel.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const seatsServices = new SeatsServices();
