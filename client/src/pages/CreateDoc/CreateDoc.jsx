import React, { useState } from "react";
import "./CreateDoc.scss";
import Temp from "../../img/createDoc/template.svg";
import Ver from "../../img/createDoc/version.svg";

import ReviewTemplate from "../../components/ReviewTemplate/ReviewTemplate";

function CreateDoc() {
  //create the dummy data that will replace by the data in the database
  const data = [
    {
      id: "1",
      docTitle: "NON-DISCLOSURE AGREEMENT  ",
      template: {
        type: "NDA (Defult Template)",
        term: "This document is confidentail",
      },
      defaultTemplate: { type: "NDA (Defult Template)", term: "" },
    },
    {
      id: "2",
      docTitle: "Security policy",
      template: {
        type: "SP (Defult Template",
        term: "This document is confidentail",
      },
      defaultTemplate: { type: "SP (Defult Template)", term: "" },
    },
    {
      id: "3",
      docTitle: "Healt Agreement",
      template: {
        type: "HA (Defult Template",
        term: "This document is confidentail",
      },
      defaultTemplate: { type: "HA (Defult Template)", term: "" },
    },
    {
      id: "4",
      docTitle: "Work hour Agreement",
      template: {
        type: "WH (Defult Template",
        term: "This document is confidentail",
      },
      defaultTemplate: { type: "WH (Defult Template)", term: "" },
    },
  ];
  //handle the select
  const [templateSelect, setTemplateSelect] = useState();

  //state to manage the data for the template
  const [template, setTemplate] = useState("default");

  //handle the click to change the template type
  const handleClickType = (type, id) => {
    setTemplate(type);
  };
  //handle select for the template
  const handleSelectTemplate = (id) => {
    setTemplateSelect(id);
  };

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
            {data.map((item) => {
              return (
                <span
                  className={
                    templateSelect === item.id
                      ? "list-createDoc selected"
                      : "list-createDoc"
                  }
                  onClick={() => handleSelectTemplate(item.id)}
                  key={item.id}>
                  {item.docTitle}
                </span>
              );
            })}
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
              className={template === "default" ? "selected" : ""}>
              Default Template
            </div>
            <div
              onClick={() => handleClickType("blank")}
              className={template === "blank" ? "selected" : ""}>
              {" "}
              Blank Template
            </div>
          </div>
        </div>
        <div className="right-createDoc">
          <ReviewTemplate type={template} />
        </div>
      </div>
    </div>
  );
}

export default CreateDoc;
