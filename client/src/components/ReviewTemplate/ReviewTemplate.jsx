import React, { useState, useEffect } from "react";
import Review from "../../img/createDoc/review.svg";
import "./ReviewTemplate.scss";
import axios from "axios";
import parse from "html-react-parser";
function ReviewTemplate({ type, templateData }) {
  const [data, setData] = useState(null);
  if (!templateData || !templateData.title || !templateData.term) {
    return <div>Loading...</div>; // or return null if you don't want to show anything
  }
  const documentTerm =
    typeof templateData?.term === "string"
      ? parse(templateData?.term)
      : templateData?.term;
  console.log("Template Data Title:", templateData.title);
  const titleMatch = templateData.title.match(/<title>(.*?)<\/title>/);
  const extractedTitle = titleMatch ? titleMatch[1] : templateData.title;

  return (
    <>
      {type === "default" ? (
        <>
          <div className="header-createDoc">
            <img src={Review} alt="" />
            Review template
          </div>
          <div className="preview-container">
            <div className="preview-title">{extractedTitle}</div>
            <div className="body-container">
              <div className="preview-party">Party</div>
              <div className="preview-content">
                <span>Content</span>
                <div className="content">{documentTerm}</div>
              </div>
              <div className="preview-signature">Signature and date</div>
              <button>CUSTOMISE</button>
            </div>
            <div className="cus-btn">
              <Link to="/CustomiseDoc/:id">
                <button className="btn">CUSTOMISE</button>
              </Link>
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
            <div className="preview-title">{extractedTitle}</div>
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
