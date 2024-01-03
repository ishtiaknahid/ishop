import ProductCard from "../components/ProductCard"
import { useProduct } from "../contexts/ProductContext"

function FeaturedProducts() {
  const { products } = useProduct(); 
  
  return (
    <div className="mt-5">
    <p className="text-3xl text-center">Latest Products</p>
    <p className="text-sm text-center">Get Your Desired Product !</p>
    
    <div className="flex flex-wrap gap-10 my-5 justify-around">
    {
      products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))
    }
    </div>
    </div>
  )
}

export default FeaturedProducts