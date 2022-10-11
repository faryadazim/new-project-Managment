import React, { useState } from "react";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";

function Navbar({
  sidebar,
  setSideBar,
  revertDash,
  revertList,
  revertModule,
  revertBranch,
  revertRole,
  revertPage,
  revertUser,
  revertPermit,
  revertConfig,
  showSidebar,
}) {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <a href="admin-dashboard.html" className="logo">
            <img src={logo} width={40} height={40} alt />
          </a>
        </div>
        <a id="toggle_btn" href="javascript:void(0);">
          <span className="bar-icon" onClick={showSidebar}>
            <span />
            <span />
            <span />
          </span>
        </a>
        <div className="page-title-box">
          <h3>Dreamguy's Technologies</h3>
        </div>
        <a id="mobile_btn" className="mobile_btn" href="#sidebar">
          <i className="fa fa-bars" />
        </a>
        <ul className="nav user-menu">
          <li className="nav-item">
            <div className="top-nav-search">
              <a href="javascript:void(0);" className="responsive-search">
                <i className="fa fa-search" />
              </a>
              <form action="search.html">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
