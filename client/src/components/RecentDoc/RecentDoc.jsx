import React from "react";
import Filter from "../../img/home/filter.svg";
import "./RecentDoc.scss";
import Doc from "../../img/home/doc.svg";
function RecentDoc() {
  const data = [
    {
      title: "NON-DISCLOSURE AGREEMENT",
      version: "1.0",
      date: "12/12/23",
    },
    {
      title: "NON-DISCLOSURE AGREEMENT",
      version: "1.0",
      date: "12/12/23",
    },
    {
      title: "NON-DISCLOSURE AGREEMENT",
      version: "1.0",
      date: "12/12/23",
    },
  ];

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
      {data.map((item, index) => {
        return (
          <div className="bottom-doc" key={index}>
            <div className="doc-container">
              <div className="doc-title">
                <img src={Doc} alt="" />
                <span>{item.title}</span>
              </div>
              <div className="version-container">
                <div className="version-item">
                  <span className="version">{item.version}</span>
                  <span className="date">{item.date}</span>
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
