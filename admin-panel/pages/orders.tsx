import { useEffect, useState } from "react";

import { IOrder } from "@/models/Order";
import Layout from "@/components/Layout";
import axios from "axios";
import { mergeClass } from "@/lib/utils";

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Orders</h1>
      <table className="mt-4 w-full rounded-sm bg-white shadow-md">
        <thead>
          <tr>
            <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600">
              Data
            </td>
            <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600">
              Paid
            </td>
            <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600">
              Recipient
            </td>
            <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600">
              Products
            </td>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr key={order._id.toString()}>
                <td className="px-4 py-1">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-1">
                  <span
                    className={mergeClass(
                      "rounded-lg p-1",
                      order.paid ? "bg-green-300 text-green-700" : "bg-red-300 text-red-700"
                    )}
                  >
                    {order.paid ? "YES" : "NO"}
                  </span>
                </td>
                <td className="px-4 py-1">
                  {order.name} | {order.email} <br />
                  {order.city} | {order.postalCode} | {order.country} <br />
                  {order.address}
                </td>
                <td className="px-4 py-1">
                  {order.line_items.map((item: any) => (
                    <>
                      {item.price_data.product_data.name} x {item.quantity} <br/>
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
