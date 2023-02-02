import ProductModel from "../models/products.model";

export const getProducts = async () => {
  try {
    const reponseItems = await ProductModel.find({});
    return reponseItems;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createProducts = async (item: any) => {
  try {
    const reponseItems = await ProductModel.create(item);
    return reponseItems;
  } catch (error: any) {
    console.log(error.message);
  }
};
