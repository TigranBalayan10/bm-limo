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
        onChange={(e) => field.onChange(e) && console.log(e)}
        onBlur={(e) => field.onBlur(e)}
        className={`text-${
          watchValue === "Point to Point ONLY" ? "gray-400" : "gray-200"
        }`}
        disabled={watchValue === "Point to Point ONLY"}
        {...field}
        >
          {options.map((option, index) => {

            return (
              <Option
                key={index+option}
                value={option.toString()}
              >
                {option}
              </Option>
            )
          })}
        </Select>
      )}
    />
  );
};

export default SelectInput;
