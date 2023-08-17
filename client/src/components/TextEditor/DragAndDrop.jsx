import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./DragAndDrop.scss";
import uuid from "react-uuid";

function DragAndDrop({ show, setShow, setInputList, inputList }) {
  //state for the input
  const [name, setName] = useState("");
  const [hint, setHint] = useState("");
  //handle the modal to close
  const closeModal = () => {
    setShow(false);
    setName("");
    setHint("");
  };

  const saveModal = () => {
    if (name.length !== 0 && hint.length !== 0) {
      // To check there is any element in array matches name
      const checkDuplicate = inputList.some((item) => item.name === name);

      if (checkDuplicate) {
        alert("Name already exists. Please enter a new Name!");
      } else {
        const combine = `<input className='data' name='${name}' title='${hint}' placeholder="${hint}" readonly>`;
        setInputList((prev) => [
          ...prev,
          { name: name, id: uuid(), input: combine, hint: hint },
        ]);
      }
      setName("");
      setHint("");
      setShow(false);
    } else {
      alert("Please type something into the field!");
    }
  };

  if (!show) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="content-drag">
        <h2>Add Input Field</h2>
        <div className="mid-container">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="character-count">
            {20 - name.length} Characters remaining
          </span>
          <label htmlFor="hint">Hint:</label>
          <textarea
            id="hint"
            maxLength={100}
            onChange={(e) => setHint(e.target.value)}
          />
          <span className="character-count">
            {100 - hint.length} Characters remaining
          </span>
        </div>
        <div className="btn">
          <button className="buttons" onClick={saveModal}>
            Save
          </button>
          <button className="buttons" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default DragAndDrop;
