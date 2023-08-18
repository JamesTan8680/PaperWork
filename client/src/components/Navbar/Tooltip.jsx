import React, { useState } from "react";
<<<<<<< HEAD
import "./Navbar.scss";
=======
import "../../components/TextEditor/TextEditor.scss";
>>>>>>> CustomizeDoc

function Tooltip({ text, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && <div className="tooltip">{text}</div>}
      {children}
    </div>
  );
}

export default Tooltip;
