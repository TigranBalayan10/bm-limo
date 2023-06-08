import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { Autocomplete } from "@react-google-maps/api";

const AutocompleteInput = ({ label, name, control, error, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          onLoad={(autocomplete) => {
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              field.onChange(place.formatted_address);
            });
          }}
        >
          <Input
            value={field.value}
            onChange={field.onChange}
            variant="outlined"
            color="amber"
            label={error ? error.message : label}
            error={error ? true : false}
            className="text-gray-300"
            {...rest}
          />
        </Autocomplete>
      )}
    />
  );
};

export default AutocompleteInput;
