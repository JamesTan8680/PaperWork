import React from "react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser"; //convert HTML strings to React elements
import { useState, useRef, useMemo } from "react";

export default function TextEditor({
  handleDragStart,
  handleDragOver,
  handleDrop,
  content,
  setContent,
  editor,
}) {
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedItem = event.dataTransfer.getData("text/plain");
    const newContent = content + droppedItem;
    setContent(newContent);
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
  const values = "<p>NDA </p>";
  const [email, setEmail] = useState("");

  const OnChangeListener = (event) => {
    setEmail(event.target.value);
  };
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
        {
          iconURL:
            "https://img.icons8.com/fluency-systems-regular/48/null/single-line-text-input.png",
          tooltip: "insert input",

          exec: function (editor) {
            editor.selection.insertHTML("______");
          },
        },
      ],
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
        <h1>Drag and Drop</h1>

        {Drag?.map((item) => {
          return (
            <div draggable={true} onDragStart={handleDragStart} key={item.id}>
              {item.input}
            </div>
          );
        })}

        <div className="this">
          <JoditEditor ref={editor} value={values} onChange={onChangeHandler} />
        </div>

        <div>{HTMLReactParser(value.split("<input/>").join(<input />))}</div>
      </div>
    </>
  );
}
