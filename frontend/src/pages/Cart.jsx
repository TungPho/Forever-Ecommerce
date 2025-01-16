import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    // loop over the ids products in the cart
    for (const items in cartItems) {
      // loop over the sizes
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    // everytime remove or add something to the cart
    console.log(tempData);
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const foundProduct = products.find((p) => {
            return p._id === item._id;
          });

          return (
            <div
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              key={index}
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:2-20"
                  src={foundProduct.image[0]}
                  alt=""
                />
                <div>
                  <p>{foundProduct.name}</p>
                </div>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {foundProduct.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || Number(e.target.value) <= 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                defaultValue={item.quantity}
              />
              <img
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                }}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[850px]">
          <div className="w-full text-end">
            <div className="custom-2">
              <div className="text-start">
                <CartTotal />
              </div>
            </div>

            <button
              onClick={() => {
                navigate("place-order");
              }}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;