import React from "react";
import "./CustomizeDoc.scss";
import Doc from "../../img/home/doc.svg";
import { useState, useRef } from "react";
import TextEditor from "../../components/TextEditor/TextEditor";

export default function CustomizeDoc() {
  const docTitle = "Non-Disclosure Agreement";

  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="customiseDoc">
      <div className="top-customiseDoc">
        <div className="headerDoc">
          <img src={Doc} alt="DocIcon" />
          <span>Template view</span>
        </div>
      </div>

      <div className="bottom-customiseDoc">
        <div className="left-customiseDoc">
          <div className="doc-title">{docTitle}</div>
          <div className="content-customiseDoc">
            <div className="doc-parties">
              <b>Parties</b>
              <span>Note: Put the Parties Name Here That Involve</span>
            </div>
            <div className="doc-terms">
              <b>Terms</b>
              <span>Note: Put the Document Terms Here That Involve</span>
            </div>
            <div className="doc-signature">
              <b>Signature Configuration</b>
            </div>
          </div>
        </div>
        <div className="right-customiseDoc">
          <TextEditor
            content={content}
            setContent={setContent}
            editor={editor}
          />
        </div>
      </div>
    </div>
  );
}
