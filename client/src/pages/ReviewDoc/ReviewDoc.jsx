import React, { useState, useEffect } from "react";
import "./ReviewDoc.scss";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ReviewDoc() {
  let { id } = useParams();

  const [title, setTitle] = useState("");
  //creating type useState
  const [type, setType] = useState("");
  const [version, setVersion] = useState("");
  const [recipients, setRecipients] = useState("");
  const [parties, setParties] = useState([]);
  const [content, setContent] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  useEffect(() => {
    // Fetching data from two endpoints using axios
    axios
      .all([
        axios.get("http://localhost:8800/create-document/default-templates"),
        axios.get(`http://localhost:8800/parties`),
        axios.get("http://localhost:8800/view-document/receipients/Type_A_1.4"),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          setTitle(response1.data[0].docTitle || "");
          setType(response1.data[0].template.type);
          setVersion(response1.data[0].template.version || "");
          setParties(response2.data);
          setRecipients(response3.data);
          setContent(response1.data[0].template.term || "");

          // If a callback for fetched data has been provided, call it
        })
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log();
  console.log("title*** ", title);
  console.log("version** ", version);
  console.log("content** ", content);
  console.log("type ** ", type);
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

    if (recipients && recipients.length > 0) {
      return (
        <div>
          <select
            onChange={handleRecipientChange}
            value={selectedRecipient ? selectedRecipient.identity_id : ""}
          >
            {recipients?.map((recipient) => (
              <option key={recipient.identity_id} value={recipient.identity_id}>
                {recipient.firstname}
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
        <div className="recipient">
          <div className="recipient-dropdown">
            <RecipientDropdown />
          </div>
          <div className="version">{HTMLReactParser(version)}</div>
        </div>
        <div className="header">{HTMLReactParser(title)}</div>

        <div className="parties">
          <h3>Party</h3>

          {parties?.map((item) => {
            return (
              <div className="party">
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
              {parties?.map((item) => {
                return (
                  <div className="party_sign">
                    <div className="Dname">
                      Discloser Name: {item.parties_name}
                    </div>
                    <div className="Sname">Signature: {item.parties_name}</div>
                    <div className="Sdate">Date: 8/31/2023</div>
                  </div>
                );
              })}
            </div>
            <div className="recipient_side">
              {selectedRecipient ? (
                <>
                  <div>Name: {selectedRecipient.firstname}</div>
                  {/* <div>Address: {selectedRecipient.address}</div> */}
                  <div>Email: {selectedRecipient.email}</div>
                  {/* You can add other details if the recipient object has more fields */}
                </>
              ) : (
                <p>No Recipient Selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="review-button">
        <Link to="/viewDoc/1">
          <button className="cancel">Cancel</button>
        </Link>
        <button className="export-pdf">Export PDF</button>
      </div>
    </div>
  );
}

export default ReviewDoc;
