import "../css/main.css";
import { useState, useRef } from "react";
import Step from "./Step";

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export default function Steps() {
  const [date, setDate] = useState(new Date().toDateInputValue());
  const [km, setKm] = useState(0);
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  return (
    <>
      <form
        className="steps"
        onSubmit={(e) => {
          e.preventDefault();
          let curItem = itemsRef.current.find((item) => item.date === date);
          if (curItem == null) {
            curItem = {
              date: date,
              km: parseFloat(km),
              remove: () => {
                itemsRef.current = itemsRef.current.filter(
                  (item) => item.date !== date
                );
                setItems(itemsRef.current);
              },
            };
            itemsRef.current = [itemsRef.current, curItem].flat();
            setItems(itemsRef.current);
          } else {
            curItem.km = Math.round((curItem.km + parseFloat(km)) * 10) / 10;
            itemsRef.current = [...itemsRef.current];
            setItems(itemsRef.current);
          }
          setDate('');
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
            {itemsRef.current.map((item) => (
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
