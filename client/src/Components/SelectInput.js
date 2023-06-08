import React from "react";
import { Controller } from "react-hook-form";
import { Select, Option } from "@material-tailwind/react";

const SelectInput = ({
  name,
  label,
  options,
  error,
  watchValue,
  control,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
        label={error ? error.message : label}
        error={error ? true : false}
          color="amber"
          {...field}
          className={`text-${
            watchValue === "Point to Point ONLY" ? "gray-400" : "gray-200"
          }`}
          disabled={watchValue === "Point to Point ONLY"}
          {...rest}
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      )}
    />
  );
};

export default SelectInput;
