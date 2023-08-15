import React from "react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser"; //convert HTML strings to React elements
import { useState, useMemo } from "react";
import addButton from "../../img/textEditor/add-circle.svg";
import "./TextEditor.scss";
import DragAndDrop from "./DragAndDrop";

export default function TextEditor({ editor, title, selected, setContent }) {
  const [showAddInputPopup, setShowAddInputPopup] = useState(false);

  function handleDragStart(event) {
    var idMatch = drag.findIndex((item) => item.id === id);

    event.dataTransfer.setData("text/plain", drag[idMatch].input);
  }

  //create the state for the drag and drop

  const [drag, setDrag] = useState([]);
  const [id, setId] = useState("");
  //const [value, setValue] = useState("");
  const values = title;
  //variable for the input field
  //config of the react jodit
  const config = useMemo(
    () => ({
      readonly: false,

      buttons: ["bold", "italic", "underline", "|", "ul", "ol", "|", "align"],
      removeButtons: ["source", "about"],
      toolbarAdaptive: false,
    }),
    []
  );

  // const onChangeHandler = (event) => {
  //   setValue(event);
  // };

  const onChangeHandler = (event) => {
    setContent(event);
  };
  //handle on mouse over
  const handleOver = (id) => {
    setId(id);

    console.log(id);
  };
  return (
    <>
      <div>
        {selected === 3 ? (
          <>
            <div className="dragDropContainer">
              <h1>Drag and Drop</h1>
              <img
                className="addButton"
                src={addButton}
                alt="AddButton Icon"
                onClick={() => setShowAddInputPopup(true)}
              />
              {
                <DragAndDrop
                  show={showAddInputPopup}
                  setShow={setShowAddInputPopup}
                  setDrag={setDrag}
                />
              }
            </div>
            <div className="dragDropList">
              {drag?.map((item) => {
                return (
                  <div
                    className="input-list"
                    onMouseOver={() => handleOver(item.id)}
                    draggable={true}
                    onDragStart={handleDragStart}
                    key={item.id}>
                    {/* {item.input} */}
                    {item.name}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1>Please enter the Title of the Document</h1>
          </>
        )}
      </div>
      <div>
        <div className="this">
          <JoditEditor
            ref={editor}
            value={values}
            onBlur={onChangeHandler}
            config={config}
          />
        </div>
      </div>
    </>
  );
}
