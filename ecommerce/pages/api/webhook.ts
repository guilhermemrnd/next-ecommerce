import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { Order } from "@/models/Order";

const endpointSecret = "whsec_10627c360ba5d8fc619f6ee17564f6de4c77619eda67112cd03ec5fae1c4cfb3";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buffer(req), sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const isPaid = data.payment_status === "paid";
      if (orderId && isPaid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200);
}

export const config = {
  api: { bodyParser: false },
};
