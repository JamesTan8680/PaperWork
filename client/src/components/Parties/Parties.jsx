import React from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";
// import axios from "axios";

function Parties({ partiesList, setPartiesList }) {
  return (
    <>
      <div className="parties-container">
        <div className="parties-title">Parties</div>
      </div>
      {partiesList.map((party, index) => (
        <div className="party-name" key={index}>
          {party.partiesId}
        </div>
      ))}

      <Dropdown parties={partiesList} setParties={setPartiesList} />
    </>
  );
}

export default Parties;
