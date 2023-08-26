import React, { useState } from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";
function Parties({ selectedParty }) {
  const [selected, setSelected] = useState("Select Parties Name");
  console.log(selectedParty);
  return (
    <>
      <div className="parties-container">
        <div className="parties-title">Parties</div>
      </div>
      <div className="parties-name">{selectedParty}</div>

      <Dropdown
        selected={selected}
        setSelected={setSelected}
        onSelect={() => {}}
      />
    </>
  );
}

export default Parties;
