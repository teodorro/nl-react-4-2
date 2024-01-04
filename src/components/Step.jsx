import "../css/main.css";

export default function Step({ id }) {
  return (
    <>
      <div className="step-item">
        <div className="step-date"></div>
        <div className="step-km"></div>
        <div className="step-actions">
          <button className="step-edit"></button>
          <button className="step-delete"></button>
        </div>
      </div>
    </>
  );
}
