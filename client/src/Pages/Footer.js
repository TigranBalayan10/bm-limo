import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="md:-mx-3 md:flex md:items-center md:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-800 dark:text-white md:mx-3 xl:text-4xl">
            Subscribe our newsletter to get update.
          </h1>

          <div className="mt-6 shrink-0 md:mx-3 md:mt-0 md:w-auto">
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm text-white duration-300 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              <span className="mx-2">Sign Up Now</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mx-2 h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Quick Link
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Who We Are
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Our Philosophy
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Industries
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Retail & E-Commerce
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Information Technology
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Finance & Insurance
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Services
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Translation
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Proofreading & Editing
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                Content Creation
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Contact Us
            </p>

            <div className="mt-5 flex flex-col items-start space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                +880 768 473 4978
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
              >
                info@merakiui.com
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a
            href="#"
            className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
          >
            Brand
          </a>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 sm:mt-0">
            © Copyright 2021. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
