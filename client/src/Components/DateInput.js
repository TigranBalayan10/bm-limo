import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const DateInput = ({ name, control, error, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          selected={field.value}
          onChange={(date) => field.onChange(date)}
          minDate={new Date()}
          className={error ? "border-red-500 peer h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 text-sm font-normal text-gray-300 placeholder-red-500 focus:outline focus:border-amber-500" : "peer h-full w-full rounded-[7px] bg-transparent px-3 py-2.5 text-sm font-normal text-gray-300 placeholder-gray-400 focus:outline focus:border-amber-500"}
          dateFormat="MMMM d, yyyy"
          placeholderText={error ? error.message : "Select Date"}
          {...rest}
        />
      )}
    />
  );
};

export default DateInput;
