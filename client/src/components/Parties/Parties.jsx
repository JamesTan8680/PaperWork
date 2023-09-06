import React, { useState, useEffect } from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";
import axios from "axios";

function Parties({itemId, partyList, setPartyList, updateParties, party}) {
  const [selected, setSelected] = useState("Select Parties Name");
  const [partiesList, setPartiesList] = useState([]);

  const getParties = async () => {
    try {
      axios
        .get("http://localhost:8800/customise-document/"+ itemId + "/parties")
        .then((res) => {
          //match template type version with the id
          setPartiesList(res.data);
          console.warn("got parties");
          console.warn(res.data);
        });
    } catch (err) {
      document.write("Error fetching parties ", err);
    }
  }

  useEffect(() => {
    getParties();
  }, [partyList]);




  return (
    <>
      <div className="parties-container">
        <div className="parties-title">Parties</div>
      </div>
      {partiesList.map((party,index) => (
        <div className="party-name" key={index}>{party.partiesId}</div>
      ))}

      <Dropdown
        selectedParties={partiesList}
        setSelectedParties={setPartiesList}
        partyList={partyList}
        setPartyList={setPartyList}
      />
    </>
  );
}

export default Parties;
