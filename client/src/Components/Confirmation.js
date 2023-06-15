import React from "react";
import { Button, Card } from "@material-tailwind/react";
import {
  faLocationPin,
  faUser,
  faClock,
  faCalendarDays,
  faCar,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link } from "react-router-dom";
import { QUERY_PRICE, QUERY_ORDER } from "../Utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_ORDER, DELETE_PRICE } from "../Utils/mutations";

export default function Confirmation() {
  const { orderId, priceId } = useParams();

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useQuery(QUERY_ORDER, {
    variables: { id: orderId },
  });

  const {
    data: priceData,
    loading: priceLoading,
    error: priceError,
  } = useQuery(QUERY_PRICE, {
    variables: { id: priceId },
  });

  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [deletePrice] = useMutation(DELETE_PRICE);

  if (orderLoading || priceLoading) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  if (orderError || priceError) {
    // Handle error state
    return <div>Error occurred while fetching data.</div>;
  }

  // Access order and price data
  const order = orderData?.getOrder;
  const price = priceData?.getPrice;
  const hourly = price?.priceTotal?.hourly;
  const mileage = price?.priceTotal?.mileage;

  const timelineData = [
    {
      icon: faLocationPin,
      color: "#036d05",
      content: order.pickUpAddress,
    },
    {
      icon: faLocationPin,
      color: "#bd0505",
      content: order.dropOffAddress ? order.dropOffAddress : "As Directed",
    },
    {
      icon: faUser,
      color: "#036d05",
      content: `${order.firstName} ${order.lastName}`,
    },
    {
      icon: faClock,
      color: "#036d05",
      content: order.time,
    },
    {
      icon: faCalendarDays,
      color: "#036d05",
      content: order.dateInfo.split(" ").slice(0, 4).join(" "),
    },
    {
      icon: faCar,
      color: "#036d05",
      content: order.vehicleType,
    },
    {
      icon: faEnvelope,
      color: "#036d05",
      content: order.email,
    },
    {
      icon: faPhone,
      color: "#036d05",
      content: order.phoneNumber,
    },
  ];

  const handleClick = async (editData) => {
    try {
      await deleteOrder({
        variables: { id: orderId },
      });
      await deletePrice({
        variables: { id: priceId },
      });
      console.log("deleted");
    } catch (err) {
      console.log(err, "Not deleted");
    }
  };

  return (
    <div className="flex justify-center items-center m-6">
      <Card className="max-w-md bg-gradient-to-l from-yellow-900 to-slate-950">
        <div className="px-6 py-8 border-b border-white/10 ">
          <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 text-lg text-gray-300 font-semibold leading-5 tracking-wide rounded-full">
              Price for your trip
            </span>
          </div>
          <div className="flex justify-center mt-4 text-gray-300 text-4xl font-extrabold leading-none">
            {hourly > 0 && (
              <span className="flex flex-col items-center">${hourly}*</span>
            )}
            {mileage > 0 && <span>${mileage}</span>}
          </div>
        </div>
        <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
          <ul className="grid gap-4">
            {timelineData.map((item, index) => (
              <li className="flex items-start" key={index}>
                <div className="flex-shrink-0">
                  <FontAwesomeIcon icon={item.icon} color={item.color} />
                </div>
                <p className="ml-3 text-sm leading-6 text-gray-300">
                  {item.content}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-row-reverse gap-2">
            <Link to={`/payment/${priceId}`}>
              <Button type="submit" variant="text" color="amber">
                CHECKOUT
              </Button>
            </Link>
            <Link
              to="/booking-info"
              state={{ editData: order }}
              onClick={() => handleClick(order)}
            >
              <Button variant="text" color="amber">
                EDIT
              </Button>
            </Link>
          </div>
          {hourly > 0 && (
            <p className="text-xs font-extralight mt-2 text-gray-400">
              {" "}
              * price for {order.hours} hours, please let driver know your drop
              off location(s) when in car or by text/phone upon arrival. We will
              email you driver information 6 hours before your pick up time.{" "}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
