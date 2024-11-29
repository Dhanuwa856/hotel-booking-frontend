import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import "./CategoryPage.css";
import axios from "axios";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);

  const apiURL = `${import.meta.env.VITE_API_URL}/categories/`;

  useEffect(() => {
    axios
      .get(apiURL)
      .then((res) => {
        setCategories(res.data);
        setCategoryIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching category:", err);
      });
  }, [categoryIsLoaded]);

  return (
    <>
      <NavBar />
      <div className="category-bg w-full h-[125px] bg-cover bg-center relative flex items-center justify-center">
        <div className="header-bg-filter w-full h-full absolute bg-[#469ad6] opacity-[50%] left-0 top-0"></div>
        <h1 className="text-4xl text-white z-10 font-bold whitespace-pre-line tracking-[.2rem] capitalize">
          Category
        </h1>
      </div>
      <div className="container mx-auto px-4 mt-5">
        <h2 className="text-4xl font-bold text-center text-[#021c2e] mb-2">
          Explore Our Room categories
        </h2>
      </div>
      <div className="container mt-10 mx-auto grid md:grid-cols-2 gap-4 ">
        {categories.map((category, idx) => (
          <div className="bg-gray-100 mt-10 pb-10 rounded-md" key={idx}>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[200px] object-cover object-center rounded-md"
            />
            <h2 className="mt-2 text-xl font-bold text-center font-mono text-gray-600 tracking-widest">
              {category.name}
            </h2>
            <p className="mt-2 mx-auto w-[90%] text-center text-base text-gray-400 ">
              {category.description}
            </p>
            <div className="mt-2 mx-auto flex items-center justify-center gap-3 text-gray-100 w-[90%] flex-wrap">
              {category.features.map((feature, i) => (
                <span
                  className="bg-[#FF6F61] p-2 rounded-md text-sm cursor-pointer text-nowrap"
                  key={i}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
