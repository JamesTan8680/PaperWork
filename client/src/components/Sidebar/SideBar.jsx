import React from "react";
import "./SideBar.scss";
import Logo from "../../img/sidebar/logo1.svg";
import Dashboard from "../../img/sidebar/adjust.svg";
import Profile from "../../img/sidebar/Group.svg";
import Calendar from "../../img/sidebar/cal.svg";
import Project from "../../img/sidebar/project.svg";
import Milestone from "../../img/sidebar/milestone.svg";
import Task from "../../img/sidebar/task.svg";
import Comp from "../../img/sidebar/company.svg";
import Department from "../../img/sidebar/department.svg";
import Teams from "../../img/sidebar/team.svg";
import Paperwork from "../../img/sidebar/paperwork.svg";
import roster from "../../img/sidebar/roster.svg";
import Permission from "../../img/sidebar/permission.svg";
import Policies from "../../img/sidebar/policy.svg";
import Logout from "../../img/sidebar/logout.svg";
import Setting from "../../img/sidebar/setting.svg";
import Person from "../../img/sidebar/person.svg";
import Online from "../../img/sidebar/online.svg";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            <b>CLOCK</b>WORK
          </span>
        </div>
        {/* for the avatar */}
        <div className="avatar">
          <img src={Person} alt="" />
          <div className="avatar-desc">
            <span className="name">Feona Ann</span>
            <span className="desc">Manager</span>
            <span className="online">
              <img src={Online} alt="" />
              <span>Online</span>
              <ArrowDropDownIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="mid">
        <div className="items">
          <div className="item">
            <img src={Dashboard} alt="" />
            <span>Dashboard</span>
          </div>
          <div className="item">
            <img src={Profile} alt="" />
            <span>Profile</span>
          </div>
          <div className="item">
            <img src={Calendar} alt="" />
            <span>Calendar</span>
          </div>
          <div className="item">
            <img src={Project} alt="" />
            <span>Projects</span>
          </div>
          <div className="item">
            <img src={Milestone} alt="" />
            <span>Milestone</span>
          </div>
          <div className="item">
            <img src={Task} alt="" />
            <span>Tasks</span>
          </div>
          <div className="item">
            <img src={Comp} alt="" />
            <span>Company</span>
          </div>
          <div className="item">
            <img src={Department} alt="" />
            <span>Department</span>
          </div>
          <div className="item">
            <img src={Teams} alt="" />
            <span>Teams</span>
          </div>
          <div className="item">
            <img className="selected-img" src={Paperwork} alt="" />
            <span className="selected">Paperwork</span>
          </div>
          <div className="item">
            <img src={roster} alt="" />
            <span>Roster</span>
          </div>
          <div className="item">
            <img src={Permission} alt="" />
            <span>Permission</span>
          </div>
          <div className="item">
            <img src={Policies} alt="" />
            <span>Policies</span>
          </div>
          <div className="item">
            <img src={Logout} alt="" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="setting">
          <img src={Setting} alt="" />
          <span>Setting</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
