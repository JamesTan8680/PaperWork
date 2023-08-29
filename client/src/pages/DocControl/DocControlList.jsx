import React, { useState } from "react";
import "./DocControlList.scss";

import partiesIcon from "../../img/docControl/partiesIcon.svg";
import reviewIcon from "../../img/docControl/reviewIcon.svg";
import sendIcon from "../../img/docControl/sendIcon.svg";
import greysendIcon from "../../img/docControl/greysendIcon.svg";
import lockIcon from "../../img/docControl/lockIcon.png";
import DocModal from "./DocModal/DocModal";

const DocControlList = ({ data, boldItemId }) => {
  //using this state to manage the state for the DocModal
  const [show, setShow] = useState(false);
  //state for the title of the document
  const [title, setTitle] = useState("Non-disclosure Agreement");
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
          {data.map((item, index) => (
            <div key={index} className="table-row">
              <span className="item-id">
                <div className="wrap-item-id">{item.id}</div>

                <img src={lockIcon} alt="Lock" className="lockicon" />

                {/* Do a if else statement here when itis pending! the img src will be editIcon instead of lockIcon */}
                {/* Else the version will be lock, not able to edit */}
              </span>
              <span className="item-name">{item.date_created}</span>
              <span className="item_modified">{item.date_modified}</span>
              <span className="issued_date">{item.issue_date}</span>
              <div className="additional_info">
                <div className="status">Approved!</div>
                <div className="pro-bar">
                  <div className="progress"></div>
                </div>
              </div>

              <div className="icons">
                <span className="parties-icon">
                  {(item.id === "Version 1.5" || item.id === "Version 1.3") && (
                    <img
                      src={partiesIcon}
                      alt="Parties Icon"
                      className="transpartiesicon"
                    />
                  )}

                  {(item.id === "Version 1.4" ||
                    item.id === "Version 1.1" ||
                    item.id === "Version 1.2" ||
                    item.id === "Version 1.0") && (
                    <img
                      src={partiesIcon}
                      alt="Parties Icon "
                      className="partiesicon"
                    />
                  )}
                </span>

                <img
                  src={reviewIcon}
                  alt="Review Icon"
                  className="reviewicon"
                />

                <span className="send-icon">
                  {(item.id === "Version 1.5" || item.id === "Version 1.3") && (
                    <img
                      src={greysendIcon}
                      alt="Send Icon"
                      className="transsendicon"
                    />
                  )}

                  {(item.id === "Version 1.4" ||
                    item.id === "Version 1.1" ||
                    item.id === "Version 1.2" ||
                    item.id === "Version 1.0") && (
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
        </div>
      </div>
    </>
  );
};

export default DocControlList;
