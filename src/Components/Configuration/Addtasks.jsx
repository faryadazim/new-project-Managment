import React, { useState, useEffect } from "react";
import { Donut } from "react-dial-knob";
import { Button, Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import ReactChipInput from "react-chip-input";
import Creatable from "react-select/creatable";

import moment from "moment";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import AvatarGroup from "react-avatar-group";
import Avatar from "react-avatar";
import TaskUpdated from "./TaskUpdated";
import { Slider } from "@mui/material";
import truncHtml from "trunc-html";

function Addtasks({
  taskToggle,
  sidebar,
  statusprogress,
  getStatusDataByID,
  setinpVal,
  inpVal,
  statusData,
  priorityData,
  projectType,
  clientInfo,
  handleChange,
  userData,
}) {
  // const [value, setValue] = useState(10);
  // const [comData, setcomData] = useState([]);
  // const [currentId, setCurrentId] = useState(null);
  const [isFormValidate, setisFormValidate] = useState(true);
  // const [chips, SetChips] = useState([]);
  // const [togles, setTogles] = useState(1);
  // const [statusData, setStatusData] = useState([]);
  // const [priorityData, setPriorityData] = useState([]);
  // const [labelData, setlabelData] = useState([]);
  // const [userData, setuserData] = useState([]);
  // const [taskUpdatedToggle, settaskUpdatedToggle] = useState();
  // const [loading, setLoading] = useState(true);
  // const [getActionData, setgetActionData] = useState([]);
  // const [currentToView, setcurrentToView] = useState();
  // const [getstatusdisabled, setgetstatusdisabled] = useState();
  const [getProjectdataByid, setGetProjectdataByid] = useState([]);

  const location = useLocation();
  // const [inpVal, setinpVal] = useState({
  //   TaskName: "",
  //   Taskdescription: "",
  //   projectId: 0,
  //   Taskstatus: 0,
  //   Taskpriority: 0,
  //   task_label: [],
  //   TaskStartDate: "",
  //   TaskEndDate: "",
  //   TaskAsignTo: "",
  //   taskTag: "",
  //   progress: 0,
  // });

  //! model states

  const [editAbleshow, seteditAbleshow] = useState(false);
  const handleClose = () => seteditAbleshow(false);
  const handleShow = () => seteditAbleshow(true);
  //!Toggle data
  // const stateToggle = (i) => {
  //   setTogles(i);
  // };
  //!Chip data
  // const addChip = (value) => {
  //   const chip = chips.slice();
  //   chip.push(value);
  //   SetChips(chip);
  // };
  // const removeChip = (index) => {
  //   const chip = chips.slice();
  //   chip.splice(index, 1);
  //   SetChips(chip);
  // };
  var index_custom = 0;
  // ?GET DATA
  // const GetData = async () => {
  //   const res = await fetch(
  //     "http://usman1206-001-site1.btempurl.com/api/GetTask",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("access_token")).access_token
  //         }`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   setcomData(data);

  //   //*status
  //   await fetch("http://usman1206-001-site1.btempurl.com/api/Status", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${
  //         JSON.parse(localStorage.getItem("access_token")).access_token
  //       }`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       let optionStatus = [];

  //       result.map((eachUser) => {
  //         let dataget = eachUser.status1 === "Planned";
  //         setgetstatusdisabled(dataget);
  //         optionStatus.push({
  //           value: eachUser.status_id,
  //           label: eachUser.status1,
  //         });
  //       });
  //       setStatusData(optionStatus);
  //     });

  //   // //*priority
  //   await fetch(
  //     "http://usman1206-001-site1.btempurl.com/api/project/projectPriority",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization:
  //           "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       let optionPriority = [];

  //       result.map((eachUser) => {
  //         optionPriority.push({
  //           value: eachUser.pro_priority_id,
  //           label: eachUser.pro_priority1,
  //         });
  //       });
  //       setPriorityData(optionPriority);
  //     });

  //   // //*Label Data
  //   await fetch("http://usman1206-001-site1.btempurl.com/api/Lables", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${
  //         JSON.parse(localStorage.getItem("access_token")).access_token
  //       }`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       let optionProtype = [];

  //       result.map((eachUser) => {
  //         optionProtype.push({
  //           value: eachUser.lable_id,
  //           label: eachUser.lable1,
  //         });
  //       });
  //       setlabelData(optionProtype);
  //     });

  //   //*Users (ASSIGN TO)
  //   await fetch("http://usman1206-001-site1.btempurl.com/api/Users", {
  //     method: "GET",
  //     headers: {
  //       Authorization:
  //         "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       let optionArr = [];

  //       result.map((eachUser) => {
  //         optionArr.push({ value: eachUser.id, label: eachUser.userName });
  //       });
  //       setuserData(optionArr);
  //     });
  // };

  //?Post DATA

  // const addData = async () => {
  //   if (inpVal.TaskName === "") {
  //     setisFormValidate(false);
  //   } else {
  //     var raw = JSON.stringify({
  //       projectId: taskToggle,
  //       TaskName: inpVal.TaskName,
  //       Taskdescription: inpVal.Taskdescription,
  //       Taskstatus: inpVal.Taskstatus?.value,
  //       Taskpriority: inpVal.Taskstatus?.value,
  //       TaskStartDate: inpVal.TaskStartDate,
  //       TaskEndDate: inpVal.TaskEndDate,
  //       TaskAsignTo: inpVal.TaskAsignTo?.value,
  //       task_label: inpVal.task_label.map((data) => {
  //         return { labeliD: data.value };
  //       }),
  //       progress: inpVal.progress,
  //     });

  //     console.log(raw);

  //     var requestOptions = {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("access_token")).access_token
  //         }`,
  //         "Content-Type": "application/json",
  //       },
  //       body: raw,
  //     };

  //     fetch(
  //       "http://usman1206-001-site1.btempurl.com/api/AddTask",
  //       requestOptions
  //     )
  //       .then((response) => response.text())
  //       .then((result) => {
  //         GetData();
  //         getStatusDataByID(taskToggle);
  //         setinpVal({
  //           TaskName: "",
  //           Taskdescription: "",
  //           Taskstatus: "",
  //           Taskpriority: "",
  //           TaskStartDate: "",
  //           TaskEndDate: "",
  //           TaskAsignTo: "",
  //           users: [],
  //           progress: "",
  //         });
  //         SetChips([]);
  //         console.log(result + "some data");
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // };
  //! Get data BY id
  // const GetDataByID = async (id) => {
  //   await fetch(
  //     `http://usman1206-001-site1.btempurl.com/api/GetTaskbyid/${id}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("access_token")).access_token
  //         }`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     // const data = await res.json();
  //     .then((response) => {
  //       response.json().then((data) => {
  //         let arr = [];
  //         arr.push(data);
  //         setgetActionData(arr);
  //         console.log(arr);
  //       });
  //     });
  // };
  // const GetDataByfilterTaskstatus = async (statusid) => {
  //   await fetch(
  //     `http://usman1206-001-site1.btempurl.com/api/GetTaskGetTaskbystatus?projectId=${taskToggle}&status=${statusid}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("access_token")).access_token
  //         }`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     // const data = await res.json();
  //     .then((response) => {
  //       response.json().then((data) => {
  //         setcurrentToView(data);
  //         setcomData(data);
  //         // GetData();
  //         //  getStatusDataByID(taskToggle);
  //         console.log(data);
  //       });
  //     });
  // };
  //?Get projectdata by id

  const GetProjectDataByID = async (id) => {
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/project/getbyid/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
      }
    )
      // const data = await res.json();
      .then((response) => {
        response.json().then((data) => {
          let arr = [];
          arr.push(data);
          setGetProjectdataByid(arr);
          console.log(arr);
        });
      });
  };
  useEffect(() => {
    if (location?.state?.id && location?.state?.flag) {
      GetProjectDataByID(location?.state?.id);
    }
    console.log(taskToggle + "helloworld");
    // setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div
      className="main-wrapper"
      style={{ display: location?.state?.id ? "block" : "none" }}
    >
      <div className="page-wrapper">
        <div className="content container-fluid">
          {getProjectdataByid &&
            getProjectdataByid.map((item, index) => {
              return (
                <>
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">{}</h3>
                        <ul className="breadcrumb">
                          <li></li>
                          <li className="breadcrumb-item">
                            <a href="admin-dashboard.html">Dashboard</a>
                          </li>
                          <li className="breadcrumb-item active">
                            Project Detail
                          </li>
                        </ul>
                      </div>
                      <div className="col-auto float-end ms-auto">
                        <a
                          className="btn add-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_project"
                          onClick={() => {
                            handleShow();
                            console.log("clicked on the button");
                            setinpVal({
                              projectID: item.projectID,
                              project_name: item.ProjectName,
                              pro_description: item.Description,
                              pro_type: {
                                value: item.proTypeID?.project_type_id,
                                label: item.proTypeID?.project_type1,
                              },
                              proStatus: {
                                value: item.projectstatus?.pro_status_id,
                                label: item.projectstatus?.pro_status,
                              },

                              proPriority: {
                                value: item.projectpriority?.pro_priority_id,
                                label: item.projectpriority?.pro_priority1,
                              },

                              start_date: item.StartDate.slice(0, -9),
                              end_date: item.EndDate.slice(0, -9),

                              projectLeader: item.project_leader?.UserName,
                              users: item.ProjectTeam.map((data) => {
                                console.log(data);
                                return {
                                  value: data.user_id,
                                  label: data.UserName,
                                };
                              }),
                            });
                          }}
                        >
                          <i className="fa fa-plus" /> Edit Project
                        </a>
                        <a
                          href="task-board.html"
                          className="btn btn-white float-end m-r-10"
                          data-bs-toggle="tooltip"
                          title="Task Board"
                        >
                          <i className="fa fa-bars" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 col-xl-12">
                      <div className="card">
                        <div
                          className="card-body"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            textAlign: "left",
                          }}
                        >
                          <div className="project-title">
                            <h5 className="card-title">{item.ProjectName}</h5>
                          </div>
                          <p>{item.Description}</p>
                        </div>
                        ;
                      </div>

                      <div className="project-task">
                        <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              href="#all_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="true"
                            >
                              All Tasks
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#pending_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                            >
                              Pending Tasks
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#completed_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                            >
                              Completed Tasks
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            className="tab-pane show active"
                            id="all_tasks"
                            style={{ display: "flex", textAlign: "start" }}
                          >
                            <div className="task-wrapper">
                              <div className="task-list-container">
                                <div className="task-list-body">
                                  <ul id="task-list">
                                    <li className="task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span
                                          className="task-label"
                                          contentEditable="true"
                                        >
                                          Patient appointment booking
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span
                                          className="task-label"
                                          contentEditable="true"
                                        >
                                          Appointment booking with payment
                                          gateway
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="completed task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span className="task-label">
                                          Doctor available module
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span
                                          className="task-label"
                                          contentEditable="true"
                                        >
                                          Patient and Doctor video conferencing
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span
                                          className="task-label"
                                          contentEditable="true"
                                        >
                                          Private chat module
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                    <li className="task">
                                      <div className="task-container">
                                        <span className="task-action-btn task-check">
                                          <span
                                            className="action-circle large complete-btn"
                                            title="Mark Complete"
                                          >
                                            <i className="material-icons">
                                              check
                                            </i>
                                          </span>
                                        </span>
                                        <span
                                          className="task-label"
                                          contentEditable="true"
                                        >
                                          Patient Profile add
                                        </span>
                                        <span className="task-action-btn task-btn-right">
                                          <span
                                            className="action-circle large"
                                            title="Assign"
                                          >
                                            <i className="material-icons">
                                              person_add
                                            </i>
                                          </span>
                                          <span
                                            className="action-circle large delete-btn"
                                            title="Delete Task"
                                          >
                                            <i className="material-icons">
                                              delete
                                            </i>
                                          </span>
                                        </span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="task-list-footer">
                                  <div className="new-task-wrapper">
                                    <textarea
                                      id="new-task"
                                      placeholder="Enter new task here. . ."
                                      defaultValue={""}
                                    />
                                    <span className="error-message hidden">
                                      You need to enter a task first
                                    </span>
                                    <span
                                      className="add-new-task-btn btn"
                                      id="add-task"
                                    >
                                      Add Task
                                    </span>
                                    <span className="btn" id="close-task-panel">
                                      Close
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="pending_tasks" />
                          <div className="tab-pane" id="completed_tasks" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        {/* //!editable model  */}
        <div
          id="create_project"
          className={
            editAbleshow == true
              ? "modal custom-modal fade show"
              : "modal custom-modal fade"
          }
          style={{
            display: editAbleshow === true ? "block" : "none",
            backgroundColor: "#000000a6",
          }}
          // aria-modal={showmodel}
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    aria-hidden="true"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    ×
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          !isFormValidate &&
                          inpVal.project_name === "" &&
                          "border_colr"
                        }`}
                        placeholder="Project Name"
                        value={inpVal?.project_name}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            project_name: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        {" "}
                        Project Type
                        {/* <span className="imp">*</span> */}
                      </label>

                      <Creatable
                        classNamePrefix="select"
                        // onChange={(e) => {
                        // }}
                        isSearchable
                        value={inpVal?.pro_type}
                        options={projectType}
                        isClearable={false}
                        onChange={(value) => {
                          handleChange(value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Start Date
                      </label>
                      {/* <div className="cal-icon"> */}
                      <input
                        name="name"
                        type="date"
                        className={`form-control ${
                          !isFormValidate &&
                          inpVal.start_date === "" &&
                          "border_colr"
                        }`}
                        placeholder="Project Name"
                        value={inpVal?.start_date}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            start_date: e.target.value,
                          });
                        }}
                      />
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        End Date
                      </label>
                      <input
                        name="name"
                        type="date"
                        className={`form-control ${
                          !isFormValidate &&
                          inpVal.end_date === "" &&
                          "border_colr"
                        }`}
                        placeholder="Project Name"
                        value={inpVal?.end_date}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            end_date: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Project Status:
                      </label>
                      <Select
                        className={`basic-single ${
                          !isFormValidate &&
                          inpVal.proStatus === "" &&
                          "border_colr"
                        }`}
                        classNamePrefix="select"
                        value={inpVal?.proStatus}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            proStatus: e,
                          });
                          console.log(e, "protype");
                        }}
                        isSearchable
                        options={statusData}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Project Prority:
                      </label>
                      <Select
                        className={`basic-single ${
                          !isFormValidate &&
                          inpVal.proPriority.label === "" &&
                          "border_colr"
                        }`}
                        classNamePrefix="select"
                        value={inpVal?.proPriority}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            proPriority: e,
                          });
                          console.log(e, "protype");
                        }}
                        isSearchable
                        options={priorityData}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        {" "}
                        Select Team:
                      </label>
                      <Select
                        className={`basic-multi-select ${
                          !isFormValidate &&
                          inpVal.users === "" &&
                          "border_colr"
                        }`}
                        value={inpVal?.users}
                        isMulti
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            users: e,
                          });
                          console.log(e, "multiSelector");
                        }}
                        name="colors"
                        options={userData}
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Add Project Leader
                      </label>
                      <Select
                        className={`basic-single ${
                          !isFormValidate &&
                          inpVal.projectLeader === "" &&
                          "border_colr"
                        }`}
                        classNamePrefix="select"
                        value={inpVal?.projectLeader}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            projectLeader: e,
                          });
                          console.log(e, "protype");
                        }}
                        // isSearchable
                        options={userData}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Client Info
                      </label>
                      <Select
                        className={`basic-single ${
                          !isFormValidate &&
                          inpVal.clientId === "" &&
                          "border_colr"
                        }`}
                        classNamePrefix="select"
                        value={inpVal?.clientId}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            clientId: e,
                          });
                          console.log(e, "protype");
                        }}
                        // isSearchable
                        options={clientInfo}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <label
                      style={{
                        display: "flex",
                        // marginTop: "1px",
                        marginBottom: "1%",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="90"
                      rows="7"
                      value={inpVal?.pro_description}
                      onChange={(e) => {
                        setinpVal({
                          ...inpVal,
                          pro_description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* {useMemo(
                      () => (
                        <JoditEditor
                          // ref={edito/r}
                          value={inpVal.pro_description}
                          config={{
                            buttons: ["bold", "italic", "paragraph"],
                            readonly: false,
                            toolbarAdaptive: false,
                            cleanHTML: {
                              fillEmptyParagraph: false,
                            },
                          }}
                          onChange={(e) => {
                            setinpVal({
                              ...inpVal,
                              // pro_description: e,
                            });
                          }}
                        />
                      ),
                      []
                    )} */}
                </div>

                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    // onClick={addData}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addtasks;
