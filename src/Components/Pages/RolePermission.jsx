import React, { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "../Css/pages.css";
import Form from "react-bootstrap/Form";

import { Button } from "react-bootstrap";
import { Dots } from "loading-animations-react";
import Swal from "sweetalert2";
function RolePermission({ sidebar }) {
  const [comData, setcomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [roleData, setroleData] = useState([]);

  const [inpVal, setinpVal] = useState({
    role_id: "",
    pages: "",
  });
  const [updateVal, setupdateVal] = useState({
    id: 0,
    role_id: "",
  });
  const [isFormValidate, setisFormValidate] = useState(true);

  const setdata = (e) => {
    const { name, value } = e.target;
    setinpVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const fetchAllData = async () => {
    const res = await fetch("/rolepermit", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setcomData(data);
    console.log(data);
    const resrole = await fetch("/role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getrole = await resrole.json();
    console.log(getrole);

    console.log(getrole, "Id");
    setroleData(getrole);
    console.log("succcess full added");
  };

  useEffect(() => {
    fetchAllData();
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div>
      {loading == false ? (
        <>
          <div id="main_content">
            <div className={sidebar == true ? "page" : "spread_page"}>
              <div className="container-fluid">
                <div className="tab-content">
                  <div className="section-body mt-3">
                    <div className="row clearfix">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-md-flex justify-content-between mb-2">
                              <ul className="nav nav-tabs b-none">
                                <li className="nav-item">
                                  <a className="nav-link active">
                                    <AppRegistrationIcon /> Role Permission
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="row">
                              <div className="col-lg-5 col-md-4 col-sm-6">
                                <div className="input-group mb-1">
                                  <label className="col-form-label col-md-3 col-sm-3  label-align">
                                    Select Role
                                    <span className="imp">*</span>
                                  </label>
                                  <Form.Select
                                    aria-label="Default select example"
                                    className={`form-control text-center w-50 ${
                                      !isFormValidate &&
                                      inpVal.role_id === "" &&
                                      "border_colr"
                                    }`}
                                    name="role_id"
                                    // value={updateVal.role_id}
                                    onChange={(e) => {
                                      setdata(e);

                                      // setupdateVal({
                                      //   ...updateVal,
                                      //   role_id: e.target.value,
                                      // });
                                    }}
                                  >
                                    <option value="">--select Role--</option>
                                    {roleData.map((item) => {
                                      return (
                                        <>
                                          <option value={item?._id}>
                                            {item.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </Form.Select>
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-4 col-sm-10">
                                <Button
                                  variant="success"
                                  sx={{ backgroundColor: "black" }}
                                  // onClick={addData}
                                >
                                  Update
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={sidebar == true ? "page" : "spread_page"}>
              <div className="section-body">
                <div className="container-fluid">
                  <div className="card">
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="d-md-flex justify-content-between mb-2">
                          <ul className="nav nav-tabs b-none">
                            <li className="nav-item">
                              <a className="nav-link active">
                                <FormatListBulletedIcon /> Listing
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="tab-pane fade show active"
                          id="list"
                          role="tabpanel"
                        >
                          <div className="row clearfix">
                            <div className="col-lg-12">
                              <div className="table-responsive" id="users">
                                <table className="table table-hover">
                                  <thead className="table-dark">
                                    <tr>
                                      <th>Title</th>
                                      <th>View </th>
                                      <th>Delete </th>
                                      <th>Add </th>
                                      <th className="column-title text-center">
                                        Edit{" "}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {comData.map((item, ind) => {
                                      return (
                                        <>
                                          {/* <tr className="moduleBgColor">
                                            <td colSpan="6" className="py-2">
                                              <div>{item._id}</div>
                                            </td>
                                          </tr> */}
                                          {item.pages.map((arr) => {
                                            return (
                                              <>
                                                <tr>
                                                  <td>{arr?.page_id}</td>
                                                  <td className=" text-center ">
                                                    <input
                                                      type="checkbox"
                                                      className="flat"
                                                      checked={
                                                        arr?.view === "true"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() => {
                                                        const filterPages =
                                                          comData.filter(
                                                            (eachPage) => {
                                                              return (
                                                                eachPage.page_id !==
                                                                arr.page_id
                                                              );
                                                            }
                                                          );

                                                        const updatedFiltered =
                                                          [
                                                            ...filterPages,
                                                            {
                                                              ...item,
                                                              pages: [
                                                                {
                                                                  page_id:
                                                                    arr.page_id,
                                                                  add: arr.add,
                                                                  delete:
                                                                    arr.delete,
                                                                  edit: arr.edit,
                                                                  view:
                                                                    arr.view ===
                                                                    "true"
                                                                      ? "false"
                                                                      : "true",
                                                                },
                                                              ],
                                                            },
                                                          ];
                                                        const updatedFilteredDataSorted =
                                                          updatedFiltered.sort(
                                                            (a, b) =>
                                                              a.page_id.localeCompare(
                                                                b.page_id
                                                              )
                                                          );

                                                        setcomData(
                                                          updatedFilteredDataSorted
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                  <td className=" text-center ">
                                                    {/* //!Delete */}
                                                    <input
                                                      type="checkbox"
                                                      className="flat"
                                                      checked={
                                                        arr.delete === "true"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() => {
                                                        const filterPages =
                                                          item.pages.filter(
                                                            (eachPage) => {
                                                              console.log(
                                                                eachPage.page_id
                                                              );
                                                              return (
                                                                eachPage.page_id !==
                                                                arr.page_id
                                                              );
                                                            }
                                                          );

                                                        const updatedFiltered =
                                                          [
                                                            ...filterPages,
                                                            {
                                                              pages: [
                                                                {
                                                                  page_id:
                                                                    arr.page_id,
                                                                  add: arr.add,
                                                                  view: arr.view,
                                                                  edit: arr.edit,
                                                                  delete:
                                                                    arr.delete ===
                                                                    "true"
                                                                      ? "false"
                                                                      : "true",
                                                                },
                                                              ],
                                                            },
                                                          ];

                                                        setcomData(
                                                          updatedFiltered
                                                        );
                                                      }}
                                                    />
                                                  </td>

                                                  <td className=" text-center ">
                                                    {/* //!ADD */}
                                                    <input
                                                      type="checkbox"
                                                      className="flat"
                                                      checked={
                                                        arr.add === "true"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() => {
                                                        const filterPages =
                                                          item.pages.filter(
                                                            (eachPage) => {
                                                              console.log(
                                                                eachPage.page_id
                                                              );
                                                              return (
                                                                eachPage.page_id !==
                                                                arr.page_id
                                                              );
                                                            }
                                                          );

                                                        const updatedFiltered =
                                                          [
                                                            ...filterPages,
                                                            {
                                                              pages: [
                                                                {
                                                                  page_id:
                                                                    arr.page_id,
                                                                  view: arr.view,
                                                                  delete:
                                                                    arr.delete,
                                                                  edit: arr.edit,

                                                                  add:
                                                                    arr.add ===
                                                                    "true"
                                                                      ? "false"
                                                                      : "true",
                                                                },
                                                              ],
                                                            },
                                                          ];

                                                        setcomData(
                                                          updatedFiltered
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                  <td className=" text-center ">
                                                    {/* //!EDIT */}
                                                    <input
                                                      type="checkbox"
                                                      className="flat"
                                                      checked={
                                                        arr.edit === "true"
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() => {
                                                        const filterPages =
                                                          item.pages.filter(
                                                            (eachPage) => {
                                                              console.log(
                                                                eachPage.page_id
                                                              );
                                                              return (
                                                                eachPage.page_id !==
                                                                arr.page_id
                                                              );
                                                            }
                                                          );

                                                        const updatedFiltered =
                                                          [
                                                            ...filterPages,
                                                            {
                                                              pages: [
                                                                {
                                                                  page_id:
                                                                    arr.page_id,
                                                                  view: arr.view,
                                                                  delete:
                                                                    arr.delete,
                                                                  add: arr.add,

                                                                  edit:
                                                                    arr.edit ===
                                                                    "true"
                                                                      ? "false"
                                                                      : "true",
                                                                },
                                                              ],
                                                            },
                                                          ];

                                                        setcomData(
                                                          updatedFiltered
                                                        );
                                                      }}
                                                    />
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          })}
                                        </>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Dots className="componentClass" text="" />
      )}
    </div>
  );
}

export default RolePermission;
