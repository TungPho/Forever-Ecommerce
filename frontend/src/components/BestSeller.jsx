import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestProdutcs = products
    .filter((p) => p.bestseller === true)
    .slice(0, 5);
  console.log(bestProdutcs);
  return (
    <div className="my-10">
      <div className="text-center text-3x1 py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rem
          voluptatem modi esse deserunt! Explicabo magni atque necessitatibus
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestProdutcs.map((prod, index) => {
          return (
            <ProductItem
              key={index}
              id={prod._id}
              image={prod.image}
              name={prod.name}
              price={prod.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
