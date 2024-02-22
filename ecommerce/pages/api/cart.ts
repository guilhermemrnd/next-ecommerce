import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  await mongooseConnect();

  if (req.method === "POST") {
    const ids = req.body.ids;
    const products = await Product.find({ _id: ids });
    res.json(products);
  }
}
