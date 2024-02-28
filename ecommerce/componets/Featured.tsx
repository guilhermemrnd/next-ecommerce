import styled from "styled-components";

import { IProduct } from "@/models/Product";
import { useCart } from "@/contexts/CartContext";

import Center from "./Center";
import ButtonLink from "./ButtonLink";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 20px 0 48px;

  @media screen and (min-width: 768px) {
  padding: 48px 0;
  }
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  div:nth-child(1) {
    order: 2;
  }

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;

    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.8rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Description = styled.p`
  font-size: 0.8rem;
  color: #aaa;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export default function Featured({ product }: { product: IProduct }) {
  const { addProduct } = useCart();

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Description>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa libero,
                scelerisque sed egestas eget, cursus in arcu. Pellentesque rhoncus varius pretium.
                Mauris nec condimentum odio. Phasellus a porta neque, eget congue velit.
              </Description>
              <ButtonsWrapper>
                <ButtonLink outline url={`/product/${product._id}`}>
                  Read more
                </ButtonLink>
                <Button onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
