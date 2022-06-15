import { Input, styled } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerStyle = styled("div")(({ theme }) => ({
  "& .react-datepicker-popper": {
    paddingTop: "20px",
  },
  "& .react-datepicker": {
    padding: "10px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    borderColor: theme.palette.border[0],
  },
  "& .react-datepicker__current-month, & .react-datepicker-time__header": {
    fontSize: 18,
    fontWeight: 700,
    color: theme.palette.neutral[600],
    textTransform: "capitalize",
  },
  "& .react-datepicker__triangle": {
    display: "none",
  },
  "& .react-datepicker__header--custom, & .react-datepicker__header--time": {
    background: theme.palette.neutral[0],
    borderBottom: 0,
  },
  "& .react-datepicker__navigation": {
    top: 10,
  },
  "& .react-datepicker__day-name": {
    color: theme.palette.neutral[500],
    fontWeight: 500,
    fontSize: 14,
  },
  "& .react-datepicker__day-name, & .react-datepicker__day, & .react-datepicker__time-name":
    {
      margin: "5px",
    },
  "& .react-datepicker__day": {
    color: theme.palette.neutral[800],
  },
  "& .react-datepicker__day--selected, & .react-datepicker__day:hover, & .react-datepicker__day--keyboard-selected":
    {
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.neutral[0],
    },
  "& .react-datepicker__time-container": {
    borderLeftColor: theme.palette.border[0],
  },
  "& .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected":
    {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.neutral[0],
    },
}));

const CustomDatePicker = ({ id, onDateChange, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePickerStyle>
      <DatePicker
        id={id}
        {...props}
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          console.log(date);
          onDateChange(date.toISOString());
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        timeCaption="time"
        dateFormat="dd/MM/yyyy HH:mm"
        customInput={<Input fullWidth />}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--previous"
              }
              onClick={decreaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                }
              >
                {"<"}
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              onClick={increaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                }
              >
                {">"}
              </span>
            </button>
          </div>
        )}
      />
    </DatePickerStyle>
  );
};

export default CustomDatePicker;
