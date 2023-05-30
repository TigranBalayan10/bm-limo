distance = "13.2 mil"
duration = "30 mins"

distance.split(" ")[0]
const distanceInt = Number(distance.split(" ")[0]);
console.log(distanceInt);
const durationInt = Number(duration.split(" ")[0]);
console.log(durationInt);




function calculatePriceDistance(distance, duration) {
  const basePrice = 15;
  const pricePerMile = 4;
  const pricePerMinute = 1;
  const price = basePrice + pricePerMile * distance + pricePerMinute * duration;
  return price;
}

function calculateHourlySuv(hours) {
  const pricePerHourSUV = 100;
  if (hours < 3) {
    const price = (pricePerHourSUV + pricePerHourSUV / 5) * hours;
    return price;
  } else {
    const price = pricePerHourSUV * hours;
    return price;
  }
}
function calculateHourlyLux(hours) {
  const pricePerHourSUV = 80;
  if (hours < 3) {
    const price = (pricePerHourSUV + pricePerHourSUV / 5) * hours;
    return price;
  } else {
    const price = pricePerHourSUV * hours;
    return price;
  }
}
function calculateHourlyPremium(hours) {
  const pricePerHourSUV = 60;
  if (hours < 3) {
    const price = (pricePerHourSUV + pricePerHourSUV / 5) * hours;
    return price;
  } else {
    const price = pricePerHourSUV * hours;
    return price;
  }
}

console.log(calculatePriceDistance(distanceInt, durationInt));

export { calculatePriceDistance, calculateHourlySuv, calculateHourlyLux, calculateHourlyPremium };
