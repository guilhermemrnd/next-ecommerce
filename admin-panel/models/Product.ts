import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model("Product", ProductSchema);
