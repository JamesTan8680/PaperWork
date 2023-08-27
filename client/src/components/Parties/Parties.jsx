import React, { useState, useEffect } from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";

function Parties({ selectedParty }) {
  const [selected, setSelected] = useState("Select Parties Name");
  const [partiesList, setPartiesList] = useState([]);

  useEffect(() => {
    console.log(`Number of parties: ${partiesList.length}`);
  }, [partiesList]);
  return (
    <>
      <div className="parties-container">
        <div className="parties-title">Parties</div>
      </div>
      {partiesList.map((party) => (
        <div className="party-name" key={party}></div>
      ))}

      <Dropdown
        selected={selected}
        setSelected={setSelected}
        selectedParties={partiesList}
        setSelectedParties={setPartiesList}
        onSelect={() => {}}
      />
    </>
  );
}

export default Parties;
