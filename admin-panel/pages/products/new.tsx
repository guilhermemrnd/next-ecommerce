import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="text-xl mb-2 font-bold text-blue-900">New Product</h1>
      <ProductForm />
    </Layout>
  );
}
