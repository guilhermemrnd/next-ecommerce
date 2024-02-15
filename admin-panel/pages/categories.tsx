import { useState } from "react";
import axios from "axios";

import Layout from "@/components/Layout";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveCategory(ev: React.FormEvent<HTMLFormElement>) {
    await axios.post("/api/categories", { name });
  }

  return (
    <Layout>
      <h1 className="mb-2 text-xl font-bold text-blue-900">Categories</h1>
      <form onSubmit={saveCategory}>
        <label className="text-blue-900">New category name</label>
        <div className="flex gap-1">
          <input
            className="w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-900"
            placeholder="Category name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <button className="rounded-md bg-blue-900 px-4 py-1 text-white">
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
