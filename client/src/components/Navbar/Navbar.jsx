import "./Navbar.scss";
import Faq from "../../img/navbar/faq.svg";
import Inbox from "../../img/navbar/inbox.svg";
import Chat from "../../img/navbar/chat.svg";
import Bell from "../../img/navbar/bell.svg";
import Email from "../../img/navbar/email.svg";
import Search from "../../img/navbar/search.svg";
import View from "../../img/navbar/view.svg";
import Menu from "../../img/navbar/menu.svg";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";

function Navbar() {
  const tooltips = [
    { icon: Faq, text: "Frequently Asked Question" },
    { icon: Inbox, text: "Inbox Message" },
    { icon: Chat, text: "Chat Message" },
    { icon: Bell, text: "Notifications" },
    { icon: Email, text: "Emails" },
  ];

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
          <input type="text" placeholder="search" />
        </div>

        {tooltips.map((tooltip, index) => (
          <Tooltip key={index} text={tooltip.text}>
            <img src={tooltip.icon} alt="" />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
