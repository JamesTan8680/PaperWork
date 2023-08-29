import React from "react";
import ReactDOM from "react-dom";
import "./GroupViewModal.scss";
import Check from "../../img/viewDoc/check.svg";

function GroupViewModal({ viewOpen, setViewOpen }) {
  //create the dummy data for the system
  const partiesData = [
    {
      id: "1",
      name: "ABC Pty Ltd",
    },
    {
      id: "2",
      name: "ABB Pty Ltd",
    },
    {
      id: "3",
      name: "ABCVS Pty Ltd",
    },
  ];

  const RecipientData = [
    {
      id: "1",
      email: "Thang@gmail.com",
      name: "Thang",
    },
    {
      id: "2",
      email: "Ching@gmail.com",
      name: "Ching",
    },
    {
      id: "3",
      email: "ABCVS@gmail.com",
      name: "ABCVS",
    },
    {
      id: "4",
      email: "AWS@gmail.com",
      name: "AWS",
    },
    {
      id: "5",
      email: "Paypal@gmail.com",
      name: "Paypal",
    },
  ];

  if (!viewOpen) return null;
  //create the close view modol
  const closeModal = () => {
    setViewOpen(false);
  };
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="contentModal">
        <h2>Parties</h2>
        <div className="parties-modal">
          {partiesData?.map((item) => {
            return (
              <div className="modal-party" key={item.id}>
                {item.name} <img src={Check} alt="" />
              </div>
            );
          })}
        </div>
        <h2>Recipient</h2>
        <div className="parties-modal">
          {RecipientData?.map((item) => {
            return (
              <div key={item.id}>
                {item.name} : {item.email}
              </div>
            );
          })}
        </div>
        <button className="close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default GroupViewModal;
