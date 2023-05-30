import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../Components/Dropdown";
import Address from "../Components/Address";

const Quote = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePassengersChange = (event) => {
    setPassengers(event.target.value);
  };

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-300 block w-full p-2.5";
  const [startDate, setStartDate] = useState(new Date());
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
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-yellow-600"
            >
              Pickup Date and Time
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className={inputClass}
            />
          </div>
          <Dropdown />
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-yellow-600"
            >
              Hours
            </label>
            {}
            <select
              className={inputClass}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Hours</option>
              {[...Array(12).keys()].map((hour) => (
                <option value={hour}>{hour + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-yellow-600"
            >
              Number of Passengers
            </label>
            {}
            <select
              className={inputClass}
              value={passengers}
              onChange={handlePassengersChange}
            >
              <option value="">Passengers</option>
              {[...Array(7).keys()].map((hour) => (
                <option value={hour}>{hour + 1}</option>
              ))}
            </select>
          </div>
          <Address />
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              Email
            </label>
            <input
              type="email"
              id="email_address"
              className={inputClass}
              placeholder="example@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              Phone Number
            </label>
            <input
              type="Phone Number"
              id="phone_number"
              className={inputClass}
              placeholder="123-456-7890"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Quote;
