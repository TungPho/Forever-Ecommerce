import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full sm:w-[450px]">
      <div className="w-full my-20">
        <div className="text-2xl">
          <Title text1={"CART"} text2={"TOTALS"} />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency} {getCartAmount()}.00
            </p>
            <hr className="border" />
          </div>
          <div className="flex justify-between">
            <p>Shipping Fee:</p>
            <p>
              {currency}
              {delivery_fee}.00
            </p>
            <hr />
          </div>
          <div className="flex ">
            <b>Total</b>
            <b className="custom-1">
              {currency}
              {getCartAmount() === 0
                ? 0
                : getCartAmount() + Number(delivery_fee)}
              .00
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
