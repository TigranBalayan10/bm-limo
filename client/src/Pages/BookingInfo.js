import React, { useState } from "react";
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
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../Utils/mutations";
import { Link } from "react-router-dom";

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
  const hours = [...Array(12).keys()];
  const [addNewOrder] = useMutation(ADD_ORDER);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
      console.log(response, "response");
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
      className="max-w-2xl mx-auto flex justify-center mb-5"
    >
      <Card className="p-2 mt-6 bg-gradient-to-r from-slate-900 to-slate-700">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-gray-300">
            Book a Ride
          </Typography>
          <div className="grid gap-6 lg:grid-cols-2">
            <Input
              variant="outlined"
              color="amber"
              label={
                errors.firstName ? errors.firstName?.message : "First Name"
              }
              error={errors.firstName ? true : false}
              className="text-gray-300"
              {...register("firstName")}
            />
            <Input
              variant="outlined"
              color="amber"
              label={errors.lastName ? errors.lastName?.message : "Last Name"}
              error={errors.lastName ? true : false}
              className="text-gray-300"
              {...register("lastName")}
            />
            <div>
              <Controller
                control={control}
                name="dateInfo"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
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
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <Select
                    label={errors.time ? errors.time?.message : "Time"}
                    error={errors.time ? true : false}
                    color="amber"
                    className="text-gray-200"
                    {...field}
                  >
                    {Time.timeIntervals.map((time, i) => (
                      <Option key={i} value={time}>
                        {time}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="vehicleType"
                render={({ field }) => (
                  <Select
                    label={
                      errors.vehicleType
                        ? errors.vehicleType?.message
                        : "Vehicle Type"
                    }
                    error={errors.vehicleType ? true : false}
                    color="amber"
                    className="text-gray-200"
                    {...field}
                  >
                    {Vehicle.map((vehicle, i) => (
                      <Option key={i} value={vehicle.name}>
                        {vehicle.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="hours"
                render={({ field }) => (
                  <Select
                    label="Hours"
                    color="amber"
                    className="text-gray-200"
                    {...field}
                  >
                    {hours.map((hour) => (
                      <Option key={hour} value={hour + 1}>
                        {hour + 1}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {isLoaded && (
              <Controller
                control={control}
                name="pickUpAddress"
                render={({ field }) => (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocomplete.addListener("place_changed", () => {
                        const place = autocomplete.getPlace();
                        field.onChange(place.formatted_address);
                      });
                    }}
                  >
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      variant="outlined"
                      color="amber"
                      label={
                        errors.pickUpAddress
                          ? errors.pickUpAddress?.message
                          : "Pick Up Address"
                      }
                      error={errors.pickUpAddress ? true : false}
                      className="text-gray-300"
                      {...register("pickUpAddress")}
                    />
                  </Autocomplete>
                )}
              />
            )}

            {isLoaded && (
              <Controller
                control={control}
                name="dropOffAddress"
                render={({ field }) => (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocomplete.addListener("place_changed", () => {
                        const place = autocomplete.getPlace();
                        field.onChange(place.formatted_address);
                      });
                    }}
                  >
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      variant="outlined"
                      color="amber"
                      label="Drop off Address"
                      className="text-gray-300"
                      {...register("dropOffAddress")}
                    />
                  </Autocomplete>
                )}
              />
            )}
            <Input
              variant="outlined"
              color="amber"
              label={errors.email ? errors.email?.message : "Email"}
              error={errors.email ? true : false}
              className="text-gray-300"
              {...register("email")}
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
        </CardBody>
        <div className="p-5">
          <Button
            type="submit"
            variant="contained"
            color="amber"
            className="w-full"
            disabled={!isFormValid}
          >
              {isFormValid ? <Link to="/confirmation/">Book</Link> : "Book"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
