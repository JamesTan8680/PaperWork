import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./DragAndDrop.scss";
import uuid from "react-uuid";

function DragAndDrop({ show, setShow, setDrag }) {
  //state for the input
  const [name, setName] = useState("");
  const [hint, setHint] = useState("");
  //handle the modal to close
  const closeModal = () => {
    setShow(false);
  };

  const saveModal = () => {
    if (name.length !== 0 && hint.length !== 0) {
      const combine = `<input className='data' name='${name}' title='${hint}' >`;
      setDrag((prev) => [...prev, { name: name, id: uuid(), input: combine }]);
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
        <p>**Adding Input Field**</p>
        <div className="mid-container">
          <span>Name:</span>
          <input
            type="text"
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
          />
          <span>{20 - name.length}</span>
          <span>Hint:</span>
          <textarea maxLength={100} onChange={(e) => setHint(e.target.value)} />
          <span>{100 - hint.length}</span>
        </div>
        <button onClick={saveModal}>Save</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default DragAndDrop;
