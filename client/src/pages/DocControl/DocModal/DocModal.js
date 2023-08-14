import React from "react";
import ReactDOM from "react-dom";
import "./DocModal.scss";
import { useState } from "react";
import Cross from "../../../img/docControl/cross.svg";
import uuid from "react-uuid";
import SuccessfulePage from "./SuccessfulPage";

function DocModal({ show, setShow }) {
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
  //handle Close Modal event to close the portal
  const closeModal = () => {
    setShow(false);
  };

  //handle the change event of the input for the email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  //handle the add into the elements list
  const handleAdd = () => {
    if (email !== "") {
      if (email.includes("@")) {
        if (elements.find((e) => e.name === email)) {
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
    closeModal();
    setOpen((s) => !s);
  };
  //handle on send
  const onSend = () => {
    if (elements.length === 0) {
      setError("Please add the email addres to the list!");
    } else {
      setOpen((s) => !s);
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
            {elements.map((element) => (
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
            <button className="send-btn" onClick={onSend}>
              Send
            </button>
            <SuccessfulePage closeModal={handleClose} open={open} />
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
