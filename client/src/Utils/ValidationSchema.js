import * as yup from "yup";

const validationSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateInfo: yup.string().required("Date is required"),
    time: yup.string().required("Time is required"),
    vehicleType: yup.string().required("Vehicle type is required"),
    hours: yup.number().nullable().required("Choose ride type or hours"),
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

export default validationSchema;
