import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Time from "../Assets/Data/Time.json";
import Vehicle from "../Assets/Data/Vehicles.json";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../Utils/mutations";
import { useNavigate, useLocation } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import SelectInput from "../Components/SelectInput";
import DateInput from "../Components/DateInput";
import validationFlatRate from "../Utils/ValidationFlatRate";
import FlatRateCities from "../Assets/Data/FlatRateCities.json";

export default function BookingInfo() {
  const flatPickUp = ["LAX"];
  const flatDropOff = FlatRateCities.cities.map((city) => city);
  const vehicleTypes = Vehicle.map((vehicle) => vehicle.name);
  const time = Time.timeIntervals.map((time) => time);
  const [addNewOrder] = useMutation(ADD_ORDER);
  const navigate = useNavigate();
  const location = useLocation();
  const editInput = location.state?.editData;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationFlatRate),
    defaultValues: {
      firstName: editInput?.firstName || "",
      lastName: editInput?.lastName || "",
      email: editInput?.email || "",
      phoneNumber: editInput?.phoneNumber || "",
      dateInfo: editInput?.dateInfo || "",
      time: editInput?.time || "",
      vehicleType: editInput?.vehicleType || "",
      pickUpAddress: editInput?.pickUpAddress || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await addNewOrder({
        variables: { ...data },
      });
      console.log(response);
      const orderId = response.data.addOrder._id;
      navigate(`/confirmation/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center"
    >
      <Card className="lg:max-w-[30rem] sm:max-w-[25rem] p-2 mt-1 bg-gradient-to-r from-slate-900 to-slate-700">
        <CardBody>
          <Typography variant="h5" className="mb-6 text-gray-300">
            Book a Ride
          </Typography>
          <div className="grid gap-6 lg:grid-cols-2">
            <CustomInput
              control={control}
              name="firstName"
              label={errors.firstName ? errors.firstName.message : "First Name"}
              error={errors.firstName}
              defaultValue={editInput?.firstName}
            />
            <CustomInput
              name="lastName"
              label={errors.lastName ? errors.lastName.message : "Last Name"}
              error={errors.lastName}
              control={control}
              defaultValue={editInput?.lastName}
            />
            <div>
              <DateInput
                name="dateInfo"
                label={errors.dateInfo ? errors.dateInfo?.message : "Date"}
                error={errors.dateInfo}
                control={control}
                defaultValue={editInput?.dateInfo}
              />
            </div>
            <div>
              <SelectInput
                name="time"
                label={errors.time ? errors.time?.message : "Time"}
                error={errors.time}
                options={time}
                control={control}
                defaultValue={editInput?.time}
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
                defaultValue={editInput?.vehicleType}
              />
            </div>
            <CustomInput
              control={control}
              name="flightNumber"
              label={
                errors.flightNumber
                  ? errors.flightNumber.message
                  : "Flight Number"
              }
              error={errors.flightNumber}
              // defaultValue={editInput?.firstName}
            />
            <div>
              <SelectInput
                name="pickUpAddress"
                label={
                  errors.pickUpAddress
                    ? errors.pickUpAddress?.message
                    : "Pick Up"
                }
                error={errors.pickUpAddress}
                options={flatPickUp}
                control={control}
              />
            </div>
            <div>
              <SelectInput
                name="dropOffAddress"
                label={
                  errors.dropOffAddress ? errors.dropOffAddress?.message : "Drop Off"
                }
                error={errors.dropOffAddress}
                options={flatDropOff}
                defaultValue={editInput?.flatDropOff}
                control={control}
              />
            </div>
            <CustomInput
              name="email"
              label={errors.email ? errors.email.message : "Email"}
              error={errors.email}
              control={control}
              defaultValue={editInput?.email}
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
              defaultValue={editInput?.phoneNumber}
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
            {editInput ? "Update" : "Book"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
