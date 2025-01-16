import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  let latestProducts = products.slice(0, 10);
  console.log(products);
  console.log(latestProducts);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          alias quod libero facere sapiente et quidem similique distinctio iure!
        </p>
      </div>
      {/*Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((prod, index) => {
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

export default LatestCollection;
