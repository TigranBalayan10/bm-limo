import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../Components/Dropdown";
import Address from "../Components/Address";

const Quote = () => {
  const [fromState, setFromState] = useState({
    firsName: "",
    lastName: "",
    dateTime: "",
    vehicleType: "",
    hours: "",
    passengerNumber: "",
    pickUpAddress: "",
    dropOffAddress: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFromState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(fromState);

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-300 block w-full p-2.5";
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="max-w-2xl mx-auto  bg-gray-800 rounded-2xl p-16 mt-7 mb-7">
      <h1 className="text-3xl font-bold text-yellow-600 mb-10 text-center">
        Book A Ride
      </h1>
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              First name
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              value={fromState.firstName}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="John"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              value={fromState.lastName}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="Doe"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
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
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              Hours
            </label>
            <select
              id="hours"
              name="hours"
              value={fromState.hours}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="">Hours</option>
              {[...Array(12).keys()].map((hour) => (
                <option value={hour}>{hour + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-600">
              Number of Passengers
            </label>
            <select
              id="passenger_number"
              name="passengerNumber"
              value={fromState.passengerNumber}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="">Passengers</option>
              {[...Array(7).keys()].map((passenger) => (
                <option value={passenger}>{passenger + 1}</option>
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
              name="email"
              value={fromState.email}
              onChange={handleInputChange}
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
              name="phoneNumber"
              value={fromState.phoneNumber}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="123-456-7890"
            />
          </div>
        </div>
        <Link
          to="/checkout"
          type="submit"
          className="w-full text-center py-2.5 px-5 mr-2 mb-2 mt-2 text-sm font-medium rounded-lg border focus:ring-gray-700 bg-white text-gray-800 border-gray-600 hover:text-yellow-300 hover:bg-gray-700"
        >
          Book Now
        </Link>
      </form>
    </div>
  );
};

export default Quote;
