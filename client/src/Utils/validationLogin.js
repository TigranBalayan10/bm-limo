import * as yup from "yup";

const validationLogin = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default validationLogin;
