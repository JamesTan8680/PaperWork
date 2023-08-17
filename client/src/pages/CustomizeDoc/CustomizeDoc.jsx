import React from "react";
import "./CustomizeDoc.scss";
import Doc from "../../img/home/doc.svg";
import { useState, useRef } from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import Parties from "../../components/Parties/Parties";
import Terms from "../../components/Terms/Terms";
import SignatureConfig from "../../components/SignatureConfig/SignatureConfig";
import { renderToString } from "react-dom/server";

export default function CustomizeDoc() {
  const docTitle = "Non-Disclosure Agreement";
  const docTerms = renderToString(
    //this is only temporarily, will change accordingly
    <React.Fragment>
      <div>
        <b>Terms</b>
      </div>
      &nbsp; &nbsp;
      <div>
        <span>This document is confidential</span>
      </div>
    </React.Fragment>
  );

  const editor = useRef(null);
  // const for managing the selected style
  const [selected, setSelected] = useState(1);
  //this is the state for the title
  const [content, setDocContent] = useState(docTitle);
  //this is the state for the term of the doc
  const [terms, setDocTerms] = useState(docTerms);
  // this is the state for the input list
  const [inputList, setInputList] = useState([]);
  // Function to handle saving the content
  const handleSave = () => {
    // Save the content can be save to backend
    console.log("Saving content:", content);
  };

  //handle alert
  const handleAlert = () => {
    alert("hi");
  };
  return (
    <div className="customiseDoc">
      <div className="top-customiseDoc">
        <div className="headerDoc">
          <img src={Doc} alt="DocIcon" />
          <span>Template view</span>
        </div>
      </div>

      <div className="bottom-customiseDoc">
        <div className="left-customiseDoc">
          <div
            className={`doc-title ${selected === 1 ? "selected" : ""}`}
            onClick={() => {
              setSelected(1);
            }}>
            {docTitle}
          </div>
          <div className="content-customiseDoc">
            <div
              className={`doc-parties ${selected === 2 ? "selected" : ""}`}
              onClick={() => {
                setSelected(2);
              }}>
              <b>Parties</b>
              <span>Note: Put the Parties Name Here That Involve</span>
            </div>
            <div
              className={`doc-terms ${selected === 3 ? "selected" : ""}`}
              onClick={() => {
                setSelected(3);
              }}>
              <b>Terms</b>
              <span>Note: Put the Document Terms Here That Involve</span>
            </div>
            <div
              className={`doc-signature ${selected === 4 ? "selected" : ""}`}
              onClick={() => {
                setSelected(4);
              }}>
              <b>Signature Configuration</b>
            </div>
          </div>
        </div>
        <div className="right-customiseDoc">
          {selected === 1 ? (
            <div className="this">
              <TextEditor
                editor={editor}
                title={content}
                selected={selected}
                setContent={setDocContent}
              />
            </div>
          ) : selected === 2 ? (
            <Parties />
          ) : selected === 3 ? (
            <Terms
              editor={editor}
              terms={terms}
              selected={selected}
              setContent={setDocTerms}
              inputList={inputList}
              setInputList={setInputList}
            />
          ) : (
            selected === 4 && <SignatureConfig />
          )}
          <div className="btn">
            {/* <button className="cancel">Cancel</button> */}
            <button
              className="cancel"
              onClick={() => {
                if (selected > 1) {
                  setSelected((prev) => prev - 1); // Decrement index, go back to previous section
                } else {
                  handleAlert();
                }
              }}>
              Cancel
            </button>

            <button
              className="save"
              onClick={() => {
                if (selected !== 4) {
                  setSelected((prev) => prev + 1);
                  handleSave();
                } else {
                  handleAlert();
                }
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
