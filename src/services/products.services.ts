import ProductModel from "../models/products.model";

class ProductsServices {
  public response: any; //* public variable for response

  //* function to get all items
  public async getProducts() {
    try {
      this.response = await ProductModel.find({});

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //* function to create an item
  public async createProducts(product: any) {
    try {
      this.response = await ProductModel.create(product);

      return this.response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export const productsServices = new ProductsServices();
