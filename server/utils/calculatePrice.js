const calculatePrice = (order) => {
  const { price } = order;
  const { priceTotal } = price;
  const { hourly, mileage } = priceTotal;
  const total = hourly > 0 ? hourly : mileage;
  return total;
};

module.exports = { calculatePrice };
