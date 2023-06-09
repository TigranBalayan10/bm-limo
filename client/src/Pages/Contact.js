import React from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import validationContact from "../Utils/ValidationContact";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomTextArea from "../Components/CustomTextArea";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../Utils/mutations";

const Contact = () => {
  const navigate = useNavigate();

  const [addContact] = useMutation(ADD_CONTACT);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationContact),
  });

  const onSubmit = async (data) => {
    try {
      const response = await addContact({
        variables: { ...data },
      });
      console.log(response);
      navigate(`/contact-success/${response.data.addContact._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

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
          <div className="flex flex-col gap-6">
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
            <CustomInput
              name="email"
              label={errors.email ? errors.email.message : "Email"}
              error={errors.email}
              control={control}
            />
            <div className="w-96">
              <CustomTextArea
                name="messageText"
                label={errors.message ? errors.messageText.message : "Message"}
                error={errors.message}
                control={control}
              />
            </div>
          </div>
        </CardBody>
        <div className="grid place-items-end mr-5">
          <Button
            type="submit"
            variant="filled"
            color="amber"
            className="mb-5 w-1/2"
          >
            SEND
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default Contact;
