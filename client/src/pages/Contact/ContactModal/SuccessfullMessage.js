import React from "react";
import "./SuccessfullMessage.scss";
import Letter from "../../../img/contact/letter.svg";
import { Link } from "react-router-dom";
function SuccessfullMessage() {
  return (
    <div className="message-content">
      <div className="modal-success">
        <img src={Letter} alt="" />
        <span>
          <b>Thank you, enjoy!</b>
        </span>
        <span>
          Your quote has been received and is being reviewed by our support{" "}
        </span>
        <span>staff. You will receive the email with 5 business days.</span>
        <Link to="/">
          <button className="home-btn">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessfullMessage;
