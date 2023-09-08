import React from "react";
import "./EditDoc.scss";
import Doc from "../../img/home/doc.svg";
import { useState, useEffect, useRef } from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import Parties from "../../components/Parties/Parties";
import Terms from "../../components/Terms/Terms";
import SignatureConfig from "../../components/SignatureConfig/SignatureConfig";
import Back from "../../img/editDoc/back.svg";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

export default function EditDoc(item) {
  //I am meant to fetch the data from the viewDoc template version into the editDoc.jsx
  //function for getting the data by type
  const [data, setData] = useState([]);
  const [docTitle, setDocTitle] = useState(""); // default value
  var { id } = useParams();

  console.log("id*** in Edit Doc ", data.document_template_id);
  console.log("id_sliced*** in Edit Doc ", data.type);

  const fetchDataByType = async () => {
    console.warn("Getting the stuff");

    try {
      axios
        .get("http://localhost:8800/customise-document/" + id)
        .then((res) => {
          //match template type version with the id
          const item = res.data.find(
            (item) => item.document_template_id === id
          );
          //if the item is true then fetch the data into the corresponding section
          if (item) {
            setData(item);
            //first fetch the title from the correct type
            const rawDocTitle = item.title;
            const cleanedTitle = rawDocTitle.replace(/<\/?[^>]*>/g, "");
            setDocTitle(cleanedTitle);
            setDocContent(cleanedTitle);
            //fetch the terms into from the correct type
            setDocTerms(item?.content);
            console.warn(item);
          }
        });
    } catch (err) {
      document.write("Error fetching data ", err);
    }
  };

  useEffect(() => {
    fetchDataByType();
    getParties();
  }, []);

  //console.log(data);

  // const docTitle = "Non-Disclosure Agreement";
  // const docTerms = renderToString(
  //   //this is only temporarily, will change accordingly
  //   <React.Fragment>
  //     <div>
  //       <b>Terms</b>
  //     </div>
  //     &nbsp; &nbsp;
  //     <div>
  //       <span>This document is confidential</span>
  //     </div>
  //   </React.Fragment>
  // );

  const editor = useRef(null);
  // const for managing the selected style
  const [selected, setSelected] = useState(1);
  //state for the parties

  //this is the state for the title
  const [content, setDocContent] = useState("");
  //this is the state for the term of the doc
  const [terms, setDocTerms] = useState("");
  // this is the state for the input list
  const [inputList, setInputList] = useState([]);
  //state that saving for the signature config
  const [savedItem, setSaveItem] = useState([]);
  // Function to handle saving the content
  const navigate = useNavigate();

  const handleSave = () => {
    // Save the content can be save to backend

    console.log("Saving content:", content);
    let arrayOfEmail = partyList?.map((item) => item.parties_email);
    //update the template version data to the backend
    updateTemplateEndpoint(data.document_template_id);
    //console.log("this is the partyList", arrayOfemail);
    //send the email to each individual recipient
    arrayOfEmail.forEach((item) => {
      var templateParams = {
        docName: docTitle,
        email: item,
        message: `Please kindly check and approve or deny the document that was created by the Paperwork Team via URL: ${item}`,
      };
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
    });
    navigate(`/viewDoc/${data.type}`);
  };

  //handle alert
  const handleAlert = () => {
    alert(savedItem);
  };
  console.log("SavedItem = ", savedItem);

  //get today's date
  const date = new Date();
  let created_date = `${date.getFullYear()}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getDate()}`;
  //console.log("date*** ", created_date);
  //console.log("parties_number = ", partyList.length);
  //console.log("title = ", content);
  //console.log("terms = ", terms);

  // update the template endpoint using the put method in axios
  const updateTemplateEndpoint = (id) => {
    try {
      axios
        .put(`http://localhost:8800/customise-document/${id}`, {
          type: data.type,
          title: content,
          content: terms,
          parties_number: partyList.length,
          date_modified: created_date,
        })
        .then((res) => {
          console.log("Updated data successfully ", res.data);
          updateSignatureConfigEndpoint(id, savedItem);
          updatePartiesToTheEndpoint(
            id,
            partyList.map((item) => item.parties_id)
          );
        });
    } catch (error) {
      document.write("Error updating data *********", error);
    }
  };

  //update the signature config endpoint
  const updateSignatureConfigEndpoint = (id, savedItem) => {
    try {
      axios
        .put(
          `http://localhost:8800/customise-document/${id}/configuration`,
          savedItem
        )
        .then((res) => {
          console.log("Successfully updated signatureConfig data", res.data);
        });
    } catch (error) {
      document.write("Error updating date");
    }
  };
  //update parties to the backend
  // const updatePartyToTheEndpoint = (id, partyId) => {
  //   try {
  //     const response = axios.put(
  //       `http://localhost:8800/customise-document/${id}/parties`,
  //       { parties_id: partyId, parties_approval: false }
  //     );

  //     console.log("Party sent successfully:", response.data);
  //   } catch (error) {
  //     document.write("Error sending party:", error);
  //   }
  // };
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

  const [partiesList, setPartiesList] = useState([]);
  const [partyList, setPartyList] = useState([
    {
      id: uuid(),
      selectedOption: "Select Parties Name", //Manage the selected option state seperately for each dropdown item
      parties_email: "",
      parties_id: "", 
    },
  ]);
  const getParties = async () => {
    try {
      axios
        .get("http://localhost:8800/customise-document/" + id + "/parties")
        .then((res) => {
          //match template type version with the id
          setPartiesList(res.data);
          console.warn("got parties");
          console.warn(res.data);
        });
    } catch (err) {
      document.write("Error fetching parties ", err);
    }
  };

  useEffect(() => {}, [partyList]);

  return (
    <div className="customiseDoc">
      <div className="top-editDoc">
        <Link to={`/viewDoc/${data.type}`}>
          <div className="back-btn">
            <img src={Back} alt="" />
            <span>
              <b>Back</b>
            </span>
          </div>
        </Link>
        <div className="headerEditDoc">
          <div className="header-container">
            <img src={Doc} alt="DocIcon" />
            <span className="template-edit">Template view</span>
          </div>
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
              <span>Note: Put the Parties Name Here That Involve</span>
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
                // save the title when the user edits it
                page="title"
              />
            </div>
          ) : // ) : selected === 2 ? (
          // //   <Parties partiesList={partiesList} setPartiesList={setPartyList} />
          selected === 3 ? (
            <Terms
              editor={editor}
              terms={terms}
              selected={selected}
              setContent={setDocTerms}
              inputList={inputList}
              // save the terms when the user edits it
              page="content"
              setInputList={setInputList}
            />
          ) : (
            selected === 4 && (
              <SignatureConfig
                savedItem={savedItem}
                setSaveItem={setSaveItem}
                doc_id = {id}
              />
            )
          )}
          <div className={selected === 2 ? "" : "invisible"}>
            <Parties partiesList={partiesList} setPartiesList={setPartyList} />
          </div>
          <div className="btn">
            {/* <button className="cancel">Cancel</button> */}
            <button
              className="cancel"
              onClick={() => {
                if (selected > 1) {
                  setSelected((prev) => prev - 1); // Decrement index, go back to previous section
                } else {
                  if (window.confirm("Do you wish to go Back?"))
                    navigate(`/viewDoc/${data.type}`);
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
                } else {
                  // handleAlert();
                  handleSave();
                  <Link to={`/viewDoc/${data.type}`} className="save">
                    Save
                  </Link>;
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
