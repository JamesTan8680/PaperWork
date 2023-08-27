import React from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import "./Terms.scss";

function Terms({
  id,
  data,
  editor,
  selected,
  terms,
  setContent,
  inputList,
  setInputList,
  page,
}) {
  console.log(data);
  console.log(id);
  //finding the data and matching it with the type
  // useEffect(() => {
  //   const findTerms = data?.find((item) => item.template.type === id);
  //   console.log(findTerms);
  //   const displayTerms = `<p>${findTerms.template.term}</p>`;
  //   console.log(displayTerms);
  //   setContent(displayTerms);
  // }, []);

  return (
    <div className="term">
      <TextEditor
        editor={editor}
        title={terms}
        selected={selected}
        setContent={setContent}
        setInputList={setInputList}
        inputList={inputList}
        page={page}
      />
    </div>
  );
}

export default Terms;
