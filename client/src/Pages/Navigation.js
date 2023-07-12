import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import auth from "../Utils/auth";

const navigation = [
  { name: "Home", path: "/", current: false },
  { name: "Cars", path: "/fleet", current: false },
  { name: "Book a Ride", path: "/booking-info", current: false },
  { name: "About Us", path: "/about", current: false },
];

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-16">
      {navigation.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>
            <Typography
              children={item.name}
              color="amber"
              className="font-normal transition-colors hover:text-yellow-600 focus:text-yellow-600"
            >
              {item.name}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Navbar
      className="bg-transparent border-none"
      fullWidth
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-200">
        <Link to="/">
          <img
            className="h-8 w-auto lg:block"
            src={require("../Media/Logo.svg").default}
            alt="Beverly Motors LLC"
          />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        {auth.loggedIn ? (
          <Button
            variant="gradient"
            onClick={() => auth.logout()}
            size="sm"
            className="hidden lg:inline-block"
            color="amber"
          >
            <span>Logout</span>
          </Button>
        ) : null}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              style={{ color: "#e5b32a" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              size="2xl"
              style={{ color: "#e5b32a" }}
            />
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto py-2">
          {navList}
          {auth.loggedIn ? (
            <Button
              variant="gradient"
              onClick={() => auth.logout()}
              size="sm"
              color="amber"
              fullWidth
              className="mb-2"
            >
              <span>Logout</span>
            </Button>
          ) : null}
        </div>
      </MobileNav>
    </Navbar>
  );
}
