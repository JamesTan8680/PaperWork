import React from "react";
import ReactDOM from "react-dom";
import "./DeleteConfirmation.scss";

//DeleteConfirmation serve as for confirming note deletion
function DeleteConfirmation({ onDeleteConfirm, onCancel }) {
  return ReactDOM.createPortal(
    <div className="delete-overlay" onClick={onCancel}>
      <div className="delete-modal">
        <p>Are you sure you want to delete this note?</p>
        <button onClick={onDeleteConfirm}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default DeleteConfirmation;
