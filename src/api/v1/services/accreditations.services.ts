import AccreditationModel from "../models/accreditations.model";
import UserModel from "../models/users.model";

class AccreditationsServices {
  public response: any; //* public variable for response
  public user: any;
  public accreditation: any;
  public newAccreditationData: any;
  public userCredits: any;
  public newCredits: any;

  //* function to get one item
  public async getAccreditation(id: string) {
    try {
      this.response = await AccreditationModel.findById(id);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to get all items
  public async getAccreditations() {
    try {
      this.response = await AccreditationModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to get all active items
  public async getActiveAccreditations() {
    try {
      this.response = await AccreditationModel.find({ active: true });

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item
  public async createAccreditation(accreditation: any) {
    try {
      this.user = await UserModel.findById(accreditation.userId);
      this.newAccreditationData = {
        user: this.user.user,
        ...accreditation,
      };
      this.response = await AccreditationModel.create(
        this.newAccreditationData
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to update an item
  public async updateAccreditation(id: string, body: any) {
    try {
      this.response = await AccreditationModel.findByIdAndUpdate(
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
  public async deleteAccreditation(id: string) {
    try {
      this.response = await AccreditationModel.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // * function to accept an accreditation
  // * id for accreditation request => params
  // * credits amount from admin => body
  // ? active attribute on false
  // ? accepted attribute on true
  // ! update user credits amount
  public async acceptAccreditation(id: string, credits: string) {
    try {
      this.accreditation = await AccreditationModel.findById(id);
      this.user = await UserModel.findById(this.accreditation.userId);
      this.userCredits = this.user.credits;

      // ? new credist for user
      this.newCredits = this.userCredits + parseInt(credits);

      // ? changing accepted on accreditation to true
      await AccreditationModel.findByIdAndUpdate(id, { accepted: true });
      await AccreditationModel.findByIdAndUpdate(id, { active: false });
      await AccreditationModel.findByIdAndUpdate(id, {
        credits: parseInt(credits),
      });

      this.response = await UserModel.findByIdAndUpdate(
        { _id: this.user._id },
        { $set: { credits: this.newCredits } },
        { new: true }
      );

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const accreditationsServices = new AccreditationsServices();
