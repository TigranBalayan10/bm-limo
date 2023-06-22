import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { GET_ORDERS } from "../Utils/queries";
import { useQuery } from "@apollo/client";

const TABLE_HEAD = ["Name", "Date and Time", "Vehicle", "Order Date", "Status"];

const AdminDashboard = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  console.log(data);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }
    // const { name, dateInfo, time, vehicleType, createdAt } = data?.order;
    const orders = data?.order || [];
    const dashboard = orders.map((order) => {
        return {
            name: `${order.firstName} ${order.lastName}`,
            dateInfo:  order.dateInfo.split(" ").slice(0, 4).join(" ") + " " + order.time,
            vehicleType: order.vehicleType,
            createdAt: order.createdAt,
        };
    });
    console.log(dashboard, "dashboard");
  return (
    <Card className="overflow-scroll h-full w-screen">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dashboard.map(
            (dashData, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Link to="/admin/more-details">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal hover:underline"
                    >
                        {dashData.name}
                    </Typography>
                  </Link>
                </td>
                <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal hover:underline"
                    >
                        {dashData.dateInfo} 
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal hover:underline"
                    >
                        {dashData.vehicleType} 
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal hover:underline"
                    >
                        {dashData.createdAt} 
                    </Typography>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default AdminDashboard;
