import React, { useState, useEffect } from "react";
import "./DocControlList.scss";

import partiesIcon from "../../img/docControl/partiesIcon.svg";
import reviewIcon from "../../img/docControl/reviewIcon.svg";
import sendIcon from "../../img/docControl/sendIcon.svg";
import greysendIcon from "../../img/docControl/greysendIcon.svg";
import lockIcon from "../../img/docControl/lockIcon.png";
import editIcon from "../../img/home/editIcon2.svg";
import DocModal from "./DocModal/DocModal";
import { Link, useParams } from "react-router-dom";
import GroupViewModal from "../../components/GroupViewModal/GroupViewModal";
import axios from "axios";

const DocControlList = ({ data }) => {
  // Initialize progress property for each item in the data
  const [updatedData, updateData] = useState(data);

  useEffect(() => {
    updateData(
      data
        .map((item) => ({
          ...item,
          issue_date: Date.now(),
          progress: 0,
        }))
        .reverse()
    );
  }, [data]);

  //using this state to manage the state for the DocModal
  const [show, setShow] = useState(false);
  //state for the title of the document
  const [metadata, setMetadata] = useState([]);
  const totalParties = 5; //Assume Total Parties is 5
  // state to manage THE groupviewModal to open or close
  const [viewOpen, setViewOpen] = useState(false);
  // Set the state to hold the data with the progress property
  const [dataWithProgress, setDataWithProgress] = useState(updatedData);
  const [expanded, setExpanded] = useState(false);

  const [itemProgress, setItemProgress] = useState(
    dataWithProgress.map(() => 0)
  );

  const handleSignDocument = (itemId) => {
    const updatedData = dataWithProgress.map((item) => {
      //Create new array map over the old one
      if (item.id === itemId && item.progress < totalParties) {
        return {
          ...item,
          progress: item.progress + 1,
        };
      }
      return item; //Else return the item as-is
    });

    setDataWithProgress(updatedData); //Update the state with modified progress values
  };

  //function for handling sign document to handle progress bars move independently
  const handleSignDocument1 = (itemIndex) => {
    if (dataWithProgress[itemIndex].progress < totalParties) {
      const newProgress = [...itemProgress];
      newProgress[itemIndex]++;
      setItemProgress(newProgress);
    }
  };

  var { id } = useParams();

  const fetchParentMetadata = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/view-document/document-template/type/" + id
      );
      setMetadata(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(metadata);

  useEffect(() => {
    fetchParentMetadata();
    setDataWithProgress(
      expanded ? updatedData : updatedData.length == 0 ? [] : [updatedData[0]]
    );
  }, [updatedData, expanded]);

  // console.log("data");
  // console.log(data);
  // console.log("updatedData");
  // console.log(updatedData);
  // console.log("dataWithProgress");
  // console.log(dataWithProgress);

  // TODO: Do a third query that checks progress

  return (
    <>
      <div className="docControlHeader">
        <h3>DATA CREATED</h3>
        <h3>DATA MODIFIED</h3>
        <h3>ISSUE DATE</h3>
      </div>

      <div className="docControlWrapper">
        <div className="documentTitle">
          <p>{metadata.title}</p>
          <p className="docuementLatestVersion">
            Version {dataWithProgress[0]?.version}
          </p>
          <a
            href="#"
            onClick={() => setExpanded(!expanded)}
            className="otherdocument"
          >
            {expanded ? "Latest Version" : "Other Versions..."}
          </a>
        </div>
      </div>

      <div className="docControlList">
        <div className="table">
          {dataWithProgress.map((item, index) => (
            <div key={index} className="table-row">
              <span className="item-id">
                <div className="wrap-item-id">{item.id}</div>
                Version {item.version}
                {/* TODO: Do a if else statement here when itis pending! the img src will be editIcon instead of lockIcon
                Else the version will be lock, not able to edit */}
                {item.progress < totalParties ? (
                  // <Link to={"/editDoc/:id"}>
                  //   <img src={editIcon} alt="edit" className="editicon" />
                  // </Link>

                  <Link to={`/editDoc/${item.document_template_id}`}>
                    <img src={editIcon} alt="edit" className="editicon" />
                  </Link>
                ) : (
                  <img src={lockIcon} alt="Lock" className="lockicon" />
                )}
              </span>
              <span className="item_created">
                {new Date(item.created_date).toLocaleDateString("en-UK")}
              </span>
              <span className="item_modified">
                {new Date(item.date_modified).toLocaleDateString("en-UK")}
              </span>
              <span className="issue_date">
                {new Date(item.issue_date).toLocaleDateString("en-UK") +
                  " (dummy)"}
              </span>
              <div className="additional_info">
                <div className="status">
                  {item.progress < totalParties ? "Pending!" : "Approved!"}
                </div>

                <div className="pro-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(item.progress / totalParties) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {item.progress < totalParties && (
                <button onClick={() => handleSignDocument(item.id)}>
                  Sign Document
                </button>
              )}
              {/* <span
                className="item-version"
                onClick={() => handleSignDocument(item.id)}
              >
                Version {item.version}
              </span> */}

              <div className="icons">
                {/* Not matter parties approve or not we still need to view the parties info */}
                <span className="parties-icon">
                  {item.id && (
                    <img
                      src={partiesIcon}
                      alt="Parties Icon "
                      className="partiesicon"
                      onClick={() => {
                        setViewOpen((prev) => !prev);
                      }}
                    />
                  )}
                </span>
                <Link to="/ReviewDoc">
                  <img
                    src={reviewIcon}
                    alt="Review Icon"
                    className="reviewicon"
                  />
                </Link>

                <span className="send-icon">
                  {item.progress < totalParties ? (
                    <img
                      src={greysendIcon}
                      alt="Send Icon"
                      className="transsendicon"
                    />
                  ) : (
                    <img
                      src={sendIcon}
                      alt="Send Icon "
                      className="sendicon"
                      onClick={() => setShow((s) => !s)}
                    />
                  )}
                </span>
              </div>
            </div>
          ))}
          <DocModal show={show} setShow={setShow} title={title} />
          <GroupViewModal viewOpen={viewOpen} setViewOpen={setViewOpen} docId="Type_A_1.4" />

        </div>
      </div>
    </>
  );
};

export default DocControlList;
