import UserModel from "../models/users.model";

class AuthServices {
  public response: any; // * public variable for response

  // * function to get one item
  public async getUser(user: string) {
    try {
      this.response = await UserModel.findOne({ user: user });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const authServices = new AuthServices();
