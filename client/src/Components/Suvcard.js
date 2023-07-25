import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSuitcase, faMinus } from "@fortawesome/free-solid-svg-icons";

const Suvcard = () => {
  return (
    <div className="flex items-center justify-center w-full mt-6">
      <div className="max-w-lg bg-gray-200 border border-white rounded-lg shadow-slate-200 mr-6 ml-6">
        <img
          className="rounded-t-lg"
          src={require("../Media/cadillac-escalade.jpg")}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Luxury SUV Fleet
          </h5>
          <div>
            <p className="font-normal text-gray-700">
              Cadillac Escalade, Chevrolet Suburban, GMC Yukon XL
            </p>
            <div className="text-xl mb-2">
              <FontAwesomeIcon
                className="mr-2"
                icon={faUser}
                style={{ color: "#b38300" }}
              />
              7
              <FontAwesomeIcon
                className="ml-2"
                icon={faMinus}
                rotation={90}
                style={{ color: "#b38300" }}
              />
              <FontAwesomeIcon
                className="ml-2 mr-2"
                icon={faSuitcase}
                style={{ color: "#b38300" }}
              />
              6
              <ul className="list-disc ml-5 text-sm">
                <li>New rear-seat entertainment system and Wi-Fi</li>
                <li>Black exterior</li>
                <li>Leather interior</li>
                <li>Tri-zone climate control</li>
                <li>
                  Executive right rear seat with added recline angle and power
                  calf rest
                </li>
                <li>Complimentary bottled water</li>
              </ul>
            </div>
          </div>
          <Link
            to="/booking-info"
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium rounded-lg border focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Suvcard;
