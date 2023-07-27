import React from "react";
import Filter from "../../img/home/filter.svg";
import "./RecentDoc.scss";
import Doc from "../../img/home/doc.svg";
function RecentDoc() {
  return (
    <>
      <div className="top-doc">
        <div className="doc-title">
          <span>DOCUMENT TITLE</span>
          <img src={Filter} alt="" />
        </div>
        <div className="doc-detail">
          <span>VERSION</span>
          <span>DATE CREATED</span>
        </div>
      </div>
      <div className="bottom-doc">
        <div className="doc-container">
          <div className="doc-title">
            <img src={Doc} alt="" />
            <span>NON-DISCLOSURE AGREEMENT</span>
          </div>
          <div className="doc-title">
            <img src={Doc} alt="" />
            <span>SECURITY POLICY</span>
          </div>
          <div className="doc-title">
            <img src={Doc} alt="" />
            <span>DRUG AND ALCOHOL CONTRACT</span>
          </div>
        </div>
        <div className="version-container">
          <div className="version-item">
            <span className="version">1.0</span>
            <span className="date">12/12/23</span>
          </div>
          <div className="version-item">
            <span className="version">1.0</span>
            <span className="date">12/12/23</span>
          </div>
          <div className="version-item">
            <span className="version">1.0</span>
            <span className="date">12/12/23</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentDoc;
