const calculatePrice = (order) => {
  const { price } = order;
  const { priceTotal } = price;
  const { hourly, mileage } = priceTotal;
  if (price.flatRate) {
    return price.flatRate.flatPrice;
  }
  const total = hourly > 0 ? hourly : mileage;
  return total;
};

module.exports = { calculatePrice };
