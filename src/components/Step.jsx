import "../css/main.css";
import PropTypes from 'prop-types';

export default function Step({ item }) {
  return (
    <>
      <div className="step-item">
        <div className="step-date">{item.date}</div>
        <div className="step-km">{item.km}</div>
        <div className="step-actions">
          <button className="step-edit"></button>
          <button className="step-delete"></button>
        </div>
      </div>
    </>
  );
}

Step.propTypes = {
  item: PropTypes.object,
}
