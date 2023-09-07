import React, { useState, useEffect, useRef } from "react";
import "./CustomizeDoc.scss";
import Doc from "../../img/home/doc.svg";
import TextEditor from "../../components/TextEditor/TextEditor";
import Parties from "../../components/Parties/Parties";
import Terms from "../../components/Terms/Terms";
import SignatureConfig from "../../components/SignatureConfig/SignatureConfig";
import SuccessfulPage from "./SuccessfulPage";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import emailjs from "@emailjs/browser";

export default function CustomizeDoc() {
  //the id that get from the params
  let { id } = useParams();
  let { type } = useParams();

  //setting the doc title for the document
  const [docTitle, setDocTitle] = useState(""); // default value
  const [data, setData] = useState([]);
  const [templateSelect, setTemplateSelect] = useState();
  //this is the state for the term of the doc
  const [terms, setDocTerms] = useState("");

  //GET data from database
  //this is for the navigation
  const navigate = useNavigate();
  //console.log(id);
  if (data?.some((item) => item.template.type === id)) {
  } else {
    navigate("/createDoc");
  }
  useEffect(() => {
    const apiUrl = "http://localhost:8800/create-document/default-templates";

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        if (!templateSelect && response.data.length > 0) {
          setTemplateSelect(response.data[0].id);
        }
        if (type === "blank") {
          const item = response.data.find((item) => item.template.type === id);
          if (item) {
            const rawDocTitle = item.docTitle;
            const cleanedTitle = rawDocTitle.replace(/<\/?title>/g, "");
            setDocTitle(cleanedTitle);
            setDocContent(cleanedTitle);
            setDocTerms("");
          }
        } else {
          const item = response.data.find((item) => item.template.type === id);
          if (item) {
            const rawDocTitle = item.docTitle;
            const cleanedTitle = rawDocTitle.replace(/<\/?title>/g, "");
            setDocTitle(cleanedTitle);
            setDocContent(cleanedTitle);
            setDocTerms(item?.template?.term);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [templateSelect, id, type]);

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
      selectedOption: "Select Parties Name", //Manage the selected option state seperately for each dropdown item
      parties_email: "",
      parties_id: "",
    },
  ]);
  console.log(partyList);
  // this is the state for the input list
  const [inputList, setInputList] = useState([]);
  //state that saving for the signature config
  const [savedItem, setSaveItem] = useState([]);
  //state that to handle the successful alert
  const [showAlert, setShowAlert] = useState(false);

  // Function to handle saving the content
  const handleSave = () => {
    if (content === "<p><br></p>" || terms === "<p><br></p>" || terms === "") {
      //this is for the title that we replace
      alert("Put the content inside Title or Terms");
    } else {
      sendDataToTheTemplateEndpoint();
      const arrayofEmail = partyList?.map((item) => item.parties_email);
      //alert(arrayofEmail);
      //create the template to pass props into the emailJs API
      var templateParams = {
        docName: docTitle,
        message:
          "Please kindly check and approve or deny the document that was created by the Paperwork Team.",
        email: arrayofEmail,
      };
      //email js api request method
      emailjs
        .send(
          "service_7d8l9ff",
          "template_25x692y",
          templateParams,
          "VBzIorHlAAspUrEhL"
        )
        .then(
          (result) => {
            console.log(result.text);
            handleAlert();
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };
  //handle close modal
  const handleClose = () => {
    setShowAlert(!showAlert);
    navigate("/createDoc");
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

  const date = new Date();
  let created_date = `${date.getFullYear()}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getDate()}`;

  // console.log("type = ", id);
  // console.log("title = ", docTitle);
  // console.log("content =  ", terms);
  // console.log("parties_number = ", partyList.length);
  // console.log("date = ", date.toLocaleDateString());
  // console.log("SavedItem = ", savedItem);

  const sendDataToTheTemplateEndpoint = () => {
    console.log("Hi from function ");
    // console.log(id);
    try {
      axios
        .post("http://localhost:8800/customise-document/template", {
          type: id,
          title: content,
          content: terms,
          parties_number: partyList.length,
          created_date: created_date,
        })
        .then((res) => {
          // console.log("Data sent successfully 12345", res.data);
          sendSignatureConfigToTheBackend(
            res.data.document_template_id,
            savedItem
          );
          sendPartiesToTheBackend(res.data.document_template_id, partyList);
        });
    } catch (error) {
      // console.log("Error sending data *********", error);
    }
  };

  // const sendPartyToTheBackend = async (id, partyId) => {
  //   console.log("Hi from the sendPartyToTheBackend function");
  //   console.log("id:", id);
  //   console.log("partyId:", partyId);

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8800/customise-document/${id}/parties`,
  //       { parties_id: partyId, parties_approval: false }
  //     );

  //     console.log("Party sent successfully:", response.data);
  //   } catch (error) {
  //     console.log("Error sending party:", error);
  //   }
  // };

  const sendPartiesToTheBackend = (id, partyList) => {
    console.log("Hi from the sendPartiesToTheBackend function");
    console.log("id in ***", id);
    updatePartiesToTheEndpoint(id, newList.map(item=>item.parties_id));

  };

  // sending signature config to the backend
  const sendSignatureConfigToTheBackend = (id, savedItem) => {
    // console.log("Hi from the SendToSignatureConfig function");
    // console.log("id in ***", id);
    try {
      axios
        .post(
          `http://localhost:8800/customise-document/${id}/configuration`,
          savedItem
        )
        .then((res) => {
          // console.log("Config data send successfully from Lachie", res.data);
        });
    } catch (error) {
      // console.log("Error saving Config data", error);
    }
  };

  const updatePartiesToTheEndpoint = (id, partyList) => {
    try {
      const response = axios.post(
        `http://localhost:8800/customise-document/${id}/parties`,
        { parties_ids: partyList }
      );

      console.log("Parties sent successfully:", response.data);
    } catch (error) {
      document.write("Error sending party:", error);
    }
  };


  const [partiesList, setPartiesList] = useState([])
  const [newList,pushList] = useState(partiesList)

  const getParties = async () => {
    try {
      axios
        .get("http://localhost:8800/customise-document/"+ id + "/parties")
        .then((res) => {
          //match template type version with the id
          setPartiesList(res.data);
          console.warn("got parties");
          console.warn(res.data);
        });
    } catch (err) {
      document.write("Error fetching parties ", err);
    }
  }


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

              {type !== "blank" ? (
                <span>Note: Put the Document Terms Here That Involve</span>
              ) : (
                <span>Start typing to add terms...</span>
              )}
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
          {selected === 1 && (
            <TextEditor
              editor={editor}
              title={content}
              selected={selected}
              setTitle={setDocContent}
              page="title"
            />
          )}
          {selected === 2 && (
            <Parties partiesList={partiesList} setPartiesList={pushList} />
            )}
          {selected === 3 && (
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
          )}
          {selected === 4 && (
            <SignatureConfig savedItem={savedItem} setSaveItem={setSaveItem} />
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
                // console.log("$$$ Save Click " + selected);
                if (selected !== 4) {
                  setSelected((prev) => prev + 1);
                  // saveToDatabase(payload);
                  //    sendDataToTheTemplateEndpoint();
                  // sendSignatureConfigToTheBackend(savedItem);
                } else {
                  handleSave();
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
