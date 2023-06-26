import {
  Card,
  Button,
  Dialog,
  DialogFooter,
  CardBody,
} from "@material-tailwind/react";
import { GET_ORDERS } from "../Utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data, loading, error } = useQuery(GET_ORDERS);
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
      orderId: order._id,
      name: `${order.firstName} ${order.lastName}`,
      vehicleType: order.vehicleType,
      createdAt: order.createdAt,
    };
  });
  console.log(dashboard, "dashboard");
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-auto h-1/2 bg-gradient-to-l from-yellow-900 to-slate-950">
        <CardBody>
          <table className="table-auto text-gray-300">
            <thead className="text-gray-500">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Vehicle Type</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.map((order) => (
                <tr
                  key={order.orderId}
                  className="even:bg-gradient-to-l from-yellow-600 to-slate-800 even:rounded-md"
                >
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.vehicleType}</td>
                  <td className="px-4 py-2">{order.createdAt}</td>
                  <td className="px-4 py-2">
                    <Button onClick={handleOpen} variant="text" color="amber">
                      Details
                    </Button>
                    <Dialog
                      className="max-w- bg-gradient-to-l from-yellow-900 to-slate-950"
                      open={open}
                      handler={handleOpen}
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                      }}
                    >
                      <div className="flex justify-center items-center m-6">
                        <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                          <ul className="grid gap-4"></ul>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="amber"
                          onClick={handleClose}
                        >
                          <span>Confirm</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminDashboard;
