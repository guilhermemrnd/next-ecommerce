import styled from "styled-components";

import { IProduct } from "@/models/Product";

import Center from "./Center";
import ProductCard from "./ProductCard";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 30px 0 20px;
`;
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding-bottom: 48px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function NewProducts({ products }: { products: IProduct[] }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map((product) => <ProductCard {...product} />)}
      </ProductsGrid>
    </Center>
  );
}
