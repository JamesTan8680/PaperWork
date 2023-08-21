import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BreadCrumbs.scss";
import { useSelector } from "react-redux";

function BreadCrumbs() {
  // use the react-router-dom function to get the path of the url

  const data = useSelector((state) => state.data);
  //console.log(data);
  const location = useLocation();
  let currentLink = "";
  //create the crumb
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <span key={crumb} className="breadCrumb">
          <Link to={currentLink}>
            {crumb === "viewDoc"
              ? "View Document"
              : data?.map((item) => {
                  if (item.id === crumb) {
                    return item.title;
                  }
                  return null;
                })}
          </Link>
        </span>
      );
    });

  return <div>{crumbs}</div>;
}

export default BreadCrumbs;
