import * as yup from "yup";

const validationContact = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    messageText: yup.string().required("Massage is required"),
  })
  .required();

export default validationContact;
