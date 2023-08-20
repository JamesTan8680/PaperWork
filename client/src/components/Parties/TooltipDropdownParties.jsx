import React, { useState } from "react";
import "./TooltipDropdownParties.scss";

function TooltipDropdownParties({ text, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  //Split content using new line character
  const tooltipContent = text
    .split("\n")
    .map((newText, index) => <p key={index}>{newText}</p>);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && <div className="tooltip">{tooltipContent}</div>}
      {children}
    </div>
  );
}

export default TooltipDropdownParties;
