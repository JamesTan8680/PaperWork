import React from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import "./Terms.scss";
function Terms({ editor, selected }) {
  return (
    <div className="term">
      <TextEditor editor={editor} selected={selected} />
    </div>
  );
}

export default Terms;
