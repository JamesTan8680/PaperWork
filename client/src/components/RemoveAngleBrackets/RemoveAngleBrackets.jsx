// components/RemoveAngleBracketsComponent.jsx

import React from "react";

function RemoveAngleBrackets({ input = "" }) {
  function removeAngleBrackets(inputStr) {
    return inputStr.replace(/<[^>]+>/g, "");
  }

  return <span>{removeAngleBrackets(input)}</span>;
}

export default RemoveAngleBrackets;
