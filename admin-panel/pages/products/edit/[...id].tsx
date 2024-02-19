import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/pages/api/products";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState<Product>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`/api/products?id=${id}`).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
