import Link from "next/link";
import styled from "styled-components";

import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/models/Product";
import Button from "./Button";

const ProductWrapper = styled.div`
  /* padding: 20px 0px; */
`;
const ImageWrapper = styled(Link)`
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  border-radius: 12px;

  img {
    max-width: 100%;
    max-height: 100px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.8rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;
const InfoWrapper = styled.div`
  margin-top: 10px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default function ProductCard({ _id, title, images, price }: IProduct) {
  const { addProduct } = useCart();

  return (
    <ProductWrapper>
      <ImageWrapper href={`/product/${_id}`}>
        <img src={images[0]} alt="" />
      </ImageWrapper>
      <InfoWrapper>
        <Title href={`/product/${_id}`}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline onClick={() => addProduct(_id)}>
            Add to cart
          </Button>
        </PriceRow>
      </InfoWrapper>
    </ProductWrapper>
  );
}
