import React from "react";
import Check from "../../../img/docControl/check.svg";
import "./SuccessfulPage.scss";
function SuccessfulPage({ closeModal, open }) {
  if (!open) return null;
  return (
    <div>
      <div className="modal">
        <div className="overlay" onClick={closeModal}></div>
        <div className="content-doc">
          <div className="successful-message">
            <div>
              <img src={Check} alt="" />
            </div>
            <span>Document have already sent to recipient!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPage;
