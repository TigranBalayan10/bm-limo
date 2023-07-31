require("dotenv").config();
const axios = require("axios");
const dateFormat = require("../utils/dateFormat");

async function fetchFlightData(flightNumber) {
  const flightApiKey = process.env.RAPID_API_FLIGHT_KEY;
  const options = {
    method: "GET",
    url: "https://flightera-flight-data.p.rapidapi.com/flight/info",
    params: { flnr: flightNumber },
    headers: {
      "X-RapidAPI-Key": flightApiKey,
      "X-RapidAPI-Host": "flightera-flight-data.p.rapidapi.com",
    },
  };


  try {
    const response = await axios.request(options);
    const flightData = response.data[0];
    const flightInfo = {
      departureAirport: flightData.departure_iata,
      scheduledArrivalTime: dateFormat(flightData.scheduled_arrival_local),
      actualArrivalTime:
        flightData.actual_arrival_local === null
          ? null
          : dateFormat(flightData.actual_arrival_local),
      arrivalAirport: flightData.arrival_iata,
      arrivalTerminal: flightData.arrival_terminal,
    };
    return flightInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}
module.exports = { fetchFlightData };
