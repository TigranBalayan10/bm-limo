import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineIcon,
  Button,
} from "@material-tailwind/react";
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

const timelineData = [
  {
    icon: faLocationPin,
    color: "#036d05",
    title: "Pick up Address",
    content: "1906 Oceanside Blvd, Oceanside, CA 92054",
  },
  {
    icon: faLocationPin,
    color: "#bd0505",
    title: "Drop off Address",
    content: "1906 Oceanside Blvd, Oceanside, CA 92054",
  },
  {
    icon: faUser,
    color: "#036d05",
    title: "First and Last Name",
    content: "Tigran Balayan",
  },
  {
    icon: faClock,
    color: "#036d05",
    title: "Pick up Time",
    content: "12:00 PM",
  },
  {
    icon: faCalendarDays,
    color: "#036d05",
    title: "Pick up Date",
    content: "12/12/2021",
  },
  {
    icon: faCar,
    color: "#036d05",
    title: "Vehicle",
    content: "Sedan",
  },
  {
    icon: faEnvelope,
    color: "#036d05",
    title: "Email",
    content: "tiko@mail.com",
  },
  {
    icon: faPhone,
    color: "#036d05",
    title: "Phone Number",
    content: "123-456-7890",
  },
];

export default function Confirmation() {
  return (
    <div className="max-w-2xl mx-auto flex justify-center mb-5">
      <Card className="p-2 mt-6 bg-gradient-to-r from-slate-900 to-slate-700">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-gray-300">
            Booking Confirmation
          </Typography>
          <div className="w-full">
            <Timeline className="grid gap-6 lg:grid-cols-2">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} className="h-auto">
                  <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                    <TimelineIcon
                      className="p-3"
                      variant="ghost"
                      
                    >
                      <FontAwesomeIcon icon={item.icon} color={item.color} />
                    </TimelineIcon>
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-bold"
                      >
                        {item.title}
                      </Typography>
                      <Typography

                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {item.content}
                      </Typography>
                    </div>
                  </TimelineHeader>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </CardBody>
        <div className="p-5 gap-5 flex flex-row-reverse">
          <Button type="submit" size="lg" color="amber">
            CHECKOUT
          </Button>
          <Button size="lg" color="amber">
            EDIT
          </Button>
        </div>
      </Card>
    </div>
  );
}
