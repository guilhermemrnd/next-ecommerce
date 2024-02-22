import { Schema, model, models, Types } from "mongoose";
import { ICategory } from "./Category";

export type IProduct = {
  _id: Types.ObjectId;
  title: string;
  category: ICategory | Types.ObjectId;
  properties: Object;
  description: string;
  price: number;
  images: string[];
};

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);
