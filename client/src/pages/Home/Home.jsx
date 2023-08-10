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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalDocsResponse = await axios.get(
          `${BASE_URL}/documents/total`
        );
        const mostPopularDocsResponse = await axios.get(
          `${BASE_URL}/documents/most-popular`
        );
        const recentDocsResponse = await axios.get(
          `${BASE_URL}/documents/recently-created`
        );
        const notesResponse = await axios.get(`${BASE_URL}/notes`);

        setData({
          totalDocs: totalDocsResponse.data[0].total,
          mostPopularDocs: mostPopularDocsResponse.data,
          notes: notesResponse.data,
          recentDocs: recentDocsResponse.data,
        });
      } catch (err) {
        console.error("Error during data fetching:", err);
        setError("There was an error fetching the data. Please try again.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // console.log(notes);

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
                  <span className="doc-title">{doc.document_template_id}</span>
                </div>
              ))}
            </div>
            <Link to="/createDoc">
              <button>Create Document</button>
            </Link>
          </div>
          {/* <div className="note">
            <div className="note-title">Notes</div>
            <div className="note-container">
              {data.notes.map((note, index) => (
                <div className="note-item" key={index}>
                  <span>{note.header}</span>{" "}
                  <div className="icons">
                    <img src={Edit} alt="Edit Icon" />
                    <img src={Delete} alt="Delete Icon" />
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <Note data={data} />
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
