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
      <h1 className="mb-4 text-center text-xl font-medium text-gray-800 mt-5">
        Do you really want to delete <br className="md:hidden" /> "{productInfo?.title}"?
      </h1>
      <div className="flex justify-center gap-2">
        <button className="rounded-sm bg-red-700 px-5 py-1 text-white" onClick={deleteProduct}>
          Yes
        </button>
        <button
          className="rounded-sm bg-gray-600 px-5 py-1 text-white"
          onClick={() => router.push("/products")}
        >
          No
        </button>
      </div>
    </Layout>
  );
}
