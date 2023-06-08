import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";

const CustomInput = ({ label, name, control, reset, error, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          variant="outlined"
          color="amber"
          label={error ? error.message : label}
          error={error ? true : false}
          className="text-gray-300"
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export default CustomInput;
