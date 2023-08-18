import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calendar.scss";
import { generateDate, months } from "./Date";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import smileFace from "../../img/calendar/smile-face.svg";

export default function Calendar() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const formattedDay = selectDate.format("dddd"); //day of the week
  const formattedDate = selectDate.format("DD"); // date of the week

  return (
    <>
      {/* Left Side-Calendar */}
      <div className="calendar">
        <div className="calendar-date">
          <h2>{formattedDay}</h2>
          <div className="special">
            <h1>{formattedDate}</h1>
          </div>
          <h3>Keep smiling</h3>
          <img className="smile-icon" src={smileFace} alt="Smile Icon" />
        </div>
      </div>

      {/* <div>{today.month}</div> */}

      {/* Right Side-Calendar */}
      <div className="calendar-wrapper">
        <div className="calendar-container">
          <div className="calendar-header">
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="calendar-controls">
              <GrFormPrevious
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="control-item"
                onClick={() => {
                  setToday(currentDate);
                }}>
                Today
              </h1>
              <GrFormNext
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="calendar-grid">
            {days.map((day, index) => {
              return (
                <h1 key={index} className="calendar-day-label">
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="dates-grid">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      currentMonth ? "" : "not-in-current-month",
                      today ? "today" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "selected-date"
                        : "",
                      "date-cell"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}>
                    {date.date()}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
