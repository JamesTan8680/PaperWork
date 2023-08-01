import React from "react";
import "./DocControlList.scss";
import binIcon from "../../img/docControl/deletebin.svg";
import editIcon from "../../img/docControl/editIcon.svg";
import partiesIcon from "../../img/docControl/partiesIcon.svg";
import reviewIcon from "../../img/docControl/reviewIcon.svg";
import sendIcon from "../../img/docControl/sendIcon.svg";
import greysendIcon from "../../img/docControl/greysendIcon.svg";

const DocControlList = ({ data, boldItemId }) => {
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
                {item.id}

                {(item.id === "Version 1.5" || item.id === "Version 1.3") && (
                  <img src={editIcon} alt="Edit Icon" className="editicon" />
                )}

                {(item.id === "Version 1.4" ||
                  item.id === "Version 1.1" ||
                  item.id === "Version 1.2" ||
                  item.id === "Version 1.0") && (
                  <img
                    src={editIcon}
                    alt="Edit Icon"
                    className="transediticon"
                  />
                )}

                <img src={binIcon} alt="Bin" className="binicon" />
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
                    <img src={sendIcon} alt="Send Icon " className="sendicon" />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocControlList;
