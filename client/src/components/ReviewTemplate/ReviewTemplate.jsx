import React, { useState } from "react";
import Review from "../../img/createDoc/review.svg";
import "./ReviewTemplate.scss";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function ReviewTemplate({ type, templateData }) {
  const [template, setTemplate] = useState("default");

  const handleClickType = (selectedTemplate) => {
    setTemplate(selectedTemplate);
    console.log("Template Set To:", selectedTemplate);
    handleCustomiseClick(selectedTemplate);
  };

  const handleCustomiseClick = () => {
    console.log("Currently Customising:", template);
  };

  if (!templateData || !templateData.title || !templateData.term) {
    return <div>Loading...</div>;
  }

  const documentTerm =
    typeof templateData?.term === "string"
      ? parse(templateData?.term)
      : templateData?.term;

  const titleMatch = templateData.title.match(/<title>(.*?)<\/title>/);
  const extractedTitle = titleMatch ? titleMatch[1] : templateData.title;

  return (
    <>
      {type === "default" ? (
        <DefaultTemplate
          extractedTitle={extractedTitle}
          documentTerm={documentTerm}
          handleClickType={handleClickType}
          handleCustomiseClick={handleCustomiseClick}
          templateData={templateData}
          currentTemplate={template}
        />
      ) : (
        <BlankTemplate
          extractedTitle={extractedTitle}
          handleClickType={handleClickType}
          handleCustomiseClick={handleCustomiseClick}
          templateData={templateData}
          currentTemplate={template}
        />
      )}
    </>
  );
}

const DefaultTemplate = ({
  extractedTitle,
  documentTerm,
  handleClickType,
  handleCustomiseClick,
  templateData,
  currentTemplate,
}) => {
  return (
    <>
      <div className="header-createDoc">
        <img src={Review} alt="Review" />
        Review template
      </div>
      <div className="preview-container">
        <div className="preview-title">{extractedTitle}</div>
        <div className="body-container">
          <div className="preview-party">Party</div>
          <div className="party-content">
            This is the place where you can select the parties involve in your
            document
          </div>
          <div className="preview-content">
            <span>Content</span>
            <div className="content">{documentTerm}</div>
          </div>
          <div className="preview-signature">Signature and date</div>
          <div className="cus-btn">
            <Link to={`/CustomizeDoc/${templateData?.type}/default`}>
              <button
                onClick={() => {
                  handleClickType("default");
                }}
                className={currentTemplate === "default" ? "selected" : ""}
              >
                CUSTOMISE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const BlankTemplate = ({
  extractedTitle,
  handleClickType,
  handleCustomiseClick,
  templateData,
  currentTemplate,
}) => {
  return (
    <>
      <div className="header-createDoc">
        <img src={Review} alt="Review" />
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
          <div className="cus-btn">
            <Link to={`/CustomizeDoc/${templateData?.type}/blank`}>
              <button
                onClick={() => {
                  handleClickType("blank");
                }}
                className={currentTemplate === "blank" ? "selected" : ""}
              >
                CUSTOMISE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewTemplate;
