import React from "react";
import "./DocList.scss";
import Doc from "./Doc/Doc";

function DocList({ data }) {
  return (
    <div className="docList">
      {data?.map((item) => {
        return <Doc key={item.id} data={item} id={item.id} />;
      })}
    </div>
  );
}

export default DocList;
