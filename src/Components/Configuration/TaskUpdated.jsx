import React, { useState, useRef, useMemo } from "react";
import { Drawer } from "@mui/material";
import Select from "react-select";
import Avatar from "react-avatar";
import moment from "moment";
import { Button } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { Markup } from "interweave";
const style = {
  control: (base) => ({
    ...base,
    border: 0,
  }),
};

function TaskUpdated({
  taskUpdatedToggle,
  settaskUpdatedToggle,
  userData,
  inpVal,
  statusData,
  priorityData,
  setinpVal,
  taskToggle,
  GetData,
  getActionData,
  GetDataByID,
  getStatusDataByID,
}) {
  const [dochat, setDochat] = useState({
    taskChat: "",
    taskid: 0,
  });
  const editor = useRef(null);
  const onChngeContent = (value) => {
    console.log(value + "hello there was something");
    setDochat(value);
  };
  //!update data
  const updateData = async () => {
    // let body = {
    //   TaskName: inpVal.TaskName,
    //   TaskAsignTo: inpVal.TaskAsignTo,
    //   Taskdescription: inpVal.Taskdescription,
    //   //   projectId: taskToggle.projectId?.value,
    //   Taskstatus: inpVal.Taskstatus?.value,
    //   Taskpriority: inpVal.Taskpriority?.value,
    //   TaskStartDate: inpVal.TaskStartDate,
    //   TaskEndDate: inpVal.TaskEndDate,
    //   task_label: inpVal.task_label.map((data) => {
    //     return { labeliD: data.value };
    //   }),
    // };
    const api_url = `http://usman1206-001-site1.btempurl.com/api/Task/update/${taskUpdatedToggle}`;
    console.log(api_url, "url of updating");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer ntysgwk-wx0aL5lcns_G8ZrZepcKx4HMrIT1NjgFm3Inlm1Kq1LKXWPOa_gmaopIsF2OuLyak2DyAXJF80CB1sCAejKar-QV7XwSwUewi7wZ5jC-tuho5ATi2jF-_ajcT11_Z_N90bsWqUUvtZXmgHJuuL1ArAtyRLfZvt1N-hssehFnR0xyBIL1aP_CChVhsYdwqkvl5BIlZ4bcAbZ4qRsL7D_XHSNGT3J08ZB_xCjSmteZqpYeNH1pU3ev_thpzfcxLOoLlsWu_uosjnYkvlQwjVfa3Zxz21AzP2QKKd-hxRj0esg1kxc2_pmQwLD1f-eNAv2IsQoaAwTOanyS3PRxIO4FTR_ZvWERxocCoua9CdqzyAaqB0Q1kQHdaH8ED0ii2LJ_JcFAtQdTx8-2qIj6IRaaAZZPtztHSkx9TVtZ9HDDIurXpCatub_pYUBSJ4fXzjGJHHWsXPcCHb4WlvdG5OysM5AfX-_3kDvMlO3YjQxAsVUw7enHqEISqd87"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      TaskName: inpVal.TaskName,
      Taskdescription: inpVal.Taskdescription,
      projectId: taskToggle,
      task_label: [
        {
          labeliD: 0,
        },
      ],
      Taskstatus: inpVal.Taskstatus?.value,
      // task_label: inpVal.task_label.map((data) => {
      //   return { labeliD: data.value };
      // }),
      Taskpriority: inpVal.Taskpriority?.value,
      TaskEndDate: inpVal.TaskEndDate,
      TaskStartDate: inpVal.TaskStartDate,
      TaskAsignTo: inpVal.TaskAsignTo?.value,
      taskTag: "test , reduce , javascript",
      progress: inpVal.progress,
    });

    console.log(raw);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(api_url, requestOptions)
      .then((response) => {
        console.log(response.text());
        GetData();
        getStatusDataByID(taskToggle);
      })
      // .then((response) => response.text())

      .catch((error) => console.log("error", error));
  };
  //!Chat POSTED
  const addChatData = async () => {
    console.log(dochat + "hello everyone to say something");
    if (dochat === "") {
      alert("something went wrong");
    } else {
      console.log({
        taskChat: dochat, //swagger mein dikha to
        taskid: taskUpdatedToggle,
      });
      await fetch("http://usman1206-001-site1.btempurl.com/api/Taskchat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskChat: dochat, //swagger mein dikha to
          taskid: taskUpdatedToggle,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          GetDataByID(taskUpdatedToggle);
        });
    }
  };

  //!Delete task
  const deleteData = async (id) => {
    const dltres = await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Task/delete/${taskUpdatedToggle}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
      }
    );
    await dltres.text();
    GetData();
  };

  //! Action history posted
  const addActionData = async () => {
    await fetch(
      "http://usman1206-001-site1.btempurl.com/api/TaskActionHistory",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: taskUpdatedToggle,
          changeEndDate: inpVal.TaskStartDate,
          // ChangeName: inpVal.TaskName,
          // assign_id: inpVal.TaskAsignTo?.value,
          // status_id: inpVal.Taskstatus?.value,
          // priority_id: inpVal.Taskpriority?.value,
        }),
      }
    )
      .then((response) => {
        response.text();
      })
      .then((data) => {
        console.log(data + "action hhistory call");
        GetDataByID(taskUpdatedToggle);
        GetData();
      });
  };

  return (
    <div style={{ display: taskUpdatedToggle ? "block" : "none" }}>
      <Drawer
        anchor="right"
        open={taskUpdatedToggle}
        sx={{
          display: "flex",
          "& .MuiDrawer-paper": {
            width: "61%",
          },
        }}
      >
        <i
          className="fa fa-close"
          style={{ marginTop: "1%", marginLeft: "2%" }}
          onClick={() => {
            setinpVal("");
            settaskUpdatedToggle(false);
          }}
        ></i>
        <div
          className="row"
          style={{
            display: "flex",
            alignItems: "end",
            // textAlign: "center",
            marginTop: "2%",
            marginLeft: "5%",
          }}
        >
          <div className="col-lg-9 col-sm-12">
            <h3> {inpVal.projectId}</h3>
          </div>
          <div className="col-lg-3 col-sm-12">
            <Button
              style={{
                marginRight: "4%",
                marginTop: "10%",
                backgroundColor: "red",
              }}
              onClick={deleteData}
            >
              Delete Task
            </Button>
          </div>
        </div>
        <div
          className="row"
          style={{
            padding: "6%",
            display: "flex",
            // flexDirection: "column",
            alignItems: "end",
            textAlign: "center",
          }}
        >
          <div className="col-md-5 col-sm-12">
            <div className="input-group mb-1">
              <label style={{ marginRight: "14%" }}>
                {" "}
                Task Name:
                <span className="imp">*</span>
              </label>
              <input
                name="name"
                type="text"
                className=" form-control"
                style={{ border: "transparent" }}
                placeholder="Task Name"
                value={inpVal.TaskName}
                onBlurCapture={() => updateData()}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    TaskName: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "1%",
                  marginRight: "15%",
                }}
              >
                Assign to:
                <span className="imp">*</span>
              </label>

              <Select
                className="basic-single"
                styles={style}
                classNamePrefix="select"
                value={inpVal.TaskAsignTo}
                onBlur={() => {
                  updateData();
                  addActionData();
                }}
                // onBlur={(updateData, addActionData)}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    TaskAsignTo: e,
                  });

                  console.log(e, "assign to");
                }}
                isSearchable
                options={userData}
              />
            </div>
          </div>

          <div className="col-md-5 col-sm-12">
            <div className="input-group mb-1 mt-1 ">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "1%",
                  marginRight: "13%",
                }}
              >
                Task Status:
                <span className="imp">*</span>
              </label>

              <Select
                className="basic-single"
                style={{ border: "transparent" }}
                styles={style}
                classNamePrefix="select"
                value={inpVal.Taskstatus}
                onBlur={() => {
                  updateData();
                  addActionData();
                }}
                // onBlur={(updateData, addActionData)}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    Taskstatus: e,
                  });

                  console.log(e, "protype");
                }}
                isSearchable
                options={statusData}
              />
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "1%",
                  marginRight: "22px",
                }}
              >
                Task Prority:
                <span className="imp">*</span>
              </label>

              <Select
                style={{ border: "transparent" }}
                className="basic-single"
                styles={style}
                classNamePrefix="select"
                value={inpVal.Taskpriority}
                onBlur={() => {
                  updateData();
                  addActionData();
                }}
                // onBlur={updateData}
                // onBlur={(updateData, addActionData)}
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

          <div className="col-lg-5 col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "1%",
                  marginRight: "15%",
                }}
              >
                {" "}
                Start Date:
                <span className="imp">*</span>
              </label>
              <input
                name="name"
                type="date"
                className=" form-control"
                style={{ border: "transparent" }}
                placeholder="Project Name"
                value={inpVal.TaskStartDate}
                onBlur={() => {
                  updateData();
                  addActionData();
                }}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    TaskStartDate: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "1%",
                  marginRight: "15%",
                }}
              >
                {" "}
                End Date:
                <span className="imp">*</span>
              </label>
              <input
                name="name"
                type="date"
                className=" form-control"
                style={{ border: "transparent" }}
                placeholder="Project Name"
                value={inpVal.TaskEndDate}
                onBlurCapture={() => updateData()}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    TaskEndDate: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                // className="col-form-label col-md-3 col-sm-3  label-align"
                style={{ display: "flex", marginRight: "9%" }}
              >
                {" "}
                Task Progress:
                <span className="imp">*</span>
              </label>
              <input
                disabled={inpVal.Taskstatus?.value === 6}
                name="name"
                type="number"
                style={{ border: "transparent" }}
                pattern="[0-9]*"
                className={"form-control"}
                placeholder="Task Name"
                value={inpVal.Taskstatus?.value === 6 ? "0" : inpVal.progress}
                onBlurCapture={() => {
                  updateData();
                }}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    progress: e.target.value.replace(/\D/g, ""),
                    Taskstatus: inpVal.Taskstatus?.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-12- col-sm-12">
            <div className="input-group mb-1 mt-1">
              <label
                style={{
                  display: "flex",
                  marginTop: "1px",
                  marginBottom: "3%",
                  marginRight: "8%",
                }}
              >
                Discription :
              </label>

              <textarea
                name="disc"
                type="textarea"
                className=" form-control"
                style={{ border: "transparent" }}
                placeholder="disc"
                defaultValue={inpVal.Taskdescription}
                onBlur={() => {
                  updateData();
                  addActionData();
                }}
                onChange={(e) => {
                  setinpVal({
                    ...inpVal,
                    Taskdescripiton: e.target.defaultValue,
                  });
                }}
              />
            </div>
          </div>

          {/* //?Task Chat */}
          <div className="col-lg-12 col-sm-12">
            <div>
              {getActionData &&
                getActionData.map((item, index) => {
                  return (
                    <>
                      {/* {item.Taskchat.length == 0 ? (
                        <> */}
                      {/* <span style={{ color: "darkgrey", fontWeight: 600 }}>
                        No Chat Yet!
                      </span> */}
                      {/* </> */}
                      {/* // ) : ( */}
                      <span>
                        {/* {dochat} */}
                        {item.Taskchat.map((item) => {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: "1%",
                                  // alignItems: "center",
                                }}
                              >
                                {" "}
                                <Avatar
                                  style={{ cursor: "pointer" }}
                                  name={item.UserName}
                                  size="40"
                                  round
                                />
                                <span style={{ marginLeft: "2%" }}>
                                  <Markup content={item.chat} />
                                </span>
                                <span
                                  style={{
                                    fontSize: "13px",
                                    color: "cadetblue",
                                    marginLeft: "1%",
                                  }}
                                >
                                  {" "}
                                  {moment(item.created_date).format(
                                    "DD MMM YYYY "
                                  )}
                                </span>
                              </div>
                            </>
                          );
                        })}
                      </span>
                      {/* // )} */}
                    </>
                  );
                })}
            </div>
          </div>

          <div className="col-lg-12 col-sm-12" style={{ marginTop: "2%" }}>
            {useMemo(
              () => (
                <JoditEditor
                  ref={editor}
                  value={dochat.taskChat}
                  config={{
                    buttons: ["bold", "italic", "paragraph", "link", "image"],
                    readonly: false,
                    toolbarAdaptive: false,
                  }}
                  onChange={(e) => onChngeContent(e)}
                />
              ),
              []
            )}

            <Button
              style={{ display: "flex", marginTop: "2%" }}
              onClick={addChatData}
            >
              comment
            </Button>
          </div>

          {/* //?Task action history  */}
          <div className="col-lg-12 col-sm-12">
            <h4>Action history</h4>
            <div>
              {getActionData &&
                getActionData.map((item, index) => {
                  return (
                    <>
                      {/* {item.TaskActionHistory.length == 0 ? (
                        <> */}
                      {/* <span style={{ color: "darkgrey", fontWeight: 600 }}>
                        No Action Histroy Yet!
                      </span> */}
                      {/* </> */}
                      {/* // ) : ( */}
                      <span>
                        {item.TaskActionHistory.map((item) => {
                          return (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  marginTop: "2%",
                                }}
                              >
                                {" "}
                                <Avatar
                                  style={{ cursor: "pointer" }}
                                  name={item.Action_Performedby?.UserName}
                                  size="40"
                                  round
                                />
                                <div>
                                  {item.Action_text}{" "}
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      color: "cadetblue",
                                      // marginLeft: "74px",
                                    }}
                                  >
                                    {" "}
                                    {moment(item.Action_time).format(
                                      "DD MMM YYYY "
                                    )}
                                  </span>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </span>
                      {/* // )} */}
                    </>
                  );
                })}
            </div>
          </div>
        </div>{" "}
      </Drawer>
    </div>
  );
}

export default TaskUpdated;
