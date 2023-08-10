import React from "react";
import "./Home.scss";
import Doc from "../../img/home/document.svg";
import Approval from "../../img/home/approval.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import RecentDoc from "../../components/RecentDoc/RecentDoc";
import Calendar from "../../components/Calendar/Calendar";
import axios from "axios";

function Home() {
  //Create a use state for notes
  const [notes, setNotes] = useState([]);
  //Create a use state for recentDocs
  const [recentDocs, setRecentDocs] = useState([]);
  //Fetch the notes data
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/homepage/notes");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);
  console.log(notes);

  useEffect(() => {
    const fetchRecentDocs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/homepage/documents/recently-created"
        );
        setRecentDocs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecentDocs();
  }, []);
  console.log(recentDocs);

  return (
    <div className="home">
      <div className="top">
        <div className="title">Document Summary</div>
        <div className="top-container">
          <Link to="">
            <div className="doc">
              <span>Documents</span>
              <div className="detail">
                <img src={Doc} alt="" />
                <span>53</span>
              </div>
            </div>
          </Link>
          <div className="pop-doc">
            <span className="container-title">Most Popular Documents</span>
            <div className="detail">
              <img src={Approval} alt="" />
              <span className="doc-title">Non-disclosure Agreement</span>
            </div>
            <Link to="/createDoc">
              <button>Create Document</button>
            </Link>
          </div>

          <Note />
        </div>
      </div>
      <div className="title">Note</div>
      <div className="mid">
        <div className="mid-container">
          {notes.map((note, index) => (
            <div className="container">
              <div className="card" key={index}>
                <h2>{note.header}</h2>
                <p>{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="title">Recent Created Documents</div>

      <div className="bottom">
        <div className="bottom-left">
          <RecentDoc
            // document_id={recentDoc.document_template_id}
            // version={recentDoc.version}
            // date_created={recentDoc.date_created}
            docData={recentDocs}
          />
        </div>

        <div className="bottom-right">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Home;
