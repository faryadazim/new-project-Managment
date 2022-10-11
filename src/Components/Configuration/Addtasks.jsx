import React, { useState, useEffect } from "react";
import { Donut } from "react-dial-knob";
import { Button, Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import ReactChipInput from "react-chip-input";
import moment from "moment";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AvatarGroup from "react-avatar-group";
import Avatar from "react-avatar";
import TaskUpdated from "./TaskUpdated";
import { Slider } from "@mui/material";
import truncHtml from "trunc-html";

function Addtasks({ taskToggle, sidebar, statusprogress, getStatusDataByID }) {
  const [value, setValue] = useState(10);
  const [comData, setcomData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [isFormValidate, setisFormValidate] = useState(true);
  const [chips, SetChips] = useState([]);
  const [togles, setTogles] = useState(1);
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [labelData, setlabelData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [taskUpdatedToggle, settaskUpdatedToggle] = useState();
  const [loading, setLoading] = useState(true);
  const [getActionData, setgetActionData] = useState([]);
  const [currentToView, setcurrentToView] = useState();
  const [getstatusdisabled, setgetstatusdisabled] = useState();
  let { id } = useParams();
  const [inpVal, setinpVal] = useState({
    TaskName: "",
    Taskdescription: "",
    projectId: 0,
    Taskstatus: 0,
    Taskpriority: 0,
    task_label: [],
    TaskStartDate: "",
    TaskEndDate: "",
    TaskAsignTo: "",
    taskTag: "",
    progress: 0,
  });

  //! model states

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //!Toggle data
  const stateToggle = (i) => {
    setTogles(i);
  };
  //!Chip data
  const addChip = (value) => {
    const chip = chips.slice();
    chip.push(value);
    SetChips(chip);
  };
  const removeChip = (index) => {
    const chip = chips.slice();
    chip.splice(index, 1);
    SetChips(chip);
  };
  var index_custom = 0;
  // ?GET DATA
  const GetData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/GetTask",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setcomData(data);

    //*status
    await fetch("http://usman1206-001-site1.btempurl.com/api/Status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let optionStatus = [];

        result.map((eachUser) => {
          let dataget = eachUser.status1 === "Planned";
          setgetstatusdisabled(dataget);
          optionStatus.push({
            value: eachUser.status_id,
            label: eachUser.status1,
          });
        });
        setStatusData(optionStatus);
      });

    // //*priority
    await fetch(
      "http://usman1206-001-site1.btempurl.com/api/project/projectPriority",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        let optionPriority = [];

        result.map((eachUser) => {
          optionPriority.push({
            value: eachUser.pro_priority_id,
            label: eachUser.pro_priority1,
          });
        });
        setPriorityData(optionPriority);
      });

    // //*Label Data
    await fetch("http://usman1206-001-site1.btempurl.com/api/Lables", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let optionProtype = [];

        result.map((eachUser) => {
          optionProtype.push({
            value: eachUser.lable_id,
            label: eachUser.lable1,
          });
        });
        setlabelData(optionProtype);
      });

    //*Users (ASSIGN TO)
    await fetch("http://usman1206-001-site1.btempurl.com/api/Users", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let optionArr = [];

        result.map((eachUser) => {
          optionArr.push({ value: eachUser.id, label: eachUser.userName });
        });
        setuserData(optionArr);
      });
  };

  //?Post DATA

  const addData = async () => {
    if (inpVal.TaskName === "") {
      setisFormValidate(false);
    } else {
      var raw = JSON.stringify({
        projectId: taskToggle,
        TaskName: inpVal.TaskName,
        Taskdescription: inpVal.Taskdescription,
        Taskstatus: inpVal.Taskstatus?.value,
        Taskpriority: inpVal.Taskstatus?.value,
        TaskStartDate: inpVal.TaskStartDate,
        TaskEndDate: inpVal.TaskEndDate,
        TaskAsignTo: inpVal.TaskAsignTo?.value,
        task_label: inpVal.task_label.map((data) => {
          return { labeliD: data.value };
        }),
        progress: inpVal.progress,
      });

      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
        body: raw,
      };

      fetch(
        "http://usman1206-001-site1.btempurl.com/api/AddTask",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          GetData();
          getStatusDataByID(taskToggle);
          setinpVal({
            TaskName: "",
            Taskdescription: "",
            Taskstatus: "",
            Taskpriority: "",
            TaskStartDate: "",
            TaskEndDate: "",
            TaskAsignTo: "",
            users: [],
            progress: "",
          });
          SetChips([]);
          console.log(result + "some data");
        })
        .catch((error) => console.log("error", error));
    }
  };
  //! Get data BY id
  const GetDataByID = async (id) => {
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/GetTaskbyid/${id}`,
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
          setgetActionData(arr);
          console.log(arr);
        });
      });
  };
  const GetDataByfilterTaskstatus = async (statusid) => {
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/GetTaskGetTaskbystatus?projectId=${taskToggle}&status=${statusid}`,
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
          setcurrentToView(data);
          setcomData(data);
          // GetData();
          //  getStatusDataByID(taskToggle);
          console.log(data);
        });
      });
  };

  useEffect(() => {
    GetData();

    console.log(taskToggle + "helloworld");
    // setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div>
      <TaskUpdated
        taskUpdatedToggle={taskUpdatedToggle}
        settaskUpdatedToggle={settaskUpdatedToggle}
        userData={userData}
        inpVal={inpVal}
        setinpVal={setinpVal}
        statusData={statusData}
        priorityData={priorityData}
        taskToggle={taskToggle}
        GetData={GetData}
        getActionData={getActionData}
        GetDataByID={GetDataByID}
        getStatusDataByID={getStatusDataByID}
      />

      {/* //?Model */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Task</Modal.Title>
          <CloseIcon
            onClick={() => {
              handleClose();
              setinpVal({ lable1: "", lable_colour: "" });
              setCurrentId(null);
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="form-group mb-1">
                <label
                  // className="col-form-label col-md-3 col-sm-3  label-align"
                  style={{ display: "flex" }}
                >
                  {" "}
                  Task Name:
                  <span className="imp">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  className={`form-control ${
                    !isFormValidate && inpVal.TaskName === "" && "border_colr"
                  }`}
                  placeholder="Task Name"
                  value={inpVal.TaskName}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      TaskName: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-12 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "3%",
                  }}
                >
                  Task Discription :
                </label>

                <textarea
                  name="disc"
                  type="textarea"
                  className={`form-control ${
                    !isFormValidate &&
                    inpVal.Taskdescription === "" &&
                    "border_colr"
                  }`}
                  placeholder="disc"
                  value={inpVal.Taskdescription}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      Taskdescription: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className=" col-md-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label style={{ display: "flex" }}>
                  Task label:
                  {/* <span className="imp">*</span> */}
                </label>
                <div>
                  <Select
                    className={`basic-multi-select ${
                      !isFormValidate &&
                      inpVal.task_label === "" &&
                      "border_colr"
                    }`}
                    value={inpVal.task_label}
                    isMulti
                    onChange={(e) => {
                      setinpVal({
                        ...inpVal,
                        task_label: e,
                      });
                      console.log(e, "multiSelector");
                    }}
                    name="colors"
                    options={labelData}
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label style={{ display: "flex" }}>
                  Task Assign to:
                  {/* <span className="imp">*</span> */}
                </label>
                <div>
                  <Select
                    className={`basic-single ${
                      !isFormValidate &&
                      inpVal.TaskAsignTo === "" &&
                      "border_colr"
                    }`}
                    value={inpVal.TaskAsignTo}
                    // isMulti
                    onChange={(e) => {
                      setinpVal({
                        ...inpVal,
                        TaskAsignTo: e,
                      });
                      console.log(e, "multiSelector");
                    }}
                    name="colors"
                    options={userData}
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "1%",
                  }}
                >
                  Task Status:
                  {/* <span className="imp">*</span> */}
                </label>

                <Select
                  className={`basic-single ${
                    !isFormValidate && inpVal.Taskstatus === "" && "border_colr"
                  }`}
                  classNamePrefix="select"
                  value={inpVal.Taskstatus}
                  onChange={(e) => {
                    console.log(getstatusdisabled + "hghhh");
                    setinpVal({
                      ...inpVal,
                      Taskstatus: e,
                    });
                  }}
                  isSearchable
                  options={statusData}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "1%",
                  }}
                >
                  Task Prority:
                </label>

                <Select
                  className={`basic-single ${
                    !isFormValidate && inpVal.pro_type === "" && "border_colr"
                  }`}
                  classNamePrefix="select"
                  value={inpVal.Taskpriority}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      Taskpriority: e,
                    });
                    console.log(e, "protype");
                  }}
                  isSearchable
                  options={priorityData}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "1%",
                  }}
                >
                  {" "}
                  Start Date:
                </label>
                <input
                  name="name"
                  type="date"
                  className={`form-control ${
                    !isFormValidate &&
                    inpVal.TaskStartDate === "" &&
                    "border_colr"
                  }`}
                  placeholder="Project Name"
                  value={inpVal.TaskStartDate}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      TaskStartDate: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "1%",
                  }}
                >
                  {" "}
                  End Date:
                </label>
                <input
                  name="name"
                  type="date"
                  className={`form-control ${
                    !isFormValidate &&
                    inpVal.TaskEndDate === "" &&
                    "border_colr"
                  }`}
                  placeholder="Project Name"
                  value={inpVal.TaskEndDate}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      TaskEndDate: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="form-group mb-1 mt-1">
                <label
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    marginBottom: "1%",
                  }}
                >
                  {" "}
                  Task Tag:
                  {/* <span className="imp">*</span> */}
                </label>
                <ReactChipInput
                  chip-color="blue"
                  classes="class1 class2 chipinput"
                  chips={chips}
                  onSubmit={(value) => addChip(value)}
                  onRemove={(index) => removeChip(index)}
                />
              </div>
            </div>

            <div className="col-md-12 col-sm-12">
              <div className="form-group mb-1">
                <label
                  // className="col-form-label col-md-3 col-sm-3  label-align"
                  style={{ display: "flex" }}
                >
                  {" "}
                  Task Progress:
                  <span className="imp">*</span>
                </label>
                <input
                  disabled={inpVal.Taskstatus?.value === 6}
                  name="name"
                  type="number"
                  maxLength={2}
                  pattern="[0-9]*"
                  className={`form-control ${
                    !isFormValidate && inpVal.progress === "" && "border_colr"
                  }`}
                  // value={
                  //   inpVal.Taskstatus?.value === 5 ? "100" : inpVal.progress
                  // }
                  // onChange={(e) => {
                  //   setinpVal({
                  //     ...inpVal,
                  //     progress:
                  //       e.target.value === "100"
                  //         ? "100"
                  //         : e.target.value.replace(/\D/g, ""),
                  //     // Taskstatus: e.target.value,
                  //   });
                  // }}
                  placeholder="Task Progress"
                  value={inpVal.progress}
                  onChange={(e) => {
                    setinpVal({
                      ...inpVal,
                      progress: e.target.value.replace(/\D/g, ""),
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{ backgroundColor: "#c51111" }}
            className="btn-sm px-3 ModalButtonPositionAdjectment"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          {/* {currentId == null ? (
            <> */}
          <Button
            style={{ backgroundColor: "#1a5089" }}
            className="btn-sm px-3 ModalButtonPositionAdjectment"
            onClick={() => {
              addData();
               setinpVal({
                 TaskName: "",
                 Taskdescription: "",
                 Taskstatus: "",
                 Taskpriority: "",
                 TaskStartDate: "",
                 TaskEndDate: "",
                 TaskAsignTo: "",
                 users: [],
                 progress: "",
               });
               SetChips([]);
              handleClose();
            }}
          >
            Submit
          </Button>
          {/* </>
          ) : ( */}
          {/* <Button
            variant="success"
            onClick={() => {
              // updateData(inpVal.lable_id);
            }}
          >
            Update
          </Button> */}
          {/* )} */}
        </Modal.Footer>
      </Modal>
      <div id="main_content" style={{ display: taskToggle ? "block" : "none" }}>
        <div className={sidebar == true ? "page" : "spread_page"}>
          <div className="section-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-md-flex justify-content-between align-items-center">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item">
                        <a
                          className={togles === 1 ? "nav-link active" : ""}
                          data-toggle="tab"
                          onClick={() => {
                            GetData();
                            stateToggle(1);
                          }}
                          // id="TaskBoard-tab"
                        >
                          List View
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={togles === 2 ? "nav-link active" : ""}
                          data-toggle="tab"
                          onClick={() => {
                            stateToggle(2);
                          }}
                          // id="TaskBoard-tab"
                        >
                          Grid View
                        </a>
                      </li>
                    </ul>
                    <div className="header-action d-flex">
                      <div className="input-group mr-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                      </div>
                      <Button
                        sx={{ backgroundColor: "#1a5089" }}
                        onClick={() => {
                          handleShow();
                        }}
                      >
                        {/* <i
                          className="fa fa-plus"
                          style={{ fontSize: "10px" }}
                        ></i> */}
                        Add
                      </Button>
                      {/* <button type="button" className="btn btn-primary">
                        Add
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix mt-2">
                {}
                {statusprogress &&
                  statusprogress.map((item, index) => {
                    return (
                      <>
                        <div className="col-lg-3 col-md-6">
                          <div className="card">
                            <div className="card-body text-center">
                              <h6
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  console.log("somedata");
                                  GetDataByfilterTaskstatus(item.status);
                                }}
                              >
                                {item.status}{" "}
                              </h6>
                              <Donut
                                diameter={150}
                                min={0}
                                max={item.taskpercentage + 1}
                                step={1}
                                value={item.task}
                                theme={{
                                  donutColor: "gray",
                                }}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                onValueChange={() => {
                                  setValue();
                                }}
                                ariaLabelledBy={"my-label"}
                              ></Donut>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* //*List view */}

          <div
            className="section-body"
            style={{ display: togles === 1 ? "block" : "none" }}
          >
            <div className="container-fluid">
              <div className="tab-content taskboard">
                <div
                  className="tab-pane fade show active"
                  id="TaskBoard-list"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Task Assign</th>
                              <th>Assign To</th>
                              <th>Duration</th>
                              <th>Action</th>
                              <th className="w200" />
                            </tr>
                          </thead>
                          <tbody
                          // style={{
                          //   display: currentToView ? "block" : "none",
                          // }}
                          >
                            {comData.map((item, index) => {
                              // console.log(index, "testing pur");
                              const rendomlyColor =
                                item.taskstatus?.status_colour;
                              const Username = item.TaskAssign;

                              if (
                                item.projectdetail?.projectid === taskToggle
                              ) {
                                index_custom = index_custom + 1;
                              }
                              return (
                                <>
                                  {item.projectdetail?.projectid ===
                                  taskToggle ? (
                                    <>
                                      <tr
                                        onClick={() => {
                                          settaskUpdatedToggle(item.TaskID);
                                          GetDataByID(item.TaskID);

                                          setinpVal({
                                            TaskName: item.TaskName,
                                            Taskdescription: item.Description,
                                            TaskAsignTo: {
                                              value: item.TaskAssign?.user_id,
                                              label: item.TaskAssign?.UserName,
                                            },
                                            TaskStartDate: item.StartDate.slice(
                                              0,
                                              -9
                                            ),
                                            TaskEndDate: item.EndDate.slice(
                                              0,
                                              -9
                                            ),
                                            projectId:
                                              item.projectdetail?.ProjectName,

                                            Taskstatus: {
                                              value: item.taskstatus?.status_id,
                                              label: item.taskstatus?.status1,
                                            },

                                            Taskpriority: {
                                              value:
                                                item.taskpriority
                                                  ?.pro_priority_id,
                                              label:
                                                item.taskpriority
                                                  ?.pro_priority1,
                                            },

                                            // taskTag: item.taskTag,
                                            task_label: item.taskLables.map(
                                              (data) => {
                                                console.log(data);
                                                return {
                                                  value: data.Lable,
                                                  label: data.LableId,
                                                };
                                              }
                                            ),
                                            progress: item.taskProgress,
                                          });
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>{index_custom}</td>
                                        <td>
                                          <h6 className="mb-0">
                                            {item.TaskName}
                                          </h6>
                                          <span
                                            disabled
                                            style={{
                                              cursor: "pointer",
                                              border: "none",
                                            }}
                                          >
                                            {item.Description.length > 20
                                              ? `${item.Description.substring(
                                                  0,
                                                  20
                                                )}...`
                                              : item.Description}
                                          </span>
                                        </td>
                                        <td>
                                          <ul className="list-unstyled team-info mb-0">
                                            <li>
                                              <Avatar
                                                style={{ cursor: "pointer" }}
                                                name={item.TaskAssign?.UserName}
                                                size="50"
                                                round
                                              />

                                              {/* <AvatarGroup
                                            avatars={Username}
                                            initialCharacters={1}
                                            max={3}
                                            size={40}
                                            displayAllOnHover
                                            shadow={2}
                                          /> */}
                                            </li>
                                          </ul>
                                        </td>
                                        <td>
                                          <div className="text-info">
                                            Start:
                                            {moment(item.StartDate).format(
                                              "DD MMM YYYY "
                                            )}
                                          </div>
                                          <div className="text-pink">
                                            End:
                                            {moment(item.EndDate).format(
                                              "DD MMM YYYY "
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          <span
                                            className="tag  mb-3"
                                            style={{
                                              color: "white",
                                              backgroundColor: rendomlyColor,
                                            }}
                                          >
                                            {item.taskstatus?.status1}
                                          </span>
                                        </td>
                                        <td>
                                          <div className="clearfix">
                                            <div className="float-left">
                                              <strong>
                                                {item.taskProgress}%
                                              </strong>
                                            </div>
                                            <div className="float-right">
                                              <small className="text-muted">
                                                Progress
                                              </small>
                                            </div>
                                          </div>

                                          <Slider
                                            aria-label="Volume"
                                            value={item.taskProgress}
                                            max={100}
                                            // onChange={handleChange}
                                          />

                                          {/* <div className="progress progress-xs">
                                            <div class="progress">
                                              <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: "25%" }}
                                                defaultValue={item.taskProgress}
                                                aria-valuenow={
                                                  item.taskProgress
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                              >
                                                {item.taskProgress}%
                                              </div>
                                            </div>
                                          </div> */}

                                          {/* <div
                                              className="progress-bar bg-azure"
                                              role="progressbar"
                                              style={{ width: "0%" }}
                                              aria-valuenow={42}
                                              aria-valuemin={0}
                                              aria-valuemax={100}
                                            />
                                          </div> */}
                                        </td>
                                      </tr>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* //?Grid veiw */}
              </div>
            </div>
          </div>
          {/* //*Grid view */}
          {/* <div
            className="row clearfix"
            style={{ display: togles === 2 ? "block" : "none" }}
          >
            <div className="col-lg-4 col-md-12">
              <div className="card planned_task">
                <div className="card-header">
                  <h3 className="card-title">Planned</h3>
                </div> */}

          {/* <Draggable draggableId="2" index="2">
                  {(provided, snapshot) => {
                    return (
                      <DragItem
                        // ref={provided.innerRef}
                        // snapshot={snapshot}
                        // {...provided.draggableProps}
                        // {...provided.dragHandleProps}
                      >
                        <CardHeader>hello world</CardHeader>
                        <span>Content</span>
                        <CardFooter>
                          <span>some data coming here</span>
                          {/* <Author>
                            {item.id}
                            <Avatar
                              src={`data:image/svg+xml;utf8,${generateFromString(
                                item.id
                              )}`}
                            />
                          </Author> */}
          {/* </CardFooter>
                      </DragItem>
                    );
                  }}
                </Draggable>  */}
          {/* <div className="card-body"></div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card progress_task">
                <div className="card-header">
                  <h3 className="card-title">In progress</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up" />
                    </a>
                    <a
                      href="#"
                      className="card-options-fullscreen"
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize" />
                    </a>
                    <a
                      href="#"
                      className="card-options-remove"
                      data-toggle="card-remove"
                    >
                      <i className="fe fe-x" />
                    </a>
                    <div className="item-action dropdown ml-2">
                      <a href="javascript:void(0)" data-toggle="dropdown">
                        <i className="fe fe-more-vertical" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-eye" /> View Details{" "}
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-share-alt" /> Share{" "}
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-cloud-download" />{" "}
                          Download
                        </a>
                        <div className="dropdown-divider" />
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-copy" /> Copy to
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-folder" /> Move to
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-edit" /> Rename
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-trash" /> Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="dd" data-plugin="nestable">
                    <ol className="dd-list">
                      <li className="dd-item" data-id={1}>
                        <div className="dd-handle">
                          <h6>New Code Update</h6>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>
                      </li>
                      <li className="dd-item" data-id={2}>
                        <div className="dd-handle">
                          <h6>Meeting</h6>
                          <span className="time">
                            <span className="text-primary">Start: 5 Aug</span>{" "}
                            to{" "}
                            <span className="text-danger">
                              Complete: 11 Aug
                            </span>
                          </span>
                          <p>
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus
                            Bonorum et Malorum" by Cicero
                          </p>
                          <ul className="list-unstyled team-info">
                            <li>
                              <img
                                src="assets/images/xs/avatar7.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                            <li>
                              <img
                                src="assets/images/xs/avatar9.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dd-item" data-id={2}>
                        <div className="dd-handle">
                          <h6>New project</h6>
                          <p>
                            It is a long established fact that a reader will be
                            distracted.
                          </p>
                        </div>
                      </li>
                      <li className="dd-item" data-id={3}>
                        <div className="dd-handle">
                          <h6>Feed Details</h6>
                          <p>
                            here are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card completed_task">
                <div className="card-header">
                  <h3 className="card-title">Completed</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up" />
                    </a>
                    <a
                      href="#"
                      className="card-options-fullscreen"
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize" />
                    </a>
                    <a
                      href="#"
                      className="card-options-remove"
                      data-toggle="card-remove"
                    >
                      <i className="fe fe-x" />
                    </a>
                    <div className="item-action dropdown ml-2">
                      <a href="javascript:void(0)" data-toggle="dropdown">
                        <i className="fe fe-more-vertical" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-eye" /> View Details{" "}
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-share-alt" /> Share{" "}
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-cloud-download" />{" "}
                          Download
                        </a>
                        <div className="dropdown-divider" />
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-copy" /> Copy to
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-folder" /> Move to
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-edit" /> Rename
                        </a>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="dropdown-icon fa fa-trash" /> Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="dd" data-plugin="nestable">
                    <ol className="dd-list">
                      <li className="dd-item" data-id={1}>
                        <div className="dd-handle">
                          <h6>Job title</h6>
                          <p>
                            If you are going to use a passage of Lorem Ipsum,
                            you need to be sure there isn't anything
                            embarrassing hidden in the middle of text.
                          </p>
                          <ul className="list-unstyled team-info">
                            <li>
                              <img
                                src="assets/images/xs/avatar4.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                            <li>
                              <img
                                src="assets/images/xs/avatar5.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                            <li>
                              <img
                                src="assets/images/xs/avatar6.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                            <li>
                              <img
                                src="assets/images/xs/avatar8.jpg"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Avatar"
                                alt="Avatar"
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dd-item" data-id={2}>
                        <div className="dd-handle">
                          <h6>Event Done</h6>
                          <p>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical
                          </p>
                        </div>
                      </li>
                      <li className="dd-item" data-id={1}>
                        <div className="dd-handle">
                          <h6>New Code Update</h6>
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Addtasks;
