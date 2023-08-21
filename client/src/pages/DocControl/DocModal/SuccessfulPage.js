import React from "react";
import Check from "../../../img/docControl/check.svg";
import "./SuccessfulPage.scss";
import Cross from "../../../img/docControl/crossRed.svg";

function SuccessfulPage({ closeModal, open, result }) {
  if (!open) return null;
  return (
    <div>
      <div className="modal">
        <div className="overlay" onClick={closeModal}></div>
        <div className="content-doc">
          <div className="successful-message">
            <div>
              {result === "yes" ? (
                <img src={Check} alt="" />
              ) : (
                <img className="cross" src={Cross} alt="" />
              )}
            </div>
            {result === "yes" ? (
              <span>Document have already sent to recipient!</span>
            ) : (
              <span>Something went wrong, Please Contact support!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPage;
