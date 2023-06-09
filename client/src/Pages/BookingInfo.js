import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Time from "../Assets/Data/Time.json";
import Vehicle from "../Assets/Data/Vehicles.json";
import { useJsApiLoader } from "@react-google-maps/api";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../Utils/mutations";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import AutocompleteInput from "../Components/AutocompleteInput";
import SelectInput from "../Components/SelectInput";
import DateInput from "../Components/DateInput";
import validationSchema from "../Utils/ValidationSchema";

const libraries = ["places"];

export default function BookingInfo() {
  const hours = [...Array(12).keys()].map((value) =>
    value === 0 ? "Point to Point ONLY" : value
  );
  const vehicleTypes = Vehicle.map((vehicle) => vehicle.name);
  const time = Time.timeIntervals.map((time) => time);
  const [addNewOrder] = useMutation(ADD_ORDER);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const watchHours = watch("hours");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const onSubmit = async (data) => {
    try {
      const response = await addNewOrder({
        variables: { ...data },
      });
      const priceId = response.data.addOrder.price._id;
      const orderId = response.data.addOrder._id;
      navigate(`/confirmation/${orderId}/${priceId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center mt-6"
    >
      <Card className="lg:max-w-[30rem] sm:max-w-[25rem] p-2 mt-6 bg-gradient-to-r from-slate-900 to-slate-700">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-gray-300">
            Book a Ride
          </Typography>
          <div className="grid gap-6 lg:grid-cols-2">
            <CustomInput
              name="firstName"
              label={errors.firstName ? errors.firstName.message : "First Name"}
              error={errors.firstName}
              control={control}
            />
            <CustomInput
              name="lastName"
              label={errors.lastName ? errors.lastName.message : "Last Name"}
              error={errors.lastName}
              control={control}
            />
            <div>
              <DateInput
                name="dateInfo"
                label={errors.dateInfo ? errors.dateInfo?.message : "Date"}
                error={errors.dateInfo}
                control={control}
              />
            </div>
            <div>
              <SelectInput
                name="time"
                label={errors.time ? errors.time?.message : "Time"}
                error={errors.time}
                options={time}
                control={control}
              />
            </div>
            <div>
              <SelectInput
                name="vehicleType"
                label={
                  errors.vehicleType
                    ? errors.vehicleType?.message
                    : "Vehicle Type"
                }
                error={errors.vehicleType}
                options={vehicleTypes}
                control={control}
              />
            </div>
            <div>
              <SelectInput
                name="hours"
                label={errors.hours ? errors.hours?.message : "Hours"}
                error={errors.hours}
                options={hours}
                watchValue={watchHours}
                control={control}
              />
            </div>
            {isLoaded && (
              <AutocompleteInput
                name="pickUpAddress"
                label={
                  errors.pickUpAddress
                    ? errors.pickUpAddress.message
                    : "Pick Up Address"
                }
                error={errors.pickUpAddress}
                control={control}
              />
            )}

            {isLoaded && (
              <AutocompleteInput
                name="dropOffAddress"
                disabled={watchHours > 0 ? true : false}
                label={watchHours > 0 ? "As Directed" : "Drop Off Address"}
                error={errors.dropOffAddress}
                control={control}
              />
            )}
            <CustomInput
              name="email"
              label={errors.email ? errors.email.message : "Email"}
              error={errors.email}
              control={control}
            />
            <CustomInput
              name="phoneNumber"
              label={
                errors.phoneNumber
                  ? errors.phoneNumber.message ||
                    errors.phoneNumber.typeError ||
                    "Phone"
                  : "Phone"
              }
              error={errors.phoneNumber}
              control={control}
            />
          </div>
        </CardBody>
        <div className="grid place-items-end mr-5">
          <Button
            type="submit"
            variant="filled"
            color="amber"
            className="mb-5 w-1/2"
          >
            CONFIRM
          </Button>
        </div>
      </Card>
    </form>
  );
}
