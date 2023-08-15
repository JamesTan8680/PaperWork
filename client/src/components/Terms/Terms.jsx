import React from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import "./Terms.scss";
function Terms({ editor, selected, terms, setContent }) {
  return (
    <div className="term">
      <TextEditor
        editor={editor}
        title={terms}
        selected={selected}
        setContent={setContent}
      />
    </div>
  );
}

export default Terms;
