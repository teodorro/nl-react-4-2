import "../css/main.css";
import { useState, useRef } from "react";
import Step from "./Step";

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  const date = local.toJSON().slice(0, 10).split("-");
  const val = `${date[2]}.${date[1]}.${date[0]}`;
  return val;
};

export default function Steps() {
  const [date, setDate] = useState("");
  const [km, setKm] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  return (
    <>
      <form
        className="steps"
        onSubmit={(e) => {
          e.preventDefault();
          let curItem = itemsRef.current.find((item) => item.date === convertDateMinus2Dot(date));
          if (curItem == null) {
            curItem = {
              date: convertDateMinus2Dot(date),
              km: parseFloat(km),
              remove: () => {
                itemsRef.current = itemsRef.current.filter(
                  (item) => item.date !== convertDateMinus2Dot(date)
                );
                setItems(itemsRef.current);
              },
              edit: () => {
                setDate(convertDateDot2Minus(curItem.date));
                setKm(curItem.km);
              },
            };
            itemsRef.current = [itemsRef.current, curItem].flat();
            setItems(itemsRef.current);
          } else {
            curItem.km = Math.round((curItem.km + parseFloat(km)) * 10) / 10;
            itemsRef.current = [...itemsRef.current];
            setItems(itemsRef.current);
          }
          setDate("");
          setKm(0);
        }}
      >
        <div className="steps-header">
          <div className="steps-header-date">
            <div className="steps-date-label">Дата</div>
            <input
              className="steps-date-input"
              type="date"
              // placeholder="ДД.ММ.ГГ"
              // pattern="[0-9]{2}.[0-9]{2}.[0-9]{2}"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>
          <div className="steps-header-km">
            <div className="steps-km-label">Пройдено, км</div>
            <input
              className="steps-km-input"
              type="number"
              value={km}
              min="0"
              max="9999"
              step="0.1"
              onChange={(e) => {
                setKm(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="steps-header-ok"
            type="submit"
            disabled={km === 0 || km === "0" || date === ""}
          >
            OK
          </button>
        </div>
        <div className="steps-table">
          <div className="steps-table-header">
            <div className="steps-table-date">Дата</div>
            <div className="steps-table-km">Пройдено, км</div>
            <div className="steps-table-actions">Действия</div>
          </div>
          <div className="steps-table-content">
            {itemsRef.current
              .sort((x, y) => compareDates(x.date, y.date))
              .map((item) => (
                <Step
                  item={item}
                  key={item.date}
                ></Step>
              ))}
          </div>
        </div>
      </form>
    </>
  );
}

function convertDateMinus2Dot(date) {
  const dateParts = date.split("-");
  return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
}

function convertDateDot2Minus(date) {
  const dateParts = date.split(".");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

function compareDates(date1, date2) {
  const dateParts1 = date1.split(".");
  const x = new Date(dateParts1[2], dateParts1[1], dateParts1[0]);
  const dateParts2 = date2.split(".");
  const y = new Date(dateParts2[2], dateParts2[1], dateParts2[0]);
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
}
