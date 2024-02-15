import React, { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Layout(props: { children: ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-blue-900">
        <div className="w-full text-center">
          <button
            onClick={() => signIn("google")}
            className="rounded-lg bg-white p-2 px-4"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-blue-900">
      <Nav />
      <div className="mb-2 mr-2 mt-2 flex-grow rounded-lg bg-white p-4">
        {props.children}
      </div>
    </div>
  );
}
