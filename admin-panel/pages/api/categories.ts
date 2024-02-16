import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export type CategoryProp = {
  name: string;
  values: string | string[];
};

export type Category = {
  _id: string;
  name: string;
  parent?: string | Category;
  properties?: CategoryProp[];
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find().populate("parent");
    res.json(categories as Category[]);
  }

  if (method === "PUT") {
    const { _id, parent, ...category } = req.body as Category;

    if (parent === "") {
      await Category.updateOne(
        { _id },
        { ...category, $unset: { parent: "" } }
      );
    } else {
      await Category.updateOne({ _id }, { ...category, parent });
    }

    res.json({ message: "category updated successfully" });
  }

  if (method === "POST") {
    const { ...category } = req.body as Omit<Category, "_id">;
    const categoryDoc = await Category.create({
      ...category,
      parent: category.parent || undefined,
    });
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    if (req.query.id) {
      await Category.deleteOne({ _id: req.query.id });
      res.json({ message: "category deleted" });
    }
  }
}
