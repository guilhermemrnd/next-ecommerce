import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "fdbg";

export default function App({
  Component, pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
