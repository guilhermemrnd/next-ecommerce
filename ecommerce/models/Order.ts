import { Schema, Types, model, models } from "mongoose";

export type IOrder = {
  _id: Types.ObjectId;
  line_items: [Object];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
  paid: boolean;
};

const OrderSchema = new Schema<IOrder>({
  line_items: [Object],
  name: String,
  email: String,
  city: String,
  postalCode: String,
  address: String,
  country: String,
  paid: Boolean,
}, {
  timestamps: true
});

export const Order = models?.Order || model<IOrder>("Order", OrderSchema);
