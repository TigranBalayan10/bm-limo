import { Card, Button, CardBody } from "@material-tailwind/react";
import { GET_ORDERS, QUERY_PRICE } from "../Utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Modal } from "../Components/Modal";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [priceId, setPriceId] = useState("");
  const { data, loading, error } = useQuery(GET_ORDERS);
  const {
    data: priceData,
    loading: priceDataLoading,
    error: priceDataError,
  } = useQuery(QUERY_PRICE, {
    variables: { id: priceId },
    skip: !priceId, // Skip the query if is null
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred while fetching data.</div>;
  }
  const orders = data?.order || [];
  const dashboard = orders.map((order) => {
    return {
      priceId: order.price?._id,
      name: `${order.firstName} ${order.lastName}`,
      pickUpAddress: order.pickUpAddress,
      dropOffAddress: order.dropOffAddress,
      vehicleType: order.vehicleType,
      dateInfo: order.dateInfo.split(" ").slice(0, 4).join(" "),
      time: order.time,
      phoneNumber: order.phoneNumber,
      createdAt: order.createdAt,
    };
  });

  const handleOpen = (priceId) => {
    setPriceId(priceId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (priceDataLoading) {
    return <div>Loading...</div>;
  }
  if (priceDataError) {
    return <div>Error occurred while fetching data.</div>;
  }

  // deconstruct getPrice from priceData without getting error undefined
  const { getPrice } = priceData || {};
  const { firstName, lastName, email, hours, distance, duration, vehicleType } =
    getPrice || {};
  const { priceTotal } = getPrice || {};
  const { hourly, mileage } = priceTotal || {};

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-auto h-1/2 bg-gradient-to-l from-yellow-900 to-slate-950">
        <CardBody>
          <table className="table-auto text-gray-300">
            <thead className="text-gray-400">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Vehicle Type</th>
                <th className="px-4 py-2">Pick Up</th>
                <th className="px-4 py-2">Drop Off</th>
                <th className="px-4 py-2">Pick Up Date</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.map((order) => (
                <tr
                  key={order.orderId}
                  className="even:bg-gradient-to-l from-yellow-600 to-slate-800 even:rounded-md text-md italic"
                >
                  <td className="px-4 py-2 not-italic">
                    {order.name}
                    <p className="text-sm text-gray-400 italic">{order.phoneNumber}</p>
                  </td>
                  <td className="px-4 py-2">{order.vehicleType}</td>
                  <td className="px-4 py-2">{order.pickUpAddress}</td>
                  <td className="px-4 py-2">{order.dropOffAddress}</td>
                  <td className="px-4 py-2">
                    {order.dateInfo} {order.time}
                  </td>
                  <td className="px-4 py-2">{order.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button
                      onClick={() => handleOpen(order.priceId)}
                      variant="text"
                      color="amber"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {priceData && (
        <Modal
          isOpen={open}
          onClose={handleClose}
          modalData={
            <ul className="grid gap-4 text-gray-400">
              <li key="1">
                Name: {firstName} {lastName}
              </li>
              <li key="2">Email: {email}</li>
              {hours > 0 && <li key="3">Hours: {hours}</li>}
              {distance != 0 && <li key="4">Distance: {distance}</li>}
              {duration != 0 && <li key="5">Duration: {duration}</li>}
              <li key="6">Vehicle Type: {vehicleType}</li>
              {hourly > 0 && <li key="7">Hourly Price: ${hourly}</li>}
              {mileage > 0 && <li key="8">Mileage Price: ${mileage}</li>}
            </ul>
          }
        />
      )}
    </div>
  );
};

export default AdminDashboard;
