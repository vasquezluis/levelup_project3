import ReservationModel from "../models/reservations.model";

class ReservationsServices {
  public response: any; //* public variable for response

  //* function to get all items
  public async getReservations() {
    try {
      this.response = await ReservationModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item

  public async createReservation(reservation: any) {
    try {
      this.response = await ReservationModel.create(reservation);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const reservationsServices = new ReservationsServices();
