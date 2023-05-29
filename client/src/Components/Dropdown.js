import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Vehicles from "../Assets/Data/Vehicles.json";
import { useState } from "react";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
  };
  const [selected, setSelected] = useState(null);
  const handleSelect = (vehicle) => {
    setSelected(vehicle);
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col w-full h-full rounded-lg">
      <label className="block mb-2 text-sm font-medium text-yellow-600">
        Vehicle Types
      </label>
      <button
        onClick={handleClick}

        className="bg-gray-50 p-2 w-full flex items-center justify-between rounded-lg border-2 border-transparent active:border-yellow-300 duration-300 active:text-yellow-300"
      >
        <span className="text-gray-900">
            {selected ? selected.name : "Select Type"}
        </span>

        {isOpen ? (
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            style={{ color: "#775803" }}
            rotation={180}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            style={{ color: "#775803" }}
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-20 flex flex-col items-start p-2 w-full bg-gray-50 rounded-lg shadow-lg">
          {Vehicles.map((vehicle, i) => (
            <div
              key={i}
              onClick={() => handleSelect(vehicle)}
              className="flex items-center justify-between p-2 border-b hover:bg-yellow-600 hover:w-full hover:rounded-lg cursor-pointer border-gray-200"
            >
              <span>{vehicle.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
