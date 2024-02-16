import { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query.id });
      return res.json(product as Product);
    } else {
      const products = await Product.find();
      return res.json(products as Product[]);
    }
  }

  if (method === "PUT") {
    const { _id, ...product } = req.body as Partial<Product>;
    await Product.updateOne({ _id }, { ...product });
    res.json({ message: "product updated successfully" });
  }

  if (method === "POST") {
    const { ...newProduct } = req.body as Omit<Product, "_id">;
    const productDoc = await Product.create({ ...newProduct });
    res.json(productDoc);
  }

  if (method === "DELETE") {
    if (req.query.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json({ message: "product deleted" });
    }
  }
}
