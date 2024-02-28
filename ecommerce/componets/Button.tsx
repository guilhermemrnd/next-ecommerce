import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css<Omit<ButtonProps, "children">>`
  border: 0;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${(props) => props?.bgColor || "white"};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => props?.color || "#000"};

  svg {
    height: 16px;
  }

  ${(props) =>
    props?.block &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props?.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props?.primary &&
    !props?.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}

  ${(props) =>
    props?.primary &&
    props?.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

  ${(props) =>
    props?.size === "lg" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;

      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button<Omit<ButtonProps, "children">>`
  ${ButtonStyle}
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  outline?: boolean;
  block?: boolean;
  bgColor?: string;
  color?: string;
  size?: "sm" | "lg";
};

export default function Button({ children, ...attrs }: ButtonProps) {
  return <StyledButton {...attrs}>{children}</StyledButton>;
}
