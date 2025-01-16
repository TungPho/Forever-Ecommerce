import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);

  const toggleCategory = (e) => {
    // alredy choose the category (it's already in the array), remove it from the arr
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    // alredy choose the category (it's already in the array), remove it from the arr
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    // filter by categories
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((p) => category.includes(p.category));
    }
    // filter by sub-categories
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((p) =>
        subCategory.includes(p.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const applySorting = () => {
    let filteredProds = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filteredProds.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filteredProds.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // everytime category and subcategory updated
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    applySorting();
  }, [sortType]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*Filter Option */}
      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/*Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter === true ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="2-3"
                type="checkbox"
                value={"Men"}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="2-3"
                type="checkbox"
                value={"Woman"}
              />
              Woman
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleCategory}
                className="2-3"
                type="checkbox"
                value={"Kids"}
              />
              Kids
            </p>
          </div>
        </div>
        {/*Sub-Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter === true ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="2-3"
                type="checkbox"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="2-3"
                type="checkbox"
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                onChange={toggleSubCategory}
                className="2-3"
                type="checkbox"
                value={"Winterwear"}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/*Product sort */}
          <select
            onChange={(e) => {
              setSortType(e.target.value);
            }}
            className="border border-gray-300 text-sm px-2"
            name=""
            id=""
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((prod, index) => {
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
    </div>
  );
};

export default Collection;
