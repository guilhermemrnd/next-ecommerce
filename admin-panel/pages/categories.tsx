import { ButtonHTMLAttributes, useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

import Layout from "@/components/Layout";
import { Category } from "./api/categories";

export function Categories({ swal }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(fetchCategories, []);

  function fetchCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }

  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<{
    _id: string;
  }>();

  async function saveCategory(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const category = { name, parent: parentCategory };

    if (!categoryBeingEdited) {
      await axios.post("/api/categories", category);
    } else {
      (category as Category)._id = categoryBeingEdited._id;
      await axios.put("/api/categories", category);
      setCategoryBeingEdited(undefined);
    }

    setName("");
    setParentCategory("");
    fetchCategories();
  }

  function deleteCategory(category: Category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want do delete "${category.name}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#D55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete(`/api/categories?id=${_id}`);
          fetchCategories();
        }
      });
  }

  return (
    <Layout>
      <h1 className="mb-2 text-xl font-bold text-blue-900">Categories</h1>
      <div className="w-1/2">
        <form onSubmit={saveCategory}>
          <label className="text-blue-900">
            {!categoryBeingEdited ? "New category name" : "Editing category"}
          </label>
          <div className="flex gap-1">
            <input
              className="w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-900"
              placeholder="Category name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <select
              className="w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-900"
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.currentTarget.value)}
            >
              <option value="">No parent category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <button className="rounded-md bg-blue-900 px-4 py-1 text-white">
              Save
            </button>
          </div>
        </form>

        <table className="mt-4 w-full">
          <thead>
            <tr>
              <td className="border border-blue-200 bg-blue-100 p-1">
                Category name
              </td>
              <td className="border border-blue-200 bg-blue-100 p-1">
                Parent category
              </td>
              <td className="border border-blue-200 bg-blue-100 p-1"></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td className="border border-blue-200 p-1">
                    {category.name}
                  </td>
                  <td className="border border-blue-200 p-1">
                    {(category?.parent as Category)?.name}
                  </td>
                  <td className="flex justify-center border border-blue-200 p-1">
                    <button
                      onClick={() => {
                        setName(category.name);
                        setParentCategory((category?.parent as Category)?._id);
                        setCategoryBeingEdited({ _id: category._id });
                      }}
                      className="mr-1 inline-flex gap-1 rounded-md bg-blue-900 px-2 py-1 text-sm text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="mr-1 inline-flex gap-1 rounded-md bg-blue-900 px-2 py-1 text-sm text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => {
  return <Categories swal={swal} />;
});