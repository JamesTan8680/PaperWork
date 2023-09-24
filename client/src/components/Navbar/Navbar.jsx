import "./Navbar.scss";
import Faq from "../../img/navbar/faq.svg";
import Inbox from "../../img/navbar/inbox.svg";
import Chat from "../../img/navbar/chat.svg";
import Bell from "../../img/navbar/bell.svg";
import Email from "../../img/navbar/email.svg";
import Search from "../../img/navbar/search.svg";
import View from "../../img/navbar/view.svg";
import Menu from "../../img/navbar/menu.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Tooltip from "./Tooltip";

function Navbar() {
  // State for the search input
  const [search, setSearch] = useState("");
  // State for filter the document
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  //Dummy data for the search
  const data = [
    { id: 1, title: "Non-Disclosure Agreement", type: "Type_A" },
    { id: 2, title: "Employment Agreement", type: "Type_B" },
    { id: 3, title: "Company Termination Agreement", type: "Type_C" },
    { id: 4, title: "Home", type: "Home" },
    { id: 5, title: "Contact", type: "contact" },
    { id: 6, title: "View-Doc", type: "viewDoc" },
    { id: 7, title: "Faq", type: "faq" },
  ];

  //Handle for searching the document
  const handleSearchInputChange = (event) => {
    const searchFound = event.target.value.toLowerCase();
    setSearch(searchFound);

    // Filter documents based on the search
    const filtered = data.filter((document) =>
      document.title.toLowerCase().includes(search)
    );
    setFilteredDocuments(filtered);
  };

  // When the search box is clicked, set filteredDocuments to contain all documents.
  const handleSearchBoxClick = () => {
    setFilteredDocuments(data);
  };

  //When the search box is not clicked, clear the search
  const handleSearchBoxBlur = () => {
    setSearch("");
    setFilteredDocuments([]); // Clear the filtered documents
  };

  //Handle the search result click
  const handleSearchResultClick = (document_type) => {
    // Mappings link with the doc types
    const mappingLink = {
      contact: "/contact",
      faq: "/faq",
      Home: "/",
      viewDoc: "/viewDoc",
      Type_A: "/viewDoc/Type_A",
      Type_B: "/viewDoc/Type_B",
      Type_C: "/viewDoc/Type_C",
    };

    const link = mappingLink[document_type] || "/";
    navigate(link);
    handleSearchBoxBlur();
  };

  //tooltip for the icons on the navigation bar
  const tooltips = [
    { icon: Faq, text: "Frequently Asked Question", link: "/faq" },
    { icon: Inbox, text: "Inbox Message", link: "" },
    { icon: Chat, text: "Chat Message", link: "" },
    { icon: Bell, text: "Notifications", link: "" },
    { icon: Email, text: "Contact", link: "/contact" },
  ];

  //onclick listener for the onlick on the icon
  //useNavigation
  const navigate = useNavigate();
  const onClickIcons = (link) => {
    if (link !== "") {
      navigate(link);
    }
  };
  return (
    <div className="navbar">
      <div className="left-nav">
        <div className="title">
          <img src={Menu} alt="" />
          <span>
            <Link to="">Paperwork</Link>
          </span>
        </div>
      </div>
      <div className="mid-nav">
        <Link to="/createDoc">
          <button>+ Create Document</button>
        </Link>
        <Link to="/viewDoc">
          <button>
            <img src={View} alt="" />
            View Document
          </button>
        </Link>
      </div>
      <div className="right-nav">
        <div className="search">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="search"
            value={search}
            onClick={handleSearchBoxClick}
            onChange={handleSearchInputChange}
            //Use setTimeout to delay the blur event which dissapear the search result box
            onBlur={() => setTimeout(handleSearchBoxBlur, 200)}
          />
          {filteredDocuments.length > 0 && (
            <div className="filtered-results">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="filtered-result"
                  onClick={() => handleSearchResultClick(document.type)}
                >
                  {document.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {tooltips.map((tooltip, index) => (
          <Tooltip key={index} text={tooltip.text}>
            <img
              src={tooltip.icon}
              alt=""
              onClick={() => onClickIcons(tooltip?.link)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
