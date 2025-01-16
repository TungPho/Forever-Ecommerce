import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            necessitati
          </p>
        </div>
        <div>
          <p className="text-x1 font-medium mb-5 text-start">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="text-start">Home</li>
            <li className="text-start">About Us</li>
            <li className="text-start">Delivery</li>
            <li className="text-start">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 text-start">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="text-start">+0364689251</li>
            <li className="text-start">ductungpho1005@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright</p>
      </div>
    </div>
  );
};

export default Footer;
