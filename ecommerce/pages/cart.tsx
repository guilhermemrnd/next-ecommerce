import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";

import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/models/Product";
import { CheckoutBodyDto } from "./api/checkout";

import Header from "@/componets/Header";
import Center from "@/componets/Center";
import Button from "@/componets/Button";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  margin: 40px 0;
  gap: 40px;
`;
const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 32px;
  height: fit-content;
`;
const StyledTable = styled.table`
  width: 100%;

  th {
    text-align: left;
    color: #aaa;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 600;
  }

  td {
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
const ImageThumb = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
  }
`;
const QuantityLabel = styled.span`
  padding: 0 0px;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function Cart() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useCart();

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data as IProduct[]);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const totalPrice = cartProducts.reduce((acc, productId) => {
    return acc + (products?.find((p) => p._id === productId)?.price || 0);
  }, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const goToPayment = async () => {
    const formData: CheckoutBodyDto = {
      productsIds: cartProducts, name, email,
      city, postalCode, address, country
    } // prettier-ignore

    const response = await axios.post("/api/checkout", { ...formData });
    if (response.data.url) window.location = response.data.url;
  };

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will e-mail you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {/* Displayed when no item is added to cart */}
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {/* Displayed when cart has items */}
            {cartProducts?.length > 0 && (
              <StyledTable>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => {
                    const quantity = cartProducts.filter((id) => id === product._id).length;

                    return (
                      <tr>
                        <td>
                          <ImageThumb>
                            <img src={product.images[0]} alt="" />
                          </ImageThumb>
                          {product.title}
                        </td>
                        <td>
                          <Button onClick={() => removeProduct(product._id)}>-</Button>
                          <QuantityLabel>{quantity}</QuantityLabel>
                          <Button onClick={() => addProduct(product._id)}>+</Button>
                        </td>
                        <td>${product.price * quantity}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${totalPrice}</td>
                  </tr>
                </tbody>
              </StyledTable>
            )}
          </Box>

          {!!cartProducts.length && (
            <Box>
              <h2>Order information</h2>
              <StyledInput
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <StyledInput
                type="text"
                placeholder="E-mail"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <StyledInput
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <StyledInput
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <StyledInput
                type="text"
                placeholder="Street Address"
                value={address}
                name="address"
                onChange={(ev) => setAddress(ev.target.value)}
              />
              <StyledInput
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <input type="hidden" value={cartProducts.join(",")} name="product" />
              <Button primary block onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
