import Link from "next/link";
import styled from "styled-components";

import { useCart } from "@/contexts/CartContext";
import Center from "./Center";
import BarsIcon from "./icons/BarsIcon";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #222;
  width: 100%;
`;
const Logo = styled(Link)`
  position: relative;
  z-index: 3;
  color: #fff;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  @media screen and (min-width: 768px) {
    padding: 20px 0;
  }
`;
const StyledNav = styled.nav<{ showNavLinks?: boolean }>`
  background-color: #222;
  position: fixed;
  display: ${(props) => (props?.showNavLinks ? "block" : "none")};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 70px 20px 20px;

  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    gap: 16px;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 8px 0;

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 3;
  width: 35px;
  height: 35px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useCart();
  const [showNavLinks, setShowNavLinks] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav showNavLinks={showNavLinks}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setShowNavLinks((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
