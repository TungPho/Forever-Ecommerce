import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, accessToken, setAccessToken, navigate } =
    useContext(ShopContext);

  const onSubmitHanlder = async (e) => {
    e.preventDefault();
    try {
      //Sign Up
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/v1/register", {
          name,
          password,
          email,
        });
        console.log(response);
        if (response.status === 201) {
          setAccessToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          setName("");
          setEmail("");
          setPassword("");
          toast.success("Sign Up Success");
        }
        // Login
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          {
            email,
            password,
          }
        );
        if (response.status === 200) {
          setAccessToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setName("");
          setEmail("");
          setPassword("");
          toast.success("Login Success");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <div>
      <form
        onSubmit={onSubmitHanlder}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
        action=""
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={`w-full px-3 py-2 border border-gray-800 ${
            currentState === "Sign Up" ? "" : "hidden"
          }`}
          type="text"
          placeholder="Name"
          value={name}
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-800"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-800"
          type="password"
          placeholder="Password"
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password ? </p>
          {currentState === "Login" ? (
            <p
              onClick={() => {
                setCurrentState("Sign Up");
              }}
              className="cursor-pointer"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => {
                setCurrentState("Login");
              }}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
