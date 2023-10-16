import React, { useState, useEffect, useRef } from "react";
import "./ReviewDoc.scss";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ReviewDoc() {
  let { id } = useParams();

  //state for the blur the signature
  const [blurry, setBlur] = useState(true);

  //using useRef for pdfExport
  const pdfExportComponent = useRef(null);

  //handle the export pdf
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const [title, setTitle] = useState("");
  //creating type useState
  const [version, setVersion] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [parties, setParties] = useState([]);
  const [content, setContent] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [docType, setDocType] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentid, setStudentid] = useState("");
  const [usertitle, setUsertitle] = useState("");
  const [age, setAge] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const [signDate, setSignDate] = useState("");
  const [varList, setVarList] = useState([]);
  useEffect(() => {
    // Initialize state variables with default values
    setVersion("");
    setParties([]);
    setContent("");
    setSelectedRecipient(null);
    // Make separate API requests
    axios
      .get(`http://localhost:8800/view-document/document/${id}`)
      .then((response1) => {
        const documentData = response1.data || {}; // Handle empty response
        setTitle(documentData[0].title || "");
        setVersion(String(documentData[0].version) || "");
        setContent(documentData[0].content || "");
        setDocType(documentData[0].type || "");
      
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`http://localhost:8800/view-document/parties/${id}`)
      .then((response2) => {
        setParties(response2.data || []); // Handle empty response
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get(`http://localhost:8800/view-document/recipients/${id}`)
      .then((response3) => {
        setRecipients(response3.data || []); // Handle empty response
        console.log("thang test", response3.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const fillInputsWithVarList = (htmlContent, varList) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const inputElements = doc.querySelectorAll("input");

    
    inputElements.forEach((input, index) => {
      if (varList.length > index) { 
        input.setAttribute('value', varList[index]); 
      }
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (selectedRecipient) {
      
      axios
        .get(
          `http://localhost:8800/view-document/document/${id}/${selectedRecipient.email}`
        )
        .then((response) => {
          const data = response.data || {};
          const varListString = data.documentInfo.var_list;
          let varList;
          try {
            varList = JSON.parse(varListString);
          } catch (error) {
            console.error("Error parsing var_list:", error);
            varList = [];
          } const updatedContent = fillInputsWithVarList(content, varList);
          setContent(updatedContent);
          // Update the state variables with the data from the API response
          setFirstname(data.documentInfo.firstname || "");
          setLastname(data.documentInfo.lastname || "");
          setStudentid(data.documentInfo.student_id || "");
          setUsertitle(data.documentInfo.title || "");
          setAge(data.documentInfo.age || "");
          setSignature(data.signature || "");
          setAddress(data.address || "");
          setSignDate((data.documentInfo.signed_date && new Date(data.documentInfo.signed_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })) || "");
 

          
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [selectedRecipient, id, content]);

  // const recipientss = `
  //   <div>
  //     <select>
  //       <option value="alex">Alex</option>
  //       <option value="dave">Dave</option>
  //       <option value="david">David</option>
  //       <option value="james">James</option>
  //     </select>
  //   </div>
  // `;
  const RecipientDropdown = () => {
    const handleRecipientChange = (e) => {
      e.stopPropagation();
      const recipientId = e.target.value;
      const selected = recipients.find(
        (recipient) => recipient.identity_id === recipientId
      );
      setSelectedRecipient(selected);
    };

    // Filtering recipients who have a firstname
    const validRecipients = Array.isArray(recipients)
      ? recipients.filter((recipient) => recipient.email)
      : [];

    if (validRecipients && validRecipients.length > 0) {
      return (
        <div>
          <select
            onChange={handleRecipientChange}
            value={selectedRecipient ? selectedRecipient.identity_id : ""}
          >
            <option value="">Select Recipients Name</option>
            {validRecipients?.map((recipient) => (
              <option key={recipient.identity_id} value={recipient.identity_id}>
                {recipient.email}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  };

  console.log("Rendering RecipientDropdown with recipients: ", recipients);

  return (
    <div className="reviewDoc">
      <div className="review-container">
        <PDFExport
          ref={pdfExportComponent}
          paperSize="A4"
          margin={{ left: "15mm", top: "20mm", right: "15mm", bottom: "20mm" }}
          scale={0.6}
        >
          <div className="recipient">
            <div className="recipient-dropdown">
              <RecipientDropdown />
            </div>
            <div className="version">
              <b>Version</b> {HTMLReactParser(version)}
            </div>
          </div>
          <div className="header">{HTMLReactParser(title)}</div>

          <div className="parties">
            <h3>Party</h3>

            {parties?.map((item, index) => {
              return (
                <div className="party" key={index}>
                  <b>Name:</b> {item.parties_name} <b>Company:</b>{" "}
                  {item.Parties_company} <b>Address:</b> {item.parties_address}
                </div>
              );
            })}
          </div>
          <div className="reciew-content">{HTMLReactParser(content)}</div>
          <div className="review-signature">
            <h3>ENTER INTO AS AN AGREEMENT BY THE PARTIES</h3>
            <div className="parties_sign_container">
              <div className="parties_side">
                {parties?.map((item, index) => {
                  return (
                    <div className="party_sign" key={index}>
                      <div className="Dname">
                        Discloser Name: {item.parties_name}
                      </div>
                      <div className="Sname">
                        Signature: {item.parties_name}
                      </div>
                      <div className="Sdate">Date: 8/31/2023</div>
                    </div>
                  );
                })}
              </div>
              <div className="recipient_side">
                {selectedRecipient ? (
                  <>
                    {usertitle && <div>Title: {usertitle}</div>}
                    {firstname && <div>First name: {firstname}</div>}
                    {lastname && <div>Last name: {lastname}</div>}
                    {studentid && <div>Student id: {studentid}</div>}
                    <div>Email: {selectedRecipient.email}</div>
                    {address && <div>Address: {address}</div>}
                    {signDate && <div>Signed date: {signDate}</div>}
                    
                    {age && <div>Age: {age}</div>}
                    <div
                      style={{
                        color: blurry ? "black" : "none",
                        display: blurry ? "" : "none",
                      }}
                    >
                      {signature && (
                        <img
                          src={`data:image/png;base64,${signature}`}
                          alt="Signature"
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <p>No Recipient Selected</p>
                )}
              </div>
            </div>
          </div>
        </PDFExport>
      </div>
      <div className="review-button">
        <Link to={`/viewDoc/${docType}`}>
          <button className="cancel">Cancel</button>
        </Link>

        {blurry ? (
          <VisibilityIcon
            className="visibilityIcon"
            onClick={() => setBlur(false)} //setBlur to false
          />
        ) : (
          <VisibilityOffIcon
            className="visibilityOffIcon"
            onClick={() => setBlur(true)} //setBlur to true
          />
        )}

        <button className="export-pdf" onClick={handleExportWithComponent}>
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default ReviewDoc;
