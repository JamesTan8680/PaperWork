import React from "react";
import ReactDOM from "react-dom";
import "./GroupViewModal.scss";
import Check from "../../img/viewDoc/check.svg";
import {useState, useEffect} from 'react';
import axios from "axios"; //


function GroupViewModal({ viewOpen, setViewOpen, docId }) {
  const [partiesData, setPartiesData] = useState([]);
  const [recipientData, setRecipientData] = useState([]);

  useEffect(() => {
    if (!viewOpen) return;
  
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint for parties
        const partiesResponse = await axios.get(`http://localhost:8800/view-document/parties/${docId}`);
        // Assuming the response.data contains the parties data
        if (partiesResponse.data) {
          setPartiesData(partiesResponse.data);
        } else {
          setPartiesData(null); 
        }
  
        // Fetch data from the API endpoint for recipients
        const recipientsResponse = await axios.get(`http://localhost:8800/view-document/receipients/${docId}`);
        if (recipientsResponse.data) {
          setRecipientData(recipientsResponse.data);
        } else {
          setRecipientData(null); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRecipientData(null);
      }
    };
  
    fetchData();
  }, [viewOpen, docId]);
  
  

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
              <div className="modal-party" key={item.parties_id}>
                {item.parties_name} <img src={Check} alt="" />
              </div>
            );
          })}
        </div>
        <h2>Recipient</h2>
        <div className="parties-modal">
          {recipientData?.map((item) => {
            return (
              <div key={item.identity_id}>
                {item.firstname} : {item.email}
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
