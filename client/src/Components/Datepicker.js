import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        showYearDropdown
        scrollableMonthYearDropdown
      />
    </div>
  );
}

export default DateComponent;