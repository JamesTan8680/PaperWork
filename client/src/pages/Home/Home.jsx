import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import Doc from "../../img/home/document.svg";
import Approval from "../../img/home/approval.svg";
import { Link } from "react-router-dom";
import RecentDoc from "../../components/RecentDoc/RecentDoc";
import Calendar from "../../components/Calendar/Calendar";
import Note from "../../components/Note/Note";

const BASE_URL = "http://localhost:8800/homepage";

function Home() {
  const [data, setData] = useState({
    totalDocs: 0,
    mostPopularDocs: [],
    notes: [],
    recentDocs: [],
  });
  const [error, setError] = useState(null);
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);

  const addNote = async (noteData) => {
    try {
      const response = await axios.post(`${BASE_URL}/notes`, noteData);
      if (response.data && response.data.message) {
        setData((prevData) => ({
          ...prevData,
          notes: [
            ...prevData.notes,
            {
              note_id: response.data.note_id,
              ...noteData,
            },
          ],
        }));
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const handleAddNote = (noteData) => {
    addNote({
      date_created: new Date().toISOString().slice(0, 10),
      person_created: "YourUserName",
      ...noteData,
    });
    setShowAddNotePopup(false);
  };
  const handleReset = (formElement) => {
    formElement.reset();
  };

  const handleClose = () => {
    setShowAddNotePopup(false);
  };
  const onUpdate = () => {
    fetchAllNotes();
  };

  const fetchAllNotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`);
      setData((prevData) => ({ ...prevData, notes: res.data }));
    } catch (err) {
      console.error("Error fetching all notes:", err);
    }
  };

  const fetchData = async () => {
    try {
      const [
        totalDocsResponse,
        mostPopularDocsResponse,
        recentDocsResponse,
        notesResponse,
      ] = await Promise.all([
        axios.get(`${BASE_URL}/documents/total`),
        axios.get(`${BASE_URL}/documents/most-popular`),
        axios.get(`${BASE_URL}/documents/recently-created`),
        axios.get(`${BASE_URL}/notes`),
      ]);
      setData({
        totalDocs: totalDocsResponse.data[0].total,
        mostPopularDocs: mostPopularDocsResponse.data,
        notes: notesResponse.data,
        recentDocs: recentDocsResponse.data,
      });
    } catch (err) {
      setError("There was an error fetching the data. Please try again.");
      console.error("Error during data fetching:", err);
    }
  };

  useEffect(() => {
    fetchAllNotes();
    fetchData();
  }, []);

  return (
    <div className="home">
      {/* Top Section */}
      <div className="top">
        <div className="title">Document Summary</div>
        <div className="top-container">
          {/* Document Summary Section */}
          <Link to="">
            <div className="doc">
              <span>Documents</span>
              <div className="detail">
                <img src={Doc} alt="Document Icon" />
                <span>{data.totalDocs}</span>
              </div>
            </div>
          </Link>
          <div className="pop-doc">
            <span className="container-title">Most Popular Documents</span>
            <div className="detail">
              <img src={Approval} alt="Approval Icon" />
              {data.mostPopularDocs.map((doc, index) => (
                <div key={index}>
                  <span className="doc-title">{doc.title}</span>
                </div>
              ))}
            </div>
            <Link to="/createDoc">
              <button>Create Document</button>
            </Link>
          </div>
          <div className="note-section">
            <div className="note-header"></div>
            <Note data={data} onUpdate={onUpdate} />
            <button
              className="add-button"
              onClick={() => setShowAddNotePopup(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {showAddNotePopup && (
              <div className="add-note-popup">
                <h3>Add New Note</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddNote({
                      header: e.target.header.value,
                      content: e.target.content.value,
                    });
                  }}>
                  <label>
                    Header:
                    <input type="text" name="header" required />
                  </label>
                  <label>
                    Content:
                    <textarea name="content" required></textarea>
                  </label>
                  <button type="submit">Add Note</button>
                  <button
                    type="button"
                    onClick={(e) => {
                      // Reset functionality: Clear the form fields
                      e.currentTarget.form.reset();
                    }}>
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Close functionality: Hide the popup
                      setShowAddNotePopup(false);
                    }}>
                    Close
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes Display Section */}

      <div className="mid">
        <div className="mid-container">
          {data.notes.map((note, index) => (
            <div className="container" key={index}>
              <div className="card">
                <h2>{note.header}</h2>
                <p>{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="title">Recent Created Documents</div>
      <div className="bottom">
        <div className="bottom-left">
          <RecentDoc docData={data.recentDocs} />
        </div>
        <div className="bottom-right">
          <Calendar />
        </div>
      </div>

      {/* Error Display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
