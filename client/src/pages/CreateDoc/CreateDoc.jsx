import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateDoc.scss";
import Temp from "../../img/createDoc/template.svg";
import Ver from "../../img/createDoc/version.svg";
import ReviewTemplate from "../../components/ReviewTemplate/ReviewTemplate";

function extractTitleContent(title) {
  const match = title.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : title;
}
function CreateDoc() {
  const [data, setData] = useState([]);
  const [templateSelect, setTemplateSelect] = useState(null);
  const [template, setTemplate] = useState("default");

  useEffect(() => {
    const apiUrl = "http://localhost:8800/create-document/default-templates";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        if (!templateSelect && response.data.length > 0) {
          setTemplateSelect(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [templateSelect]);

  const selectedTemplateData = data.find((item) => item.id === templateSelect);

  // Combine title and term into one object
  const combinedTemplateData = selectedTemplateData
    ? {
        title: selectedTemplateData.docTitle,
        term: selectedTemplateData.template
          ? selectedTemplateData.template.term
          : "",
      }
    : null;

  const handleClickType = (type) => setTemplate(type);
  const handleSelectTemplate = (id) => setTemplateSelect(id);

  return (
    <div className="createDoc">
      <span className="title">Create Document Page</span>
      <div className="container">
        <div className="left-createDoc">
          <div className="header-createDoc">
            <img src={Temp} alt="" />
            Template Type
          </div>
          <div className="list-container">
            {data.map((item) => (
              <span
                className={
                  templateSelect === item.id
                    ? "list-createDoc selected"
                    : "list-createDoc"
                }
                onClick={() => handleSelectTemplate(item.id)}
                key={item.id}
              >
                {extractTitleContent(item.docTitle)}
              </span>
            ))}
          </div>
        </div>
        <div className="mid-createDoc">
          <div className="header-createDoc">
            <img src={Ver} alt="" />
            Choose Version
          </div>
          <div className="list-container">
            <div
              onClick={() => handleClickType("default")}
              className={template === "default" ? "selected" : ""}
            >
              Default Template
            </div>
            <div
              onClick={() => handleClickType("blank")}
              className={template === "blank" ? "selected" : ""}
            >
              Blank Template
            </div>
          </div>
        </div>
        <div className="right-createDoc">
          {combinedTemplateData && (
            <ReviewTemplate
              type={template}
              templateData={combinedTemplateData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateDoc;
