import React from "react";
import DocList from "../../components/DocList/DocList";
import "./ViewDoc.scss";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Sort from "../../img/viewDoc/sort.svg";
import { useSelector } from "react-redux";

function ViewDoc() {
  //creat dummy data
  const data = useSelector((state) => state.data);

  return (
    <>
      <BreadCrumbs />
      <div className="viewDoc">
        <div className="header">
          <span>Document Title</span>
          <div className="icon">
            <img src={Sort} alt="" />
            <div>A-Z</div>
          </div>
        </div>
        <div className="container">
          <DocList data={data} />
        </div>
      </div>
    </>
  );
}

export default ViewDoc;
