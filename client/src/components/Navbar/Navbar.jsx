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

function Navbar() {
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
        <button>
          <img src={View} alt="" />
          View Doucment
        </button>
      </div>
      <div className="right-nav">
        <div className="search">
          <img src={Search} alt="" />
          <input type="text" placeholder="search" />
        </div>
        <img src={Faq} alt="" />
        <img src={Inbox} alt="" />
        <img src={Chat} alt="" />
        <img src={Bell} alt="" />
        <img src={Email} alt="" />
      </div>
    </div>
  );
}

export default Navbar;
