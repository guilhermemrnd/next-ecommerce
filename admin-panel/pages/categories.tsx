import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import axios from "axios";

import Layout from "@/components/Layout";
import { Category, CategoryProp } from "./api/categories";

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
  const [properties, setProperties] = useState<CategoryProp[]>([]);

  const [categoryBeingEdited, setCategoryBeingEdited] = useState<{
    _id: string;
  }>();

  async function saveCategory(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const category = {
      name,
      parent: parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: (p.values as string).split(","),
      })),
    };

    if (!categoryBeingEdited) {
      await axios.post("/api/categories", category);
    } else {
      (category as Category)._id = categoryBeingEdited._id;
      await axios.put("/api/categories", category);
      setCategoryBeingEdited(undefined);
    }

    setName("");
    setParentCategory("");
    setProperties([]);
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
      <h1 className="mb-4 text-xl font-bold text-gray-800">Categories</h1>
      <div className="w-full lg:w-2/3">
        <form onSubmit={saveCategory}>
          <label className="text-gray-600">
            {!categoryBeingEdited ? "New category name" : "Editing category"}
          </label>
          <div className="mb-2 flex gap-1">
            <input
              className="w-full rounded-sm border border-gray-200 px-2 py-1 outline-blue-900"
              placeholder="Category name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

            <select
              className="w-full rounded-sm border border-gray-200 px-2 py-1 outline-blue-900"
              value={parentCategory}
              onChange={(ev) => setParentCategory(ev.target.value)}
            >
              <option value="">No parent category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <button className="rounded-sm bg-primary px-4 py-1 text-white">Save</button>
            {categoryBeingEdited && (
              <button
                className="rounded-sm bg-gray-500 px-4 py-1 text-white"
                type="button"
                onClick={() => {
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                  setCategoryBeingEdited(undefined);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <div className="mb-2">
            <label className="text-gray-600">Properties</label>
            <button
              type="button"
              onClick={() => {
                setProperties((prev) => {
                  return [...prev, { name: "", values: "" }];
                });
              }}
              className="ml-2 rounded-sm text-[12px] leading-[16px] text-blue-500 underline"
            >
              Add new property
            </button>

            {properties.length > 0 &&
              properties.map((prop, index) => (
                <div className="mt-1 flex gap-1">
                  <input
                    className="w-full rounded-sm border border-gray-200 px-2 py-1 outline-blue-900 placeholder:text-sm"
                    type="text"
                    value={prop.name}
                    onChange={(ev) => {
                      setProperties((prev) => {
                        const properties = [...prev];
                        properties[index].name = ev.target.value;
                        return properties;
                      });
                    }}
                    placeholder="property name (i.e: color)"
                  />
                  <input
                    className="w-full rounded-sm border border-gray-200 px-2 py-1 outline-blue-900 placeholder:text-sm"
                    type="text"
                    value={prop.values}
                    onChange={(ev) => {
                      setProperties((prev) => {
                        const properties = [...prev];
                        properties[index].values = ev.target.value;
                        return properties;
                      });
                    }}
                    placeholder="values, comma separated"
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    title="remove property"
                    onClick={() => {
                      setProperties((prev) => {
                        return [...prev].filter((prop, pIndex) => {
                          return pIndex !== index;
                        });
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </form>

        {categories.length > 0 && (
          <table className="mt-4 w-full bg-white shadow-md">
            <thead>
              <tr>
                <td className="border-b border-gray-200 px-4 py-1 text-sm font-medium uppercase text-gray-600">
                  Category name
                </td>
                <td className="border-b border-gray-200 px-4 py-1 text-sm font-medium uppercase text-gray-600">
                  Parent category
                </td>
                <td className="border-b border-gray-200 px-4 py-1 text-sm font-medium uppercase text-gray-600"></td>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-4 py-1">{category.name}</td>
                    <td className="px-4 py-1">{(category?.parent as Category)?.name}</td>
                    <td className="flex justify-center px-4 py-1">
                      <button
                        onClick={() => {
                          setName(category.name);
                          setParentCategory((category?.parent as Category)?._id);
                          setProperties(
                            category?.properties?.map((p) => {
                              return {
                                name: p.name,
                                values: (p.values as string[]).join(","),
                              };
                            }) ?? []
                          );
                          setCategoryBeingEdited({ _id: category._id });
                        }}
                        className="mr-1 inline-flex items-center gap-1 rounded-sm px-2 py-1 text-sm text-primary"
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
                        <span className="hidden md:block">Edit</span>
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="mr-1 inline-flex items-center gap-1 rounded-sm px-2 py-1 text-sm text-red-500"
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
                        <span className="hidden md:block">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => {
  return <Categories swal={swal} />;
});
