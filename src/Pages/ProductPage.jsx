import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireDB } from "../firebase/firebase";

export default function ProductPage() {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState();

  useEffect(() => {
    const getProductsByCate = async () => {
      const q = query(
        collection(fireDB, "products"),
        where("category", "==", `${category.toUpperCase()}`)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("It's empty.");
      }
      const categoryProducts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        categoryProducts.push({ ...doc.data(), id: doc.id });
      });
      setCategoryProducts(categoryProducts);
    };
    getProductsByCate();
  }, [category]);

  return (
    <Layout>
      <div className="mt-5">
        <p className="text-3xl text-center">
          {`${category.toUpperCase()}`} Products
        </p>
        <p className="text-sm text-center">
          Get Your Desired Product from {category} Porducts!
        </p>

        <div className="flex flex-wrap gap-10 my-5 justify-around">
          {categoryProducts?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
