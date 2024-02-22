import { mongooseConnect } from "@/lib/mongoose";
import { IProduct, Product } from "@/models/Product";

import Header from "@/componets/Header";
import Featured from "@/componets/Featured";
import NewProducts from "@/componets/NewProducts";
import { CartContextProvider } from "@/contexts/CartContext";

type HomeProps = {
  featuredProduct: IProduct;
  newProducts: IProduct[];
};

export default function Home({ featuredProduct, newProducts }: HomeProps) {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Featured product={featuredProduct} />
        <NewProducts products={newProducts} />
      </CartContextProvider>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductId = "65d0811fe1e510bd3ac123dc";
  const featuredProduct = await Product.findOne({ _id: featuredProductId });
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
