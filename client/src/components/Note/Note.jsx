import React from "react";
import "./Note.scss";
import Edit from "../../img/home/edit.svg";
import Delete from "../../img/home/delete.svg";
function Note({ data }) {
  console.log(data);
  return (
    <div className="note">
      <div className="note-title">Notes</div>
      <div className="note-container">
        {data?.notes.map((note, index) => (
          <div className="note-item" key={index}>
            <span>{note.header}</span>{" "}
            <div className="icons">
              <img src={Edit} alt="Edit Icon" />
              <img src={Delete} alt="Delete Icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Note;
