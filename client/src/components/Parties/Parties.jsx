import React, { useState } from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";

function Parties({ partyList, setPartyList }) {
  const [selected, setSelected] = useState("Select Parties Name");
  const [partiesList, setPartiesList] = useState([]);

  // useEffect(() => {
  //   console.log(`Number of parties: ${partiesList.length}`);
  // }, [partiesList]);
  console.log(partyList);
  console.log(partiesList);
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
        partyList={partyList}
        setPartyList={setPartyList}
      />
    </>
  );
}

export default Parties;
