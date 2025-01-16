import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.get(backendUrl + "/api/v1/orders", {
        headers: {
          "x-authorization": token,
        },
      });
      console.log(response);
      if (response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stateHandler = async (e, orderId) => {
    try {
      const response = await axios.patch(
        backendUrl + "/api/v1/orders/status",
        {
          orderId,
          status: e.target.value,
        },
        {
          headers: {
            "x-authorization": token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => {
          console.log(order);
          return (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700  "
              key={index}
            >
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, i) => {
                    if (i === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={i}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={i}>
                          {item.name} x {item.quantity}{" "}
                          <span>{item.size},</span>
                        </p>
                      );
                    }
                  })}
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment === true ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency} {order.amount}
              </p>
              <select
                value={order.status}
                onChange={(e) => {
                  stateHandler(e, order._id);
                }}
                className="p-2 font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Ship">Ship</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;