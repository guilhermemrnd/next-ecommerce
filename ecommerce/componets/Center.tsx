import { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

type CenterProps = {
  children: ReactNode;
};

export default function Center({ children }: CenterProps) {
  return <StyledDiv>{children}</StyledDiv>;
}
