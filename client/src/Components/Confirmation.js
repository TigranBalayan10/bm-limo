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

const timelineData = [
  {
    icon: faLocationPin,
    color: "#036d05",
    content: "1906 Oceanside Blvd, Oceanside, CA 92054",
  },
  {
    icon: faLocationPin,
    color: "#bd0505",
    content: "1906 Oceanside Blvd, Oceanside, CA 92054",
  },
  {
    icon: faUser,
    color: "#036d05",
    content: "Tigran Balayan",
  },
  {
    icon: faClock,
    color: "#036d05",
    content: "12:00 PM",
  },
  {
    icon: faCalendarDays,
    color: "#036d05",
    content: "12/12/2021",
  },
  {
    icon: faCar,
    color: "#036d05",
    content: "Sedan",
  },
  {
    icon: faEnvelope,
    color: "#036d05",
    content: "tiko@mail.com",
  },
  {
    icon: faPhone,
    color: "#036d05",
    content: "123-456-7890",
  },
];

export default function Confirmation() {
  const { priceId, orderId } = useParams();
  console.log(priceId, orderId);
  
  return (
    <div className="max-w-xl mx-auto mt-5 mb-4 overflow-hidden rounded-lg shadow-lg bg-gradient-to-l from-yellow-900 to-slate-950">
      <div className="px-6 py-8 border-b border-white/10 ">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 text-lg text-gray-300 font-semibold leading-5 tracking-wide rounded-full">
            Price for your trip
          </span>
        </div>
        <div className="flex justify-center mt-4 text-gray-300 text-4xl font-extrabold leading-none">
          $10
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
