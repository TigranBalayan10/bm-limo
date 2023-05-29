import React, { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

export default function Address() {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute(event){
    event.preventDefault();
    const origin = originRef.current.value;
    const destination = destinationRef.current.value;
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDistance(result.routes[0].legs[0].distance.text);
        setDuration(result.routes[0].legs[0].duration.text);
      }
    });
    
  }
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-300 block w-full p-2.5";
  return (
    <>
      <div>
        <label
          for="first_name"
          className="block mb-2 text-sm font-medium text-yellow-600"
        >
          Pickup Address
        </label>
        <Autocomplete>
          <input type="text" className={inputClass} ref={originRef} />
        </Autocomplete>
      </div>
      <div>
        <label
          for="first_name"
          className="block mb-2 text-sm font-medium text-yellow-600"
        >
          Pickup Address
        </label>
        <Autocomplete>
          <input type="text" className={inputClass} ref={destinationRef} />
        </Autocomplete>
      </div>
        <button onClick={calculateRoute}>Calculate Route</button>
    </>
  );
}
