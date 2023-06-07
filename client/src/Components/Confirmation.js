import React from "react";
import { Button } from "@material-tailwind/react";
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
import { useParams } from "react-router-dom";
import { QUERY_PRICE, QUERY_ORDER } from "../Utils/queries";
import { useQuery } from '@apollo/client';



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
      content: order.dropOffAddress,
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
      content: order.dateInfo,
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

  return (
    <div className="max-w-xl mx-auto mt-5 mb-4 overflow-hidden rounded-lg shadow-lg bg-gradient-to-l from-yellow-900 to-slate-950">
      <div className="px-6 py-8 border-b border-white/10 ">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 text-lg text-gray-300 font-semibold leading-5 tracking-wide rounded-full">
            Price for your trip
          </span>
        </div>
        <div className="flex justify-center mt-4 text-gray-300 text-4xl font-extrabold leading-none">
          {hourly > 0 && <span>${hourly}</span>}
          {mileage > 0 && <span>${mileage}</span>}
        </div>
      </div>
      <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
        <ul className="grid gap-4 lg:grid-cols-2">
          {timelineData.map((item, index) => (
            <li className="flex items-start" id={index}>
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
          <Button type="submit" variant="text" color="amber">
            Confirm
          </Button>
          <Button type="submit" variant="text" color="amber">
            EDIT
          </Button>
        </div>
      </div>
    </div>
  );
}
