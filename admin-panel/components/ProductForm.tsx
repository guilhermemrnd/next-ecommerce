import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";

import { Product } from "@/pages/api/products";
import { Category, CategoryProp } from "@/pages/api/categories";
import Spinner from "./Spinner";

export default function ProductForm(props: Partial<Product>) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const [title, setTitle] = useState(props.title ?? "");
  const [category, setCategory] = useState(props.category ?? "");
  const [productProps, setProductProps] = useState<Record<string, string>>(props.properties ?? {});
  const [description, setDescription] = useState(props.description ?? "");
  const [price, setPrice] = useState(props.price ?? "");
  const [images, setImages] = useState(props.images ?? []);

  const [isUploading, setIsUploading] = useState(false);

  async function createProduct(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = {
      title,
      category,
      properties: productProps,
      description,
      price,
      images,
    };

    if (props._id) {
      await axios.put(`/api/products`, { ...data, _id: props._id });
    } else {
      await axios.post("/api/products", data);
    }

    router.push("/products");
  }

  async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function uploadImagesOrder(args: unknown) {
    setImages(args as string[]);
  }

  const propertiesToFill = [] as CategoryProp[];
  if (categories.length > 0 && category) {
    let categoryInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...categoryInfo?.properties!);
    while ((categoryInfo?.parent as Category)?._id) {
      const parentInfo = categories.find(
        ({ _id }) => _id === (categoryInfo?.parent as Category)._id
      );
      propertiesToFill.push(...parentInfo?.properties!);
      categoryInfo = parentInfo;
    }
  }

  return (
    <form className="w-1/2" onSubmit={createProduct}>
      <label className="text-blue-900">Product name</label>
      <input
        className="mb-2 w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-blue-900"
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        autoFocus
      />

      <label className="text-blue-900">Category</label>
      <select
        className="mb-2 w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-blue-900"
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-x-3 gap-y-2">
          {propertiesToFill.map((p) => (
            <div>
              <label className="text-blue-900">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </label>
              <select
                className="w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-blue-900"
                value={productProps[p.name]}
                onChange={(ev) => {
                  setProductProps((prev) => {
                    return { ...prev, [p.name]: ev.target.value };
                  });
                }}
              >
                {(p.values as string[]).map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <label className="text-blue-900">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length && (
          <ReactSortable
            className="flex flex-wrap gap-2"
            list={images as any}
            setList={uploadImagesOrder}
          >
            {images.map((link) => (
              <div key={link} className="h-24 rounded-lg">
                <img src={link} alt="" className="max-h-full" />
              </div>
            ))}
          </ReactSortable>
        )}

        {isUploading && (
          <div className="flex h-24 w-20 items-center justify-center border bg-gray-100">
            <Spinner />
          </div>
        )}

        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-gray-100 text-sm text-gray-500">
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
        {!props?.images?.length && <div>No photos in this product</div>}
      </div>

      <label className="text-blue-900">Description</label>
      <textarea
        className="mb-2 w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-blue-900"
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>

      <label className="text-blue-900">Price (in USD)</label>
      <input
        className="mb-2 w-full rounded-md border-2 border-gray-300 px-2 py-1 outline-blue-900"
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(parseFloat(ev.target.value))}
      />

      <button
        type="submit"
        className="mt-2 rounded-md bg-blue-900 px-4 py-1 text-white"
      >
        Save
      </button>
    </form>
  );
}
