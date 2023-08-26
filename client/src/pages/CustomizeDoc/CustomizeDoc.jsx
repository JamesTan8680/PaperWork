import React, { useState, useEffect, useRef } from "react";
import "./CustomizeDoc.scss";
import Doc from "../../img/home/doc.svg";
import TextEditor from "../../components/TextEditor/TextEditor";
import Parties from "../../components/Parties/Parties";
import Terms from "../../components/Terms/Terms";
import SignatureConfig from "../../components/SignatureConfig/SignatureConfig";
import { renderToString } from "react-dom/server";
import SuccessfulPage from "./SuccessfulPage";
import DropdownParties from "../../components/Parties/DropdownParties";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

export default function CustomizeDoc() {
  let { id } = useParams();
  const [docTitle, setDocTitle] = useState("NDA"); // default value

  const [data, setData] = useState([]);
  const [templateSelect, setTemplateSelect] = useState(null);
  const [matchedItem, setMatchedItem] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8800/create-document/default-templates";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        if (!templateSelect && response.data.length > 0) {
          setTemplateSelect(response.data[0].id);
        }

        const item = response.data.find((item) => item.template.type === id);
        if (item) {
          setMatchedItem(item);
          const rawDocTitle = item.docTitle;
          const cleanedTitle = rawDocTitle.replace(/<\/?title>/g, ""); // remove <title> and </title>
          setDocTitle(cleanedTitle);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [templateSelect, id]);

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
  const [selectedParty, setSelectedParty] = useState("");

  const editor = useRef(null);
  // const for managing the selected style
  const [selected, setSelected] = useState(1);
  //this is the state for the title
  const [content, setDocContent] = useState(docTitle);
  //this is the state for the term of the doc
  const [terms, setDocTerms] = useState(docTerms);
  // this is the state for the input list
  const [inputList, setInputList] = useState([]);
  //state that saving for the signature config
  const [savedItem, setSaveItem] = useState([]);
  //state that to handle the successful alert
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle saving the content
  const handleSave = () => {
    // Save the content can be save to backend
    console.log("Saving content:", content);
  };
  //handle close modal
  const handleClose = () => {
    setShowAlert(!showAlert);
  };
  //handle alert
  const handleAlert = () => {
    setShowAlert(true);
  };

  //handle cancel
  const handleCancel = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel? Changes that you made may not be saved."
    );

    if (userConfirmed) {
      //remove the data of localStorage from Parties
      localStorage.removeItem("EditItems");
      //<Link> does not able to work here use anchor instead
      const anchor = document.createElement("a");
      anchor.href = "/createDoc";
      anchor.click();
    }
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
            }}
          >
            {docTitle}
          </div>
          <div className="content-customiseDoc">
            <div
              className={`doc-parties ${selected === 2 ? "selected" : ""}`}
              onClick={() => {
                setSelected(2);
              }}
            >
              <b>Parties</b>
              {selectedParty}
            </div>
            <div
              className={`doc-terms ${selected === 3 ? "selected" : ""}`}
              onClick={() => {
                setSelected(3);
              }}
            >
              <b>Terms</b>

              <span>Note: Put the Document Terms Here That Involve</span>
            </div>
            <div
              className={`doc-signature ${selected === 4 ? "selected" : ""}`}
              onClick={() => {
                setSelected(4);
              }}
            >
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
            <Parties selectedParty={selectedParty} />
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
            selected === 4 && (
              <SignatureConfig
                savedItem={savedItem}
                setSaveItem={setSaveItem}
              />
            )
          )}
          <div className="btn">
            {/* <button className="cancel">Cancel</button> */}
            <button
              className="cancel"
              onClick={() => {
                if (selected > 1) {
                  setSelected((prev) => prev - 1); // Decrement index, go back to previous section
                } else {
                  // handleAlert();
                  handleCancel();
                }
              }}
            >
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
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {showAlert && <SuccessfulPage closeModal={handleClose} />}
    </div>
  );
}
