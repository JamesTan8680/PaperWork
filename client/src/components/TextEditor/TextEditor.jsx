import React from "react";
import JoditEditor from "jodit-react";
//import HTMLReactParser from "html-react-parser"; //convert HTML strings to React elements
import { useState, useMemo } from "react";
import addButton from "../../img/textEditor/add-circle.svg";
import removeButton from "../../img/textEditor/delete-circle.svg";
import "./TextEditor.scss";
import DragAndDrop from "./DragAndDrop";
import Tooltip from "../Navbar/Tooltip";

export default function TextEditor({
  editor,
  title,
  selected,
  setContent,
  setTitle,
  inputList,
  setInputList,
  page,
}) {
  const [showAddInputPopup, setShowAddInputPopup] = useState(false);

  function handleDragStart(event) {
    var idMatch = inputList.findIndex((item) => item.id === id);

    event.dataTransfer.setData("text/plain", inputList[idMatch].input);
  }

  console.log(title);
  //create the state for the drag and drop

  const [id, setId] = useState("");
  //const [value, setValue] = useState("");
  const values = title;
  //variable for the input field
  //config of the react jodit
  const config = useMemo(
    () => ({
      readonly: false,

      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "align",
        "fontsize",
      ],
      removeButtons: ["source", "about"],
      toolbarAdaptive: false,
    }),
    []
  );

  const onChangeHandler = (event) => {
    if (page === "title") {
      setTitle(event);
    } else if (page === "content") {
      setContent(event);
    }
  };
  //handle on mouse over
  const handleOver = (id) => {
    setId(id);

    console.log(id);
  };

  const handleRemoveItem = (id) => {
    const updatedDrag = inputList.filter((item) => item.id !== id);
    setInputList(updatedDrag);
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
                  setInputList={setInputList}
                  inputList={inputList} //Pass the drag array for checking
                />
              }
            </div>
            <div className="dragDropList">
              {inputList?.map((item) => {
                return (
                  <div
                    className="input-list"
                    onMouseOver={() => handleOver(item.id)}
                    draggable={true}
                    onDragStart={handleDragStart}
                    key={item.id}>
                    <div className="tooltip-container">
                      <img
                        className="removeButton"
                        src={removeButton}
                        alt="RemoveButton Icon"
                        onClick={() => {
                          handleRemoveItem(item.id);
                        }}
                      />

                      <Tooltip text={item.hint}>{item.name}</Tooltip>
                    </div>
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
      <div className="editor">
        <div className="this">
          <JoditEditor
            ref={editor}
            value={values}
            onBlur={onChangeHandler}
            config={config}
          />
        </div>
        {/* This is for testing and can be delete afterwards */}
        {/* <div>{HTMLReactParser(values)}</div> */}
      </div>
    </>
  );
}
