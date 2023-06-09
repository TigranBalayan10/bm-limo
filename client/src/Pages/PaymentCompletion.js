import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PaymentCompletion = () => {
  return (
    <div className="flex justify-center items-center m-6">
    <Card className="max-w-md bg-gradient-to-l from-yellow-900 to-slate-950">
      <div className="items-center px-6 py-8 text-center">
        <Typography color="white" variant="h5">
          Thank you for booking a service with us!
        </Typography>
        <Typography color="white" variant="h6" className="mt-3">
            We will email your receipt shortly.
        </Typography>
      </div>
      <Link to="/">
        <div className="grid place-items-center mr-5">
          <Button variant="filled" color="amber" className="mb-5 w-1/2">
            OK
          </Button>
        </div>
      </Link>
    </Card>
  </div>
  );
};

export default PaymentCompletion;
