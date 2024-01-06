import "../css/main.css";
import PropTypes from "prop-types";

export default function Step({ item }) {
  return (
    <>
      <div className="step-item">
        <div className="step-date">{item.date}</div>
        <div className="step-km">{item.km}</div>
        <div className="step-actions">
          <button
            className="step-button step-edit material-icons"
            type="button"
            title="Edit item"
            onClick={() => item.edit()}
          >
            edit
          </button>
          <button
            className="step-button step-delete material-icons"
            type="button"
            title="Delete item"
            onClick={() => item.remove()}
          >
            close
          </button>
        </div>
      </div>
    </>
  );
}

Step.propTypes = {
  item: PropTypes.object,
};
