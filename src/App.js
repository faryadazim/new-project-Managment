import React, { useState, useEffect } from "react";
import "./Components/Css/bootstrap-datetimepicker.min.css";
import "./Components/Css/bootstrap.min.css";
import "./Components/Css/ckeditor.css";
import "./Components/Css/dataTables.bootstrap4.min.css";
import "./Components/Css/fullcalendar.min.css";
import "./Components/Css/font-awesome.min.css";
import "./Components/Css/style.css";
import "./Components/Css/select2.min.css";
import "./Components/Css/line-awesome.min.css";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "../src/Components/Css/theme1.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Addmadoule from "./Components/Pages/Addmadoule";
// import AddRole from "./Components/Pages/AddRole";
// import AddPages from "./Components/Pages/AddPages";
// import Adduser from "./Components/Pages/Adduser";
import Authuntication from "./Components/AUTH/Authuntication";

// import RolePermission from "./Components/Pages/RolePermission";
import ProjectList from "./Components/Pages/ProjectList";
// import Branches from "./Components/Pages/Branches";
import { endPoint } from "../src/config/config";
// import MultipleConfig from "./Components/Configuration/MultipleConfig";
// import Addtasks from "./Components/Configuration/Addtasks";

function App() {
  const [isLogin, setisLogin] = useState(null);
  const [revertDash, setrevertDash] = useState(false);
  const [revertList, setrevertList] = useState(false);
  const [revertPage, setrevertPage] = useState(false);
  const [revertRole, setrevertRole] = useState(false);
  const [revertModule, setrevertModule] = useState(false);
  const [revertBranch, setrevertBranche] = useState(false);
  const [revertUser, setrevertUser] = useState(false);
  const [revertPermit, setrevertPermit] = useState(false);
  const [revertConfig, setrevertConfig] = useState(false);

  const [sidebar, setSideBar] = useState(true);
  useEffect(() => {
    localStorage.setItem("authUser", endPoint);

    let newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  }, []);

  const showSidebar = () => {
    setSideBar(!sidebar);
    console.log("fvfn");
  };
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {isLogin === null ? (
          <Authuntication setisLogin={setisLogin} />
        ) : !isLogin ? (
          <>
            <Authuntication setisLogin={setisLogin} />
          </>
        ) : (
          <>
            <Navbar
              sidebar={sidebar}
              setSideBar={setSideBar}
              revertDash={revertDash}
              revertRole={revertRole}
              revertList={revertList}
              revertModule={revertModule}
              revertBranch={revertBranch}
              revertPage={revertPage}
              revertUser={revertUser}
              revertPermit={revertPermit}
              showSidebar={showSidebar}
              revertConfig={revertConfig}
            />
            <Sidebar
              sidebar={sidebar}
              setrevertRole={setrevertRole}
              setrevertModule={setrevertModule}
              setrevertDash={setrevertDash}
              setrevertList={setrevertList}
              setrevertBranche={setrevertBranche}
              setrevertPage={setrevertPage}
              setrevertUser={setrevertUser}
              setrevertPermit={setrevertPermit}
              showSidebar={showSidebar}
              setrevertConfig={setrevertConfig}
            />
            {/* <Dashboard sidebar={sidebar} /> */}
            <Routes>
              <Route path="/" element={<Dashboard sidebar={sidebar} />} />
              {/* <Route
                path="/configT"
                element={<MultipleConfig sidebar={sidebar} />}
              /> */}
              <Route path="/list" element={<ProjectList sidebar={sidebar} />} />
              {/* <Route path="/role" element={<AddRole sidebar={sidebar} />} />
              <Route
                path="/modoule"
                element={<Addmadoule sidebar={sidebar} />}
              />
              <Route path="/page" element={<AddPages sidebar={sidebar} />} />
              <Route path="/user" element={<Adduser sidebar={sidebar} />} />
              <Route path="/branch" element={<Branches sidebar={sidebar} />} />
              <Route
                path="/permission"
                element={<RolePermission sidebar={sidebar} />}
              />
              <Route path="/addtask" element={<Addtasks sidebar={sidebar} />} />{" "}
              */}
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
