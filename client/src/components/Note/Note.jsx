import React from "react";
import "./Note.scss";
import Edit from "../../img/home/edit.svg";
import Delete from "../../img/home/delete.svg";
function Note() {
  return (
    <div className="note">
      <div className="note-title">Notes</div>
      <div className="note-container">
        <div className="note-item">
          <span>this is sth</span>
          <div className="icons">
            <img src={Edit} alt="" />
            <img src={Delete} alt="" />
          </div>
        </div>
        <div className="note-item">
          <span>this is sth</span>
          <div className="icons">
            <img src={Edit} alt="" />
            <img src={Delete} alt="" />
          </div>
        </div>
        <div className="note-item">
          <span>this is sth</span>
          <div className="icons">
            <img src={Edit} alt="" />
            <img src={Delete} alt="" />
          </div>
        </div>
        <div className="note-item">
          <span>this is sth</span>
          <div className="icons">
            <img src={Edit} alt="" />
            <img src={Delete} alt="" />
          </div>
        </div>
        <div className="note-item">
          <span>this is sth</span>
          <div className="icons">
            <img src={Edit} alt="" />
            <img src={Delete} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
