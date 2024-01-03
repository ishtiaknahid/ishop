/* eslint-disable react/prop-types */
import Hero from "../sections/Hero";
import Categories from "../sections/Categories";
import FeaturedProducts from "../sections/FeaturedProducts";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </Layout>
  );
}
