import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import "fdbg";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

  body {
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
    background-color: #f0f0f0;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
