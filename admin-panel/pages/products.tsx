import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import Layout from "@/components/Layout";
import { Product } from "./api/products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link href={"products/new"}>
        <button className="mb-4 rounded-sm bg-primary px-2 py-1 text-white">Add New Product</button>
      </Link>

      {products.length > 0 && (
        <table className="w-full rounded-sm bg-white p-2 shadow-md md:w-1/2">
          <thead>
            <tr className="">
              <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600 md:py-1">
                Product name
              </td>
              <td className="border-b border-gray-200 px-4 py-2 text-sm font-medium uppercase text-gray-600 md:py-1"></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-1">{product.title}</td>
                <td className="flex justify-end gap-3 px-4 py-1 md:gap-2">
                  <Link
                    className="inline-flex items-center gap-1 rounded-sm bg-transparent px-2 py-1 text-sm text-primary"
                    href={`/products/edit/${product._id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <span className="hidden md:block">Edit</span>
                  </Link>
                  <Link
                    className="inline-flex items-center gap-1 rounded-sm bg-transparent px-2 py-1 text-sm text-red-500"
                    href={`/products/delete/${product._id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    <span className="hidden md:block">Delete</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
