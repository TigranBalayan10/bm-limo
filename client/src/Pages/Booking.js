import React, { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "../Assets/Data/Time.json";
import Vehicle from "../Assets/Data/Vehicles.json";

const Booking = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const hours = [...Array(12).keys()];
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef("");
  const destinationRef = useRef("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const calculateRoute = (event) => {
    event.preventDefault();
    const origin = originRef.current.value;
    const destination = destinationRef.current.value;
    const directionsServiceOptions = {
      destination: destination,
      origin: origin,
      travelMode: "DRIVING",
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(directionsServiceOptions, (result, status) => {
      setDistance(result.routes[0].legs[0].distance.text);
      setDuration(result.routes[0].legs[0].duration.text);
    });
    console.log(distance);
    console.log(duration);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
  };
  const handleVehicleChange = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsOpen(false);
  };
  const handleHourChange = (hour) => {
    setSelectedHour(hour);
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={calculateRoute}
      className="max-w-2xl mx-auto flex justify-center"
    >
      <Card className="p-2 mt-6 bg-gradient-to-r from-slate-900 to-slate-700">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-gray-300">
            Book a Ride
          </Typography>
          <div className="grid gap-6 lg:grid-cols-2">
            <Input
              variant="outlined"
              color="amber"
              label="First Name"
              className="text-gray-300"
            />
            <Input
              variant="outlined"
              color="amber"
              label="Last Name"
              className="text-gray-300"
            />
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm font-normal text-gray-300 placeholder-gray-300 focus:outline focus:border-amber-500"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Date"
              />
            </div>

            <div>
              <Menu>
                <MenuHandler
                  variant="outlined"
                  label="Last Name"
                  className="text-gray-300 w-full "
                >
                  <Button
                    ripple={false}
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none  border-r-0 border border-blue-gray-200 bg-transparent pl-3"
                  >
                    {selectedTime ? selectedTime : "Select Time"}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[22rem]">
                  {Time.timeIntervals.map((time) => (
                    <MenuItem
                      key={time}
                      onClick={() => handleTimeChange(time)}
                      className="flex items-center justify-between px-3 py-2.5 text-sm font-normal text-gray-700 hover:bg-amber-900/50 rounded-lg"
                    >
                      <span>{time}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            <Menu>
              <MenuHandler
                variant="outlined"
                label="Last Name"
                className="text-gray-300 w-full "
              >
                <Button
                  ripple={false}
                  color="blue-gray"
                  className="flex h-10 items-center gap-2 rounded-r-none  border-r-0 border border-amber-300 bg-transparent pl-3"
                >
                  {selectedVehicle ? selectedVehicle : "Select Vehicle Type"}
                </Button>
              </MenuHandler>
              <MenuList className="max-h-[20rem] max-w-[22rem]">
                {Vehicle.map((vehicle, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleVehicleChange(vehicle.name)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-normal text-blue-gray-700 hover:bg-amber-900/50 rounded-lg"
                  >
                    <span>{vehicle.name}</span>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuHandler
                variant="outlined"
                label="Last Name"
                className="text-gray-300 w-full "
              >
                <Button
                  ripple={false}
                  color="blue-gray"
                  className="flex h-10 gap-2 rounded-r-none  border-r-0 border border-amber-300 bg-transparent pl-3"
                >
                  {selectedHour ? selectedHour : "hours"}
                </Button>
              </MenuHandler>
              <MenuList className="max-h-[20rem] max-w-[22rem]">
                {hours.map((hour, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleHourChange(hour + 1)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-normal text-blue-gray-700 hover:bg-amber-900/50 rounded-lg"
                  >
                    <span>{hour + 1}</span>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Autocomplete>
              <Input
                variant="outlined"
                color="amber"
                label="Pick up Address"
                className="text-gray-300"
                inputRef={originRef}
              />
            </Autocomplete>
            <Autocomplete>
              {selectedHour ? (
                <Input
                  disabled
                  variant="outlined"
                  color="amber"
                  label="As Directed"
                  className="text-gray-200 bg-gray-600"
                />
              ) : (
                <Input
                  variant="outlined"
                  color="amber"
                  label="Drop off Address"
                  className="text-gray-300"
                  inputRef={destinationRef}
                />
              )}
            </Autocomplete>
            <Input
              variant="outlined"
              color="amber"
              label="Email Address"
              className="text-gray-300"
            />
            <Input
              variant="outlined"
              color="amber"
              label="Phone Number"
              className="text-gray-300"
            />
          </div>
        </CardBody>
        <div className="p-5 ">
          <Button type="submit" fullWidth color="amber">
            BOOK
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default Booking;
