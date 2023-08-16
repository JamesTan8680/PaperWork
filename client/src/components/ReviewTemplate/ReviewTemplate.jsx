import React, { useState, useEffect } from "react";
import Review from "../../img/createDoc/review.svg";
import "./ReviewTemplate.scss";
import axios from "axios";
import RemoveAngleBrackets from "../RemoveAngleBrackets/RemoveAngleBrackets";

function ReviewTemplate({ type, templateData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8800/create-document/default-templates";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  if (!templateData) {
    return <div>Loading...</div>; // or return null if you don't want to show anything
  }
  return (
    <>
      {type === "default" ? (
        <>
          <div className="header-createDoc">
            <img src={Review} alt="" />
            Review template
          </div>
          <div className="preview-container">
            <div className="preview-title">
              <RemoveAngleBrackets input={templateData.docTitle} />
            </div>
            <div className="body-container">
              <div className="preview-party">
                Party
                <div className="content">{templateData.template.type}</div>
              </div>
              <div className="preview-content">
                <span>Content</span>
                <div className="content">
                  <span>Term:</span>
                  <RemoveAngleBrackets input={templateData.template.term} />
                </div>
              </div>
              <div className="preview-signature">
                Signature and date
                <div className="content">Signature for Chingsien Ly</div>
                <div className="content">Email:</div>
                <div className="content">Address:</div>
                <div className="content">Date:</div>
              </div>
              <button>CUSTOMISE</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="header-createDoc">
            <img src={Review} alt="" />
            Review template
          </div>
          <div className="preview-container">
            <div className="preview-title">
              NON-DISCLOSURE AGREEMENT (ONE WAY)
            </div>
            <div className="body-container">
              <div className="preview-party">Party</div>
              <div className="preview-content">
                <span>Content</span>
              </div>
              <div className="preview-signature">
                <span>Signature and date</span>
              </div>
              <button>CUSTOMISE</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ReviewTemplate;
