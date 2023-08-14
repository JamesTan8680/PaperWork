import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ModalNote.scss";

function ModalNote({ showAddNotePopup, handleAddNote, setShowAddNotePopup }) {
  //manage the state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!showAddNotePopup) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className="modal">
        <div
          className="overlay"
          onClick={() => {
            setShowAddNotePopup(false);
          }}></div>
        <div className="content">
          <h1>Add New Note</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNote({
                header: e.target.title.value,
                content: e.target.content.value,
              });
            }}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title of the note"
              maxLength={35}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <span className="text-length">
              {35 - title.length} characters remaining
            </span>

            <label htmlFor="content">Content</label>
            <textarea
              className="content-text"
              type="text"
              id="content"
              placeholder="Content of the note...."
              maxLength={400}
              onChange={(e) => setContent(e.target.value)}
            />

            <span className="text-length">
              {400 - content.length} characters remaining
            </span>
            <button
              className="reset"
              type="button"
              onClick={(e) => {
                // Reset functionality: Clear the form fields
                e.currentTarget.form.reset();
              }}>
              Reset
            </button>

            <div className="btn">
              <button className="add" type="submit">
                Add
              </button>
              <button
                className="close"
                onClick={() => {
                  setShowAddNotePopup(false);
                }}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}

export default ModalNote;
