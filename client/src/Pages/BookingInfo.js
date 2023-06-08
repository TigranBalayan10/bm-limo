import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "../Assets/Data/Time.json";
import Vehicle from "../Assets/Data/Vehicles.json";
import * as yup from "yup";
import { useJsApiLoader } from "@react-google-maps/api";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../Utils/mutations";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import AutocompleteInput from "../Components/AutocompleteInput";
import SelectInput from "../Components/SelectInput";

const libraries = ["places"];

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateInfo: yup.string().required("Date is required"),
    time: yup.string().required("Time is required"),
    vehicleType: yup.string().required("Vehicle type is required"),
    hours: yup.number().nullable().default(null),
    pickUpAddress: yup.string().required("Pickup address is required"),
    dropOffAddress: yup.string(),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .typeError("Phone number must be a valid phone number"),
  })
  .required();

export default function BookingInfo() {
  const hours = [...Array(12).keys()].map((value) =>
    value === 0 ? "Point to Point ONLY" : value
  );
  const vehicleTypes = Vehicle.map((vehicle) => vehicle.name);
  const time = Time.timeIntervals.map((time) => time);
  const [addNewOrder] = useMutation(ADD_ORDER);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchHours = watch("hours");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addNewOrder({
        variables: { ...data },
      });
      const priceId = response.data.addOrder.price._id;
      const orderId = response.data.addOrder._id;
      console.log(response, "response");
      navigate(`/confirmation/${orderId}/${priceId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log(errors, "errors");
  const isFormValid = Object.keys(errors).length === 0;
  console.log(isFormValid, "isFormValid");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center mb-5"
    >
      <Card className="max-w-[30rem]  p-2 mt-6 bg-gradient-to-r from-slate-900 to-slate-700">
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
              <Controller
                control={control}
                name="dateInfo"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    className={
                      errors.dateInfo
                        ? "border-red-500 peer h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 text-sm font-normal text-gray-300 placeholder-red-500 focus:outline focus:border-amber-500"
                        : "peer h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 text-sm font-normal text-gray-300 placeholder-gray-400 focus:outline focus:border-amber-500"
                    }
                    dateFormat="MMMM d, yyyy"
                    placeholderText={
                      errors.dateInfo ? errors.dateInfo?.message : "Select Date"
                    }
                  />
                )}
              />
            </div>
            <div>
            <SelectInput
                name="time"
                label={errors.time ? errors.time?.message : "Hours"}
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
                {...register("pickUpAddress")}
              />
            )}

            {isLoaded && (
              <AutocompleteInput
                name="dropOffAddress"
                disabled={watchHours > 0 ? true : false}
                label={watchHours > 0 ? "As Directed" : "Drop Off Address"}
                error={errors.dropOffAddress}
                control={control}
                {...register("dropOffAddress")}
              />
            )}
            <CustomInput
              name="email"
              label={errors.email ? errors.email.message : "Email"}
              error={errors.email}
              control={control}
            />
            <Input
              variant="outlined"
              color="amber"
              label={
                errors.phoneNumber
                  ? errors.phoneNumber?.message
                  : errors.phoneNumber?.typeError
                  ? errors.phoneNumber?.typeError
                  : "Phone"
              }
              error={errors.phoneNumber ? true : false}
              className="text-gray-300"
              {...register("phoneNumber")}
            />
          </div>
          <div className="max-w-auto">
            <Button
              onClick={() => reset()}
              variant="filled"
              color="amber"
              fullWidth
              className="mt-4"
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="filled"
              color="amber"
              fullWidth
              disabled={!isFormValid}
              className="mt-2"
            >
              BOOK NOW
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
