import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { Types } from "mongoose";

import { mongooseConnect } from "@/lib/mongoose";
import { IProduct, Product } from "@/models/Product";
import { Order } from "@/models/Order";

export type CheckoutBodyDto = {
  productsIds: Types.ObjectId[];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  address: string;
  country: string;
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.json({ message: "It should be a post request" });
  }

  await mongooseConnect();

  const { productsIds, name, email, city, postalCode, address, country } =
    req.body as CheckoutBodyDto;

  const uniqueIds = [...new Set(productsIds.map((id) => id.toString()))];
  const productsInfos: IProduct[] = await Product.find({ _id: uniqueIds });

  let line_items: Object[] = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productsIds.filter((id) => id.toString() === productId).length || 0;

    if (quantity && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items, name, email, city,
    postalCode, address, country, paid: false,
  }); // prettier-ignore

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({ url: session.url });
}
