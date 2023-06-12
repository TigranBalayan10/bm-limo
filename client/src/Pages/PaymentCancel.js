import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center mb-5 mt-5">
    <Card className="max-w-md bg-gradient-to-l from-yellow-900 to-slate-950">
      <div className="flex flex-col justify-center items-center px-6 py-8 gap-3">
        <Typography color="white" variant="h5">
          Your ride has been cancelled.
        </Typography>
        <Typography color="white" variant="h8">
            Click OK to return to the home page.
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

export default PaymentCancel;
