import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSuitcase, faMinus } from "@fortawesome/free-solid-svg-icons";

const Sedancard = () => {
  return (
    <div className="flex items-center justify-center w-full mt-6">
      <div className="max-w-lg bg-gray-200 border border-white rounded-lg shadow-slate-200">
        <img
          className="rounded-t-lg"
          src={require("../Media/BMW.jpg")}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Luxury Sedans Fleet
          </h5>
          <div>
            <p className="font-normal text-gray-700">
              BMW 7-Series, Mercedes-Benz S-Class, Lexus LS
            </p>
            <div className="text-xl mb-2">
              <FontAwesomeIcon
                className="mr-2"
                icon={faUser}
                style={{ color: "#b38300" }}
              />
              4
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
              3
              <ul className="list-disc ml-5 text-sm">
                <li>New rear-seat entertainment system and Wi-Fi</li>
                <li>Black exterior</li>
                <li>Leather interior</li>
                <li>Large cargo space</li>
                <li>Individual climate control</li>
                <li>Complimentary bottled water</li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium rounded-lg border focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
          >
           Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sedancard;
