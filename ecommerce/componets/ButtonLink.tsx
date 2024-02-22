import Link from "next/link";
import styled from "styled-components";

import { ButtonProps, ButtonStyle } from "./Button";

const StyledLink = styled(Link)<Omit<ButtonProps, "children">>`
  ${ButtonStyle}
`;

export default function ButtonLink({ children, url, ...attrs }: ButtonProps & { url: string }) {
  return (
    <StyledLink {...attrs} href={url}>
      {children}
    </StyledLink>
  );
}
