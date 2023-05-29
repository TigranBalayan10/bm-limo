import React, { useState } from "react";
import { Link } from "react-router-dom";

const Quote = () => {
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-300 block w-full p-2.5";

  return (
    <div className="max-w-2xl mx-auto  bg-gray-800 rounded-2xl p-16 mt-7">
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-yellow-600"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className={inputClass}
              placeholder="John"
            />
          </div>
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-yellow-600"
            >
              Last name
            </label>
            <input
              type="text"
              id="first_name"
              className={inputClass}
              placeholder="Doe"
            />
          </div>
          <div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Quote;
