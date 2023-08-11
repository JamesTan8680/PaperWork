import React, { useState } from "react";
import axios from "axios";
import "./Note.scss";
import Edit from "../../img/home/edit.svg";
import Delete from "../../img/home/delete.svg";
import Plus from "../../img/home/plus.svg";

function Note({ data, onUpdate, setShowAddNotePopup }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editHeader, setEditHeader] = useState("");
  const [editContent, setEditContent] = useState("");

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/homepage/notes/${noteId}`
      );
      if (response.data && response.data.message) {
        console.log(response.data.message);
        onUpdate();
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleEditClick = (note) => {
    setEditNoteId(note.note_id);
    setEditHeader(note.header);
    setEditContent(note.content);
    setShowEditModal(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8800/homepage/notes/${editNoteId}`, {
        header: editHeader,
        content: editContent,
      });
      setShowEditModal(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditNoteId(null);
    setEditHeader("");
    setEditContent("");
  };

  return (
    <div className="note">
      <div className="note-title">
        Notes
        <button
          className="add-button"
          onClick={() => setShowAddNotePopup(true)}
        >
          <img src={Plus} alt="" />
        </button>
      </div>
      <div className="note-container">
        {data?.notes.map((note, index) => (
          <div className="note-item" key={index}>
            <span>{note.header}</span>
            <div className="icons">
              <img
                src={Edit}
                alt="Edit Icon"
                onClick={() => handleEditClick(note)}
              />
              <img
                src={Delete}
                alt="Delete Icon"
                onClick={() => deleteNote(note.note_id)}
              />
            </div>
          </div>
        ))}

        {/* Edit Modal */}

        {showEditModal && (
          <div className="container">
            <div className="edit-modal">
              <h3>Edit Note</h3>
              <label>
                Title
                <input
                  type="text"
                  value={editHeader}
                  onChange={(e) => setEditHeader(e.target.value)}
                />
              </label>
              <label>
                Content
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
              </label>
              <button onClick={handleSaveClick}>Save Changes</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
