import React from "react";
import Filter from "../../img/home/filter.svg";
import "./RecentDoc.scss";
import Doc from "../../img/home/doc.svg";
function RecentDoc({ docData }) {
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
      {docData?.map((item) => {
        return (
          <div className="bottom-doc">
            <div className="doc-container">
              <div className="doc-title">
                <img src={Doc} alt="" />
                {/* <span>{item.title}</span> */}
                <span>{item.title}</span>
              </div>
              <div className="version-container">
                <div className="version-item">
                  {/* <span className="version">{item.version}</span>*/}
                  <span className="version">{item.version}</span>
                  {/* <span classNe="date">{item.date}</span> */}
                  <span className="date">{item.date_created}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RecentDoc;
