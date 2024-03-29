import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="mb-4 text-xl font-bold text-gray-800">New Product</h1>
      <ProductForm />
    </Layout>
  );
}
