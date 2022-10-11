import React, { useState } from "react";

// import "../Css/extra.css";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

function Sidebar({
  sidebar,
  setrevertDash,
  setrevertList,
  setrevertRole,
  setrevertModule,
  setrevertBranche,
  setrevertPage,
  setrevertUser,
  setrevertPermit,
  setrevertConfig,
  showSidebar,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={sidebar == true ? "main-wrapper" : "mini-sidebar"}>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="submenu">
                <Link to={"/"}>
                  <i className="fa fa-dashboard" /> <span> Dashboard</span>
                </Link>
              </li>

              <li className="submenu">
                <a onClick={handleClick} className={open && "subdrop"}>
                  <i className="fas fa-rocket"></i> <span> Projects</span>
                  <span className={open ? "menu-arrow" : "menu-arrow"}></span>
                </a>
                <ul
                  style={{ display: !open ? "block" : "none" }}
                  className="data-styling"
                >
                  <li>
                    <Link to={"/list"} style={{ textDecoration: "none" }}>
                      Projects
                    </Link>
                  </li>
                  <li>
                    <a href="tasks.html">Tasks</a>
                  </li>
                  <li>
                    <a href="task-board.html">Task Board</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <div id="main_content">
    //     <div id="header_top" className="header_top">
    //       <div className="container">
    //         <div className="hleft">
    //           <a className="header-brand" href="index-2.html">
    //             <i className="fa fa-soccer-ball-o brand-logo" />
    //           </a>
    //           <div className="dropdown">
    //             <a href="javascript:void(0)" className="nav-link user_btn">
    //               {/* <img className="avatar" src="assets/images/user.png" alt data-toggle="tooltip" data-placement="right" title="User Menu" /> */}
    //             </a>
    //             <a className="nav-link icon xs-hide">
    //               <i className="fa fa-search" />
    //             </a>
    //             <a className="nav-link icon app_inbox xs-hide">
    //               <i className="fa fa-calendar" />
    //             </a>
    //             <a className="nav-link icon xs-hide">
    //               <i className="fa fa-id-card-o" />
    //             </a>
    //             <a className="nav-link icon xs-hide">
    //               <i className="fa fa-comments-o" />
    //             </a>
    //             <a className="nav-link icon app_file xs-hide">
    //               <i className="fa fa-folder-o" />
    //             </a>
    //             <a className="nav-link icon theme_btn xs-hide">
    //               <i
    //                 className="fa fa-paint-brush"
    //                 data-toggle="tooltip"
    //                 data-placement="right"
    //                 title="Themes"
    //               />
    //             </a>
    //           </div>
    //         </div>
    //         <div className="hright">
    //           <div className="dropdown">
    //             <a
    //               href="javascript:void(0)"
    //               className="nav-link icon settingbar"
    //             >
    //               <i
    //                 className="fa fa-gear fa-spin"
    //                 data-toggle="tooltip"
    //                 data-placement="right"
    //                 title="Settings"
    //               />
    //             </a>
    //             <a onClick={showSidebar} className="nav-link icon menu_toggle">
    //               <i className="fa  fa-align-left" />
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       id={sidebar == true ? "left-sidebar" : "hide_sidebar"}
    //       className="sidebar"
    //     >
    //       <h5 className="brand-name">Soccer</h5>
    //       <nav id="left-sidebar-nav" className="sidebar-nav">
    //         <ul className="metismenu">
    //           <li className="g_heading">Project</li>
    //           <li className="active">
    //             <i className="fa fa-dashboard" />
    //             <Link
    //               to={"/"}
    //               style={{
    //                 textDecoration: "none",
    //                 color: "black",
    //               }}
    //             >
    //               <span
    //                 onClick={() => {
    //                   setrevertDash(true);
    //                   setrevertList(false);
    //                   setrevertRole(false);
    //                   setrevertModule(false);
    //                   setrevertBranche(false);
    //                   setrevertPage(false);
    //                   setrevertUser(false);
    //                   setrevertPermit(false);
    //                 }}
    //               >
    //                 Dashboard
    //               </span>
    //             </Link>
    //           </li>
    //           <li>
    //             <i className="fa fa-list-ol" />
    //             <Link
    //               to={"/list"}
    //               style={{ textDecoration: "none", color: "black" }}
    //             >
    //               <span
    //                 onClick={() => {
    //                   setrevertList(true);
    //                   setrevertConfig(false);

    //                   setrevertDash(false);
    //                   setrevertRole(false);
    //                   setrevertModule(false);
    //                   setrevertBranche(false);
    //                   setrevertPage(false);
    //                   setrevertUser(false);
    //                   setrevertPermit(false);
    //                 }}
    //               >
    //                 Project list
    //               </span>
    //             </Link>
    //           </li>
    //           <li>
    //             <i className="fa fa-table" />
    //             <Link
    //               to={"/configT"}
    //               style={{ textDecoration: "none", color: "black" }}
    //             >
    //               <span
    //                 onClick={() => {
    //                   setrevertConfig(true);
    //                   setrevertDash(false);
    //                   setrevertRole(false);
    //                   setrevertModule(false);
    //                   setrevertBranche(false);
    //                   setrevertPage(false);
    //                   setrevertUser(false);
    //                   setrevertPermit(false);
    //                   setrevertList(false);
    //                 }}
    //               >
    //                 Configuration
    //               </span>
    //             </Link>
    //           </li>
    //           {/* //?Role managment system */}

    //           <List component="nav" aria-labelledby="nested-list-subheader">
    //             <ListItemButton onClick={handleClick}>
    //               <ListItemIcon></ListItemIcon>
    //               <ListItemText primary="Role Manegment" />

    //               {open ? <ExpandLess /> : <ExpandMore />}
    //             </ListItemButton>
    //             <Collapse in={open} timeout="auto">
    //               <List
    //                 sx={{
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   alignItems: "flex-start",
    //                   position: "relative",
    //                   left: "26%",
    //                 }}
    //               >
    //                 <li>
    //                   <Link
    //                     to="/role"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                   >
    //                     <span
    //                       onClick={() => {
    //                         setrevertRole(true);
    //                         setrevertDash(false);
    //                         setrevertConfig(false);
    //                         setrevertModule(false);
    //                         setrevertBranche(false);
    //                         setrevertPage(false);
    //                         setrevertUser(false);
    //                         setrevertPermit(false);
    //                       }}
    //                     >
    //                       Add Role
    //                     </span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to="/branch"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                   >
    //                     <span
    //                       onClick={() => {
    //                         setrevertBranche(true);
    //                         setrevertRole(false);
    //                         setrevertConfig(false);
    //                         setrevertDash(false);
    //                         setrevertModule(false);
    //                         setrevertPage(false);
    //                         setrevertUser(false);
    //                         setrevertPermit(false);
    //                       }}
    //                     >
    //                       Add Branches
    //                     </span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to="/modoule"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                   >
    //                     <span
    //                       onClick={() => {
    //                         setrevertModule(true);
    //                         setrevertBranche(false);
    //                         setrevertConfig(false);
    //                         setrevertRole(false);
    //                         setrevertDash(false);
    //                         setrevertPage(false);
    //                         setrevertUser(false);
    //                         setrevertPermit(false);
    //                       }}
    //                     >
    //                       Add Modules
    //                     </span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to="/page"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                   >
    //                     <span
    //                       onClick={() => {
    //                         setrevertPage(true);
    //                         setrevertModule(false);
    //                         setrevertConfig(false);
    //                         setrevertBranche(false);
    //                         setrevertRole(false);
    //                         setrevertDash(false);
    //                         setrevertUser(false);
    //                         setrevertPermit(false);
    //                       }}
    //                     >
    //                       Add Pages
    //                     </span>
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link
    //                     to="/user"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                   >
    //                     <span
    //                       onClick={() => {
    //                         setrevertUser(true);
    //                         setrevertPage(false);
    //                         setrevertConfig(false);
    //                         setrevertModule(false);
    //                         setrevertBranche(false);
    //                         setrevertRole(false);
    //                         setrevertDash(false);
    //                         setrevertPermit(false);
    //                       }}
    //                     >
    //                       Add User
    //                     </span>
    //                   </Link>
    //                 </li>
    //               </List>
    //             </Collapse>
    //           </List>
    //         </ul>
    //       </nav>
    //     </div>
    //   </div>
    // </>
  );
}

export default Sidebar;
