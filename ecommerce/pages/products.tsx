import styled from "styled-components";

import { mongooseConnect } from "@/lib/mongoose";
import { IProduct, Product } from "@/models/Product";

import Header from "@/componets/Header";
import Center from "@/componets/Center";
import Title from "../componets/Title";
import ProductCard from "@/componets/ProductCard";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
`;

export default function Products({ products }: { products: IProduct[] }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid>
          {products?.length > 0 && products.map((product) => <ProductCard {...product} />)}
        </ProductsGrid>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
