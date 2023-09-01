import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import DocControlList from "./DocControlList";
import "./DocControl.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react'


function DocControl() {

  const [data, setData] = useState([])

  var {id} = useParams();
  const fetchFolders = async () => {
    try {
      const res = await axios.get("http://localhost:8800/view-document/document-template/" + id);
      setData(res.data);

    } catch (err) { 
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchFolders();
  },[]);

  console.log(data);

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
