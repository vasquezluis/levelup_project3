import { Schema, model } from "mongoose";
import { Product } from "../interfaces/products.interface";

//* product schema based on product interface

const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//* model creation
const ProductModel = model("products", ProductSchema);
export default ProductModel;
