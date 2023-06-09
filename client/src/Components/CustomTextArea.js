import { Textarea } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";

export default function CustomTextArea({
  label,
  name,
  control,
  error,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Textarea
          variant="outlined"
          label={error ? error.message : label}
          error={error ? true : false}
          className="text-gray-300"
          {...field}
          {...rest}
        />
      )}
    />
  );
}
