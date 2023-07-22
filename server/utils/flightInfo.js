const axios = require("axios");
require("dotenv").config();


const fetchFlightData = async (flightNumber) => {
    const options = {
      method: "GET",
      url: "https://flight-radar1.p.rapidapi.com/flights/get-more-info",
      params: {
        query: flightNumber,
        fetchBy: "flight",
        page: "1",
        limit: "1",
      },
      headers: {
        "X-RapidAPI-Key": "a108ee00d9msh29d47d8346fdb43p1e7e89jsn1452d1cb54f5",
        "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
      },
    };
  try {
    const response = await axios.request(options);
    const departureTime =
      response.data.result.response.data[0].time.scheduled.departure;
    const arrivalTime =
      response.data.result.response.data[0].time.scheduled.arrival;
    const departureAirport =
      response.data.result.response.data[0].airport.origin.code.iata;
    const arrivalAirport =
      response.data.result.response.data[0].airport.destination.code.iata;
    const flightStatus = response.data.result.response.data[0].status.text;

    const flightData = {
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
      flightStatus,
    };
    console.log(flightData);
  } catch (error) {
    console.error(error);
  }
}

fetchFlightData("UA1488");

module.exports = { fetchFlightData };
