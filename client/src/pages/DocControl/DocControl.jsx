import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

import DocControlList from "./DocControlList";
import "./DocControl.scss";
function DocControl() {
  const data = [
    {
      id: "Version 1.5",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    {
      id: "Version 1.4",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    {
      id: "Version 1.3",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    {
      id: "Version 1.2",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    {
      id: "Version 1.1",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    {
      id: "Version 1.0",
      date_created: "12/12/23",
      date_modified: "12/12/23",
      issue_date: "12/12/23",
    },
    // Add more data objects as needed
  ];

  return (
    <>
      <BreadCrumbs />
      <div className="docControl">
        <DocControlList data={data} boldItemId="Version 1.5" />
      </div>
    </>
  );
}

export default DocControl;
