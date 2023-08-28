import React, { useState, useEffect, useRef } from "react";
import "./CustomizeDoc.scss";
import Doc from "../../img/home/doc.svg";
import TextEditor from "../../components/TextEditor/TextEditor";
import Parties from "../../components/Parties/Parties";
import Terms from "../../components/Terms/Terms";
import SignatureConfig from "../../components/SignatureConfig/SignatureConfig";
import SuccessfulPage from "./SuccessfulPage";
import axios from "axios";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";

export default function CustomizeDoc() {
  //the id that get from the params
  let { id } = useParams();
  //setting the doc title for the document
  const [docTitle, setDocTitle] = useState(""); // default value
  const [data, setData] = useState([]);
  const [templateSelect, setTemplateSelect] = useState();
  //this is the state for the term of the doc
  const [terms, setDocTerms] = useState("");
  //GET data from database
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
          //select docTitle from datbase
          const rawDocTitle = item.docTitle;
          const cleanedTitle = rawDocTitle.replace(/<\/?title>/g, ""); // remove <title> and </title>
          setDocTitle(cleanedTitle);
          setDocContent(cleanedTitle);
          setDocTerms(item?.template?.term);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [templateSelect, id]);
  //console.log(data);

  //console.log(terms);
  const [selectedParty] = useState("");

  const editor = useRef(null);
  // const for managing the selected style
  const [selected, setSelected] = useState(1);
  //this is the state for the title
  const [content, setDocContent] = useState("");
  //state for the parties
  const [partyList, setPartyList] = useState([
    {
      id: uuid(),
      number: 1,
      selectedOption: selected, //Manage the selected option state seperately for each dropdown item
    },
  ]);
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
    console.log(partyList[1].selectedOption);
    console.log(partyList);
    console.log(partyList.length);
    sendDataToTheTemplateEndpoint();
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

  //GATHER DATA
  const payload = {
    content,
    terms,
    savedItem,
  };
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  console.log("type = ", id);
  console.log("title = ", docTitle);
  console.log("content =  ", terms);
  console.log("parties_number = ", partyList.length);
  console.log("date = ", date.toLocaleDateString());
  console.log("SavedItem = ", savedItem);

  const sendDataToTheTemplateEndpoint = () => {
    console.log("Hi from function ");
    console.log(id);
    try {
      axios
        .post("http://localhost:8800/customise-document/template", {
          //build up the array
          // document_template_id: 1,
          // type: "type_A",
          // title: "non-discloser agreement",
          // content: terms,
          // parties_number: selectedParty,
          // date: date.toLocaleTimeString(),
          /*
          {
          "type": "Type_A",
          "title": "test new 4 ",
          "content": "Sample Content",
          "parties_number": 2,
          "created_date": "2023-08-21",
          }
          */
          type: id,
          title: docTitle,
          content: terms,
          parties_number: partyList.length,
          created_date: date.toLocaleDateString(),
        })
        .then((res) => {
          console.log("Data sent successfully 12345", res.data);
          sendSignatureConfigToTheBackend(
            res.data.document_template_id,
            savedItem
          );
        });
    } catch (error) {
      console.log("Error sending data *********", error);
    }
  };

  // sending signature config to the backend
  const sendSignatureConfigToTheBackend = (id, savedItem) => {
    console.log("Hi from the SendToSignatureConfig function");
    console.log("id in ***", id);
    try {
      axios
        .post(
          `http://localhost:8800/customise-document/${id}/configuration`,
          savedItem
        )
        .then((res) => {
          console.log("Config data send successfully from Lachie", res.data);
        });
    } catch (error) {
      console.log("Error saving Config data", error);
    }
  };

  //
  const saveToDatabase = (data) => {
    axios
      .post("http://localhost:8800/customise-document/template", data)
      .then((response) => {
        console.log("Data saved successfully :", response);
        // Maybe update some state here to notify the user that the save was successful.
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle the error. Maybe display an error message to the user.
      });
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
                setTitle={setDocContent}
                page="title"
              />
            </div>
          ) : selected === 2 ? (
            <Parties partyList={partyList} setPartyList={setPartyList} />
          ) : selected === 3 ? (
            <Terms
              id={id}
              data={data}
              editor={editor}
              terms={terms}
              selected={selected}
              setContent={setDocTerms}
              inputList={inputList}
              page="content"
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
                console.log("$$$ Save Click " + selected);
                if (selected !== 4) {
                  setSelected((prev) => prev + 1);
                  // saveToDatabase(payload);
                  //    sendDataToTheTemplateEndpoint();
                  // sendSignatureConfigToTheBackend(savedItem);
                } else {
                  handleSave();
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
