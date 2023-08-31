import React, { useState } from "react";
import "./DocControlList.scss";

import partiesIcon from "../../img/docControl/partiesIcon.svg";
import reviewIcon from "../../img/docControl/reviewIcon.svg";
import sendIcon from "../../img/docControl/sendIcon.svg";
import greysendIcon from "../../img/docControl/greysendIcon.svg";
import lockIcon from "../../img/docControl/lockIcon.png";
import editIcon from "../../img/home/editIcon2.svg";
import DocModal from "./DocModal/DocModal";
import { Link } from "react-router-dom";
import GroupViewModal from "../../components/GroupViewModal/GroupViewModal";

const DocControlList = ({ data }) => {
  // Initialize progress property for each item in the data
  const updatedData = data.map((item) => ({
    ...item,
    progress: 0,
  }));

  //using this state to manage the state for the DocModal
  const [show, setShow] = useState(false);

  const totalParties = 5; //Assume Total Parties is 5
  // state to manage THE groupviewModal to open or close
  const [viewOpen, setViewOpen] = useState(false);
  // Set the state to hold the data with the progress property
  const [dataWithProgress, setDataWithProgress] = useState(updatedData);

  const handleSignDocument = (itemId) => {
    const updatedData = dataWithProgress.map((item) => {
      //Create new array map over the old one
      if (item.id === itemId && item.progress < totalParties) {
        return {
          ...item,
          progress: item.progress + 1,
        };
      }
      return item; //Else return the item as-is
    });

    setDataWithProgress(updatedData); //Update the state with modified progress values
  };

  //state for the title of the document
  const [title] = useState("Non-disclosure Agreement");
  return (
    <>
      <div className="docControlHeader">
        <h3>DATA CREATED</h3>
        <h3>DATA MODIFIED</h3>
        <h3>ISSUE DATE</h3>
      </div>

      <div className="docControlWrapper">
        <div className="documentTitle">
          <p>Non Disclosure Document</p>
          <p className="docuementLatestVersion">Version 1.5</p>
          <p className="otherdocument">Other Versions</p>
        </div>
      </div>

      <div className="docControlList">
        <div className="table">
          {dataWithProgress.map((item, index) => (
            <div key={index} className="table-row">
              <span className="item-id">
                <div className="wrap-item-id">{item.id}</div>

                {/* Do a if else statement here when itis pending! the img src will be editIcon instead of lockIcon
                Else the version will be lock, not able to edit */}

                {item.progress < totalParties ? (
                  <Link to={"/editDoc/:id"}>
                    <img src={editIcon} alt="edit" className="editicon" />
                  </Link>
                ) : (
                  <img src={lockIcon} alt="Lock" className="lockicon" />
                )}
              </span>
              <span className="item-name">{item.date_created}</span>
              <span className="item_modified">{item.date_modified}</span>
              <span className="issued_date">{item.issue_date}</span>
              <div className="additional_info">
                <div className="status">
                  {item.progress < totalParties ? "Pending!" : "Approved!"}
                </div>
                <div className="pro-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(item.progress / totalParties) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {item.progress < totalParties && (
                <button onClick={() => handleSignDocument(item.id)}>
                  Sign Document
                </button>
              )}

              <div className="icons">
                {/* Not matter parties approve or not we still need to view the parties info */}
                <span className="parties-icon">
                  {item.id && (
                    <img
                      src={partiesIcon}
                      alt="Parties Icon "
                      className="partiesicon"
                      onClick={() => {
                        setViewOpen((prev) => !prev);
                      }}
                    />
                  )}
                </span>
                <Link to="/ReviewDoc">
                  <img
                    src={reviewIcon}
                    alt="Review Icon"
                    className="reviewicon"
                  />
                </Link>

                <span className="send-icon">
                  {item.progress < totalParties ? (
                    <img
                      src={greysendIcon}
                      alt="Send Icon"
                      className="transsendicon"
                    />
                  ) : (
                    <img
                      src={sendIcon}
                      alt="Send Icon "
                      className="sendicon"
                      onClick={() => setShow((s) => !s)}
                    />
                  )}
                </span>
              </div>
            </div>
          ))}
          <DocModal show={show} setShow={setShow} title={title} />
          <GroupViewModal viewOpen={viewOpen} setViewOpen={setViewOpen} />
        </div>
      </div>
    </>
  );
};

export default DocControlList;
