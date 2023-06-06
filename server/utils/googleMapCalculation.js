require("dotenv").config();
const axios = require("axios");

const calculateRoute = async (pickUpAddress, dropOffAddress) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const origin = encodeURIComponent(pickUpAddress);
  const destination = encodeURIComponent(dropOffAddress);
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&mode=driving&units=imperial`;

  try {
    const response = await axios.get(url);
    const route = response.data.routes[0];
    const leg = route.legs[0];
    const distance = leg.distance.text;
    const duration = leg.duration.text;
    return { distance, duration };
  } catch (error) {
    console.error("Error calling Google Maps API:", error);
    throw new Error(
      "Failed to retrieve route information from Google Maps API"
    );
  }
};

module.exports = { calculateRoute };
