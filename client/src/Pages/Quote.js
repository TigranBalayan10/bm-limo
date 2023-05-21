import React, { useState } from "react";
import { Link } from "react-router-dom";

const Quote = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center">
      <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        User Information
      </h6>
      <div className="flex flex-wrap gird gap-6 mb-6 md:grid-cols-2 justify-center">
        <div>
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlfor="grid-password"
            >
              Username
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="lucky.jesse"
            />
        </div>
        <div>
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlfor="grid-password"
            >
              Username
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="lucky.jesse"
            />
        </div>
      </div>
    </div>
  );
};

export default Quote;
