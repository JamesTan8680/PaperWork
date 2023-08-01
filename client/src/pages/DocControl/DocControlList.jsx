import React from "react";
import "./DocControlList.scss";
import binIcon from "../../img/docControl/deletebin.svg";
import editIcon from "../../img/docControl/editIcon.svg";
import partiesIcon from "../../img/docControl/partiesIcon.svg";
import reviewIcon from "../../img/docControl/reviewIcon.svg";
import sendIcon from "../../img/docControl/sendIcon.svg";
import greysendIcon from "../../img/docControl/greysendIcon.svg";
import dropdownIcon from "../../img/docControl/dropdown.svg";

const DocControlList = ({ data, boldItemId }) => {
  return (
    <>
      <div class="docControlHeader">
        <h3>DATA CREATED</h3>
        <h3>DATA MODIFIED</h3>
        <h3>ISSUE DATE</h3>
        <h3>APPROVE STATUS</h3>
      </div>

      <div className="docControlWrapper">
        <div className="documentTitle">
          <p>Non Disclosure Document</p>
          <p className="docuementLatestVersion">Version 1.5</p>
          <p className="otherdocument">Other Versions</p>
          <img src={dropdownIcon} alt="DropDownIcon" className="dropdownicon" />
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
              <span className="additional_info">
                {[
                  "Version 1.4",
                  "Version 1.1",
                  "Version 1.2",
                  "Version 1.0",
                ].includes(item.id) ||
                ["Version 1.5", "Version 1.3"].includes(item.id) ? (
                  <span className="ready_circle">Ready</span>
                ) : null}
              </span>
              <span className="parties-icon">
                {(item.id === "Version 1.5" || item.id === "Version 1.3") && (
                  <img
                    src={partiesIcon}
                    alt="Parties Icon"
                    className="transpartiesicon"
                  />
                )}
              </span>

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

              <img src={reviewIcon} alt="Review Icon" className="reviewicon" />

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
          ))}
        </div>
      </div>
    </>
  );
};

export default DocControlList;
