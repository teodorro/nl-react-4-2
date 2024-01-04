import "../css/main.css";

export default function Steps() {
  return (
    <>
      <div className="steps">
        <div className="steps-header">
          <div className="steps-header-date">
            <div className="steps-date-label"></div>
            <div className="steps-date-input"></div>
          </div>
          <div className="steps-header-km">
            <div className="steps-km-label"></div>
            <div className="steps-km-input"></div>
          </div>
          <button type="submit"></button>
        </div>
        <div className="steps-table">
          <div className="steps-table-header">
            <div className="steps-table-date"></div>
            <div className="steps-table-km"></div>
            <div className="steps-table-actions"></div>
          </div>
          <div className="steps-table-content"></div>
        </div>
      </div>
    </>
  );
}
