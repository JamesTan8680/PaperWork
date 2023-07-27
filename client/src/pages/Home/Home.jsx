import React from "react";
import "./Home.scss";
import Doc from "../../img/home/document.svg";
import Approval from "../../img/home/approval.svg";
import { Link } from "react-router-dom";

import Note from "../../components/Note/Note";
import RecentDoc from "../../components/RecentDoc/RecentDoc";
function Home() {
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
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
          <div className="card">this is sth</div>
        </div>
      </div>
      <div className="title">Recent Created Documents</div>
      <div className="bottom">
        <div className="bottom-left">
          <RecentDoc />
        </div>
        <div className="bottom-right">calendar</div>
      </div>
    </div>
  );
}

export default Home;
