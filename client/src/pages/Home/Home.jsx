import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import Doc from "../../img/home/document.svg";
import Approval from "../../img/home/approval.svg";
import { Link } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import RecentDoc from "../../components/RecentDoc/RecentDoc";

const BASE_URL = "http://localhost:8800/homepage";

function Home() {
  const [data, setData] = useState({
    totalDocs: 0,
    mostPopularDocs: [],
    notes: [],
  });
  const [error, setError] = useState(null);

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
          {data.notes.map((note, index) => (
            <div key={index}>
              <h2>{note.header}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="title">Note</div>
      <div className="mid">
        <div className="mid-container">
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
          <div className="container">
            <div className="card">this is sth</div>
          </div>
        </div>
      </div>
      <div className="title">Recent Created Documents</div>
      <div className="bottom">
        <div className="bottom-left">
          <div className="bottom-left">
            <RecentDoc />
          </div>
        </div>
        <div className="bottom-right">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Home;
