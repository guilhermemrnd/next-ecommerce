import { Schema, Types, model, models } from "mongoose";

export type ICategory = {
  _id: Types.ObjectId;
  name: string;
  parent: ICategory | Types.ObjectId;
  properties: Object[];
};

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: Types.ObjectId, ref: "Category" },
  properties: { type: [Object] },
});

export const Category =
  models.Category || model<ICategory>("Category", CategorySchema);
