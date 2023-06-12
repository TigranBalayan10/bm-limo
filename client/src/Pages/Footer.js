import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const textFooter = [
  { text: "Contact Us", link: "/contact" },
  { text: "About Us", link: "/about" },
  { text: "FAQ", link: "/payment-success" },
  { text: "Terms", link: "/payment" },
  { text: "Privacy", link: "/payment-cancel" },
  { text: "License", link: "/License" },
];

const Footer = () => {
  return (
    <footer className="w-full p-5 mt-10 bg-gradient-to-br from-black to to-yellow-900">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between sm:justify-center">
        <Link to="/">
          <img
            className="hidden h-10 w-auto lg:block"
            src={require("../Media/Logo.svg").default}
            alt="Beverly Motors LLC"
          />
        </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          {textFooter.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>
                <Typography
                  children={item.text}
                  color="amber"
                  className="font-normal transition-colors hover:text-yellow-600 focus:text-yellow-600"
                >
                  {item.text}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-4 border-amber-50" />
      <Typography color="amber" className="text-center font-normal">
        &copy; Beverly Motors LLC. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
