import React from "react";
import Folder from "../../../img/viewDoc/folder.svg";
import "./Doc.scss";
import { Link } from "react-router-dom";
function Doc({ data, id }) {
  return (
    <Link to={`${id}`}>
      <div className="doc">
        <div className="folder-icon">
          <img src={Folder} alt="" />
        </div>

        <div className="folder-detail">
          <div className="title">{data.title}</div>
          <div className="date">{data.date}</div>
          <div className="amount">{data.count} Items</div>
        </div>
      </div>
    </Link>
  );
}

export default Doc;
