import { useParams } from "react-router-dom";
import Layout from "../../components/Layout"
import { useProduct } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard";

function SerachProducts() {
    const { searchkey } = useParams();
    
    const {products} = useProduct(); 

    const searchedProducts = products.filter(product => product.title.toLowerCase().includes(searchkey.toLowerCase()))

    
    // return value.title.toLowerCase().includes(searchWord.toLowerCase());
products.map(pro => console.log(pro.title))
console.log(products)
  return (
        <Layout>
          <div className="mt-5">
            <p className="text-3xl text-center">
              {`${searchkey.toUpperCase()}`} Products
            </p>
    
            <div className="flex flex-wrap gap-10 my-5">
            {console.log(searchedProducts)}
              {searchedProducts.length === 0 ? (<p className="text-2xl">No Such product.</p>) : (searchedProducts?.map((product) => (
                <ProductCard product={product} key={product.id} />
              )))}
            </div>
          </div>
        </Layout>
      
    )
}

export default SerachProducts