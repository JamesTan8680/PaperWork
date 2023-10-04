import React from "react";
import ReactDOM from "react-dom";
import "./DocModal.scss";
import { useState } from "react";
import Cross from "../../../img/docControl/cross.svg";
import uuid from "react-uuid";
import SuccessfulePage from "./SuccessfulPage";
import emailjs from "@emailjs/browser";
import CryptoJS from "crypto-js";

function DocModal({ show, setShow, title, doc_id }) {
  //manage the state for the send button
  const [open, setOpen] = useState(false);
  //save the email that user type inside the input
  const [elements, setElements] = useState([]);
  //handle state change for the email
  const [email, setEmail] = useState("");
  //handle state of the error
  const [error, setError] = useState("");
  //handle state of the id that user has been selected from the email list
  const [selectedIds, setSelectedIds] = useState([]);
  //handle the state for the emial js if something went wrong
  const [result, setResult] = useState("yes");
  //state that handle the disable to avoid more click to the send button
  const [disable, setDisable] = useState(false);
  //handle Close Modal event to close the portal
  const closeModal = () => {
    setShow(false);
    setElements([]);
    setDisable(false);
  };

  //handle the change event of the input for the email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  //handle the add into the elements list
  const handleAdd = () => {
    if (email !== "") {
      if (email.includes("@")) {
        if (elements?.find((e) => e.name === email)) {
          setError("Please enter the different email!");
        } else {
          setError("");
          setElements((prev) => [...prev, { name: email, id: uuid() }]);
        }
      } else {
        setError("Please insert the Corrrect Email format!");
      }
    } else {
      setError("Please Enter the Email!");
    }
    setEmail("");
  };

  //hadle the highligh the element when clicked

  const handleElementClick = (id) => {
    // Check if the element is already selected
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // Add the element to the selectedIds array
      setSelectedIds([...selectedIds, id]);
    }
  };

  //handle remove the email from the list
  const handleRemove = () => {
    const filteredElements = elements.filter(
      (element) => !selectedIds.includes(element.id)
    );
    setElements(filteredElements);
  };
  //handle close
  const handleClose = () => {
    //closeModal();
    setOpen((s) => !s);
    setElements([]);
  };
  //handle on send
  const onSend = () => {
    if (elements.length === 0) {
      setError("Please add the email address to the list!");
    } else {
      var emailsArray = elements.map((item) => item.name);
      console.log(emailsArray);

      //covert the title from the text editor format into string
      const parser = new DOMParser();
      // Parse the HTML snippet
      const doc = parser.parseFromString(title, "text/html");
      // Extract the text content
      const text = doc.body.textContent;
      emailsArray.forEach((item) => {
        var templateParams = {
          docName: text,
          message: `Please kindly check and sign the document that was created by the Paperwork Team via URL: localhost:3000/${CryptoJS.AES.encrypt(
            item,
            process.env.REACT_APP_SECRET_KEY
          ).toString()}/${CryptoJS.AES.encrypt(
            doc_id,
            process.env.REACT_APP_SECRET_KEY
          ).toString()}`,
          email: item,
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
              setOpen((s) => !s);
              setResult("yes");
            },
            (error) => {
              console.log(error.text);
              setResult("no");
              setOpen((s) => !s);
            }
          );
      });
      //email js api request method
    }
  };
  const onSendToDatabase = () => {
    if (elements.length === 0) {
      setError("Please add the email addresses to the list!");
    } else {
      const emailsArray = elements.map((item) => item.name);
      const apiUrl = `http://localhost:8800/send-document/container/${doc_id}`;

      // Define the request body as an array of emails
      const requestBody = emailsArray;

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.ok) {
            console.log("API request was successful.");
            setOpen((s) => !s);
          } else {
            console.error("API request failed.");
            setOpen((s) => !s);
          }
        })
        .catch((error) => {
          console.error("Error making API request:", error);
          setOpen((s) => !s);
        });
    }
  };

  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="content-doc">
        <div className="wrapper">
          <div className="header-popup">
            <div className="title">Send</div>
            {/* <h1>{process.env.REACT_APP_SECRET_KEY}</h1> */}
            <img src={Cross} alt="" onClick={closeModal} />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
              value={email}
            />
            {error && <div className="error">{error}</div>}
            <button onClick={handleAdd}>Add</button>
          </div>

          <h5>Recipient List:</h5>
          <div className="container">
            {elements?.map((element) => (
              <span
                key={element.id}
                onClick={() => handleElementClick(element.id)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedIds.includes(element.id)
                    ? "bold"
                    : "normal",
                }}
                className="email">
                {element.name}
              </span>
            ))}
          </div>
          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
          <div className="send-button">
            <button
              className={`${disable ? "send-btn disabled" : "send-btn"}`}
              disabled={disable}
              onClick={() => {
                setDisable(true);
                onSend();
                onSendToDatabase();
                console.log("hi");
              }}>
              Send
            </button>
            <SuccessfulePage
              closeModal={handleClose}
              open={open}
              result={result}
            />
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default DocModal;
