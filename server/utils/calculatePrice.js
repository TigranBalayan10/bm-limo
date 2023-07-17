const calculatePrice = (order) => {
  const { price } = order;
  const { priceTotal } = price;
  const { flatRate } = price;
  const { flatPrice } = flatRate;
  const { hourly, mileage } = priceTotal;
  if (flatPrice > 0) {
    return flatPrice;
  }
  const total = hourly > 0 ? hourly : mileage;
  return total;
};

module.exports = { calculatePrice };
