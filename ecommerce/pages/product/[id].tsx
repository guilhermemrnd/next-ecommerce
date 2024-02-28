import styled from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct, Product } from "@/models/Product";

import Center from "@/componets/Center";
import Header from "@/componets/Header";
import Title from "@/componets/Title";
import ProductImages from "@/componets/ProductImages";
import Button from "@/componets/Button";
import CartIcon from "@/componets/icons/CartIcon";
import { useCart } from "@/contexts/CartContext";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;
const WhiteBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 32px;
  height: fit-content;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.5rem;
`;

export default function ProductPage({ product }: { product: IProduct }) {
  const { addProduct } = useCart();

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <Button onClick={() => addProduct(product._id)} primary>
                <CartIcon /> Add to cart
              </Button>
            </PriceRow>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}
