import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, currency, accessToken } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderDatas = async () => {
    try {
      if (!accessToken) return null;
      const response = await axios.get(backendUrl + "/api/v1/orders-user", {
        headers: {
          "x-authorization": accessToken,
        },
      });
      if (response.status === 200) {
        console.log("res2", response.data.result);
        let allOrdersItem = [];
        response.data.result.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadOrderDatas();
  }, [accessToken]);
  return (
    <div>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div>
          {orderData.slice(0, 4).map((item, index) => {
            return (
              <div
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                key={index}
              >
                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:2-20" src={item.image[0]} alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="text-start">
                      Date:
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="text-start">
                      Payment:
                      <span className="text-gray-400">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderDatas}
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
