import ReactDOM from "react-dom";
import "./SuccessfulPage.scss";
import successfulTick from "../../img/customizeDoc/circle_tick.svg";
import { Link } from "react-router-dom";

function SuccessfulPage({ closeModal }) {
  return ReactDOM.createPortal(
    <div className="success-overlay" onClick={closeModal}>
      <img src={successfulTick} alt="" />
      <div className="success-modal">
        <h2>Success</h2>
        <p>Congratulations on your added success </p>
        <span className="wrap-button">
          <Link to="/createDoc">
            <button>Create New Doc</button>
          </Link>
          <Link to="/">
            <button className="modal-button">Home</button>
          </Link>
        </span>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default SuccessfulPage;
