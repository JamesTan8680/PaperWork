import React, { useState } from "react";
import "./Parties.scss";
import Dropdown from "./DropdownParties";
function Parties() {
  const [selected, setSelected] = useState("Select Parties Name");

  return (
    <>
      <div className="parties-container">
        <div className="parties-title">Parties</div>
      </div>

      <div className="parties-name">Parties Name</div>

      <Dropdown selected={selected} setSelected={setSelected} />
    </>
  );
}

export default Parties;
