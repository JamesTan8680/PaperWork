import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import DocControlList from "./DocControlList";
import "./DocControl.scss";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react'


function DocControl() {

  const [data, setData] = useState([])

  var {id} = useParams();
  const fetchFolders = async () => {
    try {
      const res = await axios.get("http://localhost:8800/view-document/document-template2/" + id);
      setData(res.data);

    } catch (err) { 
      console.error(err);
    }
  }
  const location = useLocation();

  useEffect(() => {
    // Fetch data when the component is first mounted
    fetchFolders();
  }, []);

  useEffect(() => {
    // Fetch data when the route changes back to /viewDoc/:id
    if (location.pathname === `/viewDoc/${id}`) {
      fetchFolders();
    }
  }, [location.pathname, id]);

  return (
    <>
      <BreadCrumbs />
      <div className="docControl">
        <DocControlList data={data} />
      </div>
    </>
  );
}

export default DocControl;
