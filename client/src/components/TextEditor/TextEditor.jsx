import React from "react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser"; //convert HTML strings to React elements
import { useState, useMemo } from "react";

export default function TextEditor({ editor, title, selected }) {
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }

  //create the dummy data
  const Drag = [
    {
      id: 1,
      input: "<input/>",
    },
    {
      id: 2,
      input: "<input/>",
    },
    {
      id: 3,
      input: "<input/>",
    },
  ];

  const [value, setValue] = useState("");
  const values = title;

  const config = useMemo(
    () => ({
      readonly: false,

      buttons: ["bold", "italic", "underline", "|", "ul", "ol", "|", "align"],
      removeButtons: ["source", "about"],
      toolbarAdaptive: false,
    }),
    []
  );

  const onChangeHandler = (event) => {
    setValue(event);
  };

  return (
    <>
      <div>
        {selected === 3 ? (
          <>
            <h1>Drag and Drop</h1>

            {Drag?.map((item) => {
              return (
                <div
                  draggable={true}
                  onDragStart={handleDragStart}
                  key={item.id}>
                  {item.input}
                </div>
              );
            })}
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
            onChange={onChangeHandler}
            config={config}
          />
        </div>

        {/* <div>{HTMLReactParser(value.split("<input/>").join(<input />))}</div> */}
      </div>
    </>
  );
}
