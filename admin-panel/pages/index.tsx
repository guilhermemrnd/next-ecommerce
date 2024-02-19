import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex gap-1 overflow-hidden rounded-lg bg-gray-300 text-black">
          <img src={session?.user?.image ?? ""} alt="" className="h-6 w-6" />
          <span className="px-2 font-medium">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
