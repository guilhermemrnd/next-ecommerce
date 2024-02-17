import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex h-screen w-screen items-center">
      <div className="w-full text-center">
        <h1 className="mb-3 text-5xl text-red-800">Unauthorized</h1>
        <span className="text-lg">
          You don't have access to this resource...
        </span>
        <Link className="block mt-1 text-blue-500 underline" href="/">
          Go back to home page
        </Link>
      </div>
    </div>
  );
}
