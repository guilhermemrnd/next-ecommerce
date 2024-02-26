import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { IOrder, Order } from "@/models/Order";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();

  const orders = await Order.find().sort({ createdAt: -1 });

  res.json(orders as IOrder[]);
}
