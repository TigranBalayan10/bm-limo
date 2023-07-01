import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import validationLogin from "../Utils/validationLogin";
import { useNavigate } from "react-router";
import auth from "../Utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLogin),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/admin-dashboard");
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center mt-10"
    >
      <Card className="w-96 bg-gradient-to-r from-slate-900 to-slate-700 ">
        <CardHeader
          variant="gradient"
          color="amber"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label={errors.username ? errors.username.message : "Username"}
            name="username"
            className="text-gray-200"
            size="lg"
            color="amber"
            {...register("username")}
            error={errors.username ? errors.username.message : null}
          />
          <Input
            label={errors.password ? errors.password.message : "Password"}
            name="password"
            className="text-gray-200"
            color="amber"
            size="lg"
            type="password"
            {...register("password")}
            error={errors.password ? errors.password.message : null}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" color="amber" fullWidth>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
