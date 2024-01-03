import { categories } from "../constants";
import Category from "../components/Category";

export default function Categories() {
  return (
    <div className="mt-5">
      <p className="text-3xl text-center">Featured Categories</p>
      <p className="text-sm text-center">
        Get Your Desired Product from Featured Category!
      </p>

      <div className="flex  gap-10 flex-wrap justify-around mt-5">
        {categories.map((category) => (
          <Category key={category.label} category={category} />
        ))}
      </div>
    </div>
  );
}
