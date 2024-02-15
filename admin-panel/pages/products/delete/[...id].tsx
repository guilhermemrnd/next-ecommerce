import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Product } from "@/pages/api/products";
import Layout from "@/components/Layout";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState<Product>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/products?id=${id}`).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  function deleteProduct() {
    axios.delete(`/api/products?id=${id}`).then(() => {
      router.push("/products");
    });
  }

  return (
    <Layout>
      <h1 className="text-xl mb-2 font-bold text-blue-900 text-center">
        Do you really want to delete "{productInfo?.title}"
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded-md"
          onClick={deleteProduct}
        >
          Yes
        </button>
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded-md"
          onClick={() => router.push("/products")}
        >
          No
        </button>
      </div>
    </Layout>
  );
}
