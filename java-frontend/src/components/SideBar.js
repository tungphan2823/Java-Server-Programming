import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { styled } from "@mui/material/styles";
import TocIcon from "@mui/icons-material/Toc";
import SettingsIcon from "@mui/icons-material/Settings";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import logo from "../img/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button1 from "@mui/material/Button";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
const SidebarData = [
  {
    title: "Overview",
    icon: <HomeIcon />,
    link: "",
  },
  {
    title: "Student Edit",
    icon: <AccountCircleIcon  />,
    link: "student",
  },
  {
    title: "Course Edit",
    icon: <BookmarkAddedIcon/>,
    link: "course",
  },
  {
    title: "Enrollment",
    icon: <AppRegistrationIcon/>,
    link: "enroll",
  },
];

const Sidebar = () => {
  
  
  return (
    <div className="Sidebar">
      <img src={logo} />
      <ul className="SidebarLists">
        {SidebarData.map((val) => {
          return (
            <NavLink
              key={val.title}
              to={val.link}
              className={({ isActive }) =>
                isActive ? "active-nav" : undefined
              }
            >
              <li key={val.title} className="row">
                {" "}
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>{" "}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;
