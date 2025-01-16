import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // add to cart
  const addToCart = async (itemId, size) => {
    if (size === "") {
      alert("PLease select the size");
      return;
    }
    let cartData = structuredClone(cartItems);
    // if already have product in the cart
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        // else create a new one in cart
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      // init a new object
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    // check if we're loged in or not
    if (accessToken) {
      try {
        const response = await axios.post(
          backendUrl + "/api/v1/cart",
          {
            itemId,
            size,
          },
          {
            headers: {
              "x-authorization": accessToken,
            },
          }
        );
        console.log(response);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((p) => p._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (accessToken) {
      try {
        const response = await axios.put(
          backendUrl + "/api/v1/cart",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              "x-authorization": accessToken,
            },
          }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async () => {
    console.log("Called");
    console.log(accessToken);
    if (accessToken) {
      try {
        const response = await axios.get(backendUrl + "/api/v1/cart", {
          headers: {
            "x-authorization": accessToken,
          },
        });
        if (response.status === 200) {
          setCartItems(response.data.metadata);
        }
        console.log("res", response);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // hàm fetch data từ server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/products");
      console.log(response);
      if (response.status === 200) {
        setProducts(response.data.metadata); // Cập nhật state với danh sách books
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Gọi fetchBooks khi component được render lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);
  //
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!accessToken && localStorage.getItem("token")) {
      setAccessToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getUserCart();
  }, [accessToken]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    accessToken,
    setAccessToken,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
ShopContextProvider.propTypes = {
  children: PropTypes.any,
};
export default ShopContextProvider;
