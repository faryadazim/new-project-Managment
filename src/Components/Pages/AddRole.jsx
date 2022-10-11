import React, { useEffect, useState } from "react";
import axios from "axios";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "../Css/pages.css";
import { Button } from "react-bootstrap";
import { Dots } from "loading-animations-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AddRole({ sidebar }) {
  const [comData, setcomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);

  const [inpVal, setinpVal] = useState({
    Id: 0,
    Name: "",
  });
  const [updateVal, setupdateVal] = useState({
    Id: 0,
    Name: "",
  });
  const [isFormValidate, setisFormValidate] = useState(true);
  const notify = () => toast.success("Data added SuccessFully!");
  const updated = () => toast.success("Data updated SuccessFully!");
  const addData = () => {
    let config = {
      method: "POST",
      url: `http://usman1206-001-site1.btempurl.com/api/Roles?InputPageName=${inpVal.Name}`,
      headers: {
        Authorization:
          "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((response) => response.data)
      .then((json) => {
        notify();
        console.log(json);
        getData();
        setinpVal({ Name: "" });
      });
  };
  const getData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/Roles",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setcomData(data);
    // if (res.status === 422 || !data) {
    //   alert("error");
    // } else {
    //   console.log("succcess full added");
    // }
  };

  const deleteData = async (id) => {
    const dltres = await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Roles/${id}?page_name=${inpVal.Name}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
      }
    );
    await dltres.json();
    getData();
  };
  const updateData = async () => {
    const { Id, Name } = inpVal;

    if (inpVal.Name === "") {
      setisFormValidate(false);
    } else {
      await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Roles/${Id}?roleName=${Name}&page_name=${"somname"}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inpVal),
        }
      )
        .then((response) => {
          getData();
          updated();
          setinpVal({ Name: "" });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  useEffect(() => {
    getData();
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
                                    <AppRegistrationIcon /> Manage Role
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="row">
                              <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="input-group mb-1">
                                  <label className="label">Enter Role:</label>
                                  <span className="imp">*</span>
                                  <input
                                    name="name"
                                    type="text"
                                    className={`form-control ${
                                      !isFormValidate &&
                                      inpVal.Name === "" &&
                                      "border_colr"
                                    }`}
                                    placeholder="Role"
                                    value={inpVal.Name}
                                    onChange={(e) => {
                                      setinpVal({
                                        ...inpVal,
                                        Name: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-2 col-md-4 col-sm-10">
                                <Button
                                  variant="danger"
                                  style={{ marginRight: "2px" }}
                                  onClick={() => {
                                    setCurrentId(null);
                                    console.log("clicked");
                                    setupdateVal({
                                      name: " ",
                                    });
                                  }}
                                >
                                  Cancel
                                </Button>
                                {currentId == null ? (
                                  <>
                                    <Button
                                      variant="dark"
                                      sx={{ backgroundColor: "black" }}
                                      onClick={addData}
                                    >
                                      Submit
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    variant="success"
                                    sx={{ backgroundColor: "black" }}
                                    onClick={updateData}
                                  >
                                    Update
                                  </Button>
                                )}
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

            <div
              class="page"
              className={sidebar == true ? "page" : "spread_page"}
            >
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
                                      <th scope="col">#</th>
                                      <th scope="col">Name</th>

                                      <th scope="col">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {comData.map((ele, ind) => {
                                      return (
                                        <>
                                          <tr>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{ele.Name}</td>

                                            <td className="cuser">
                                              <DeleteOutlineIcon
                                                sx={{ color: "red" }}
                                                onClick={() => {
                                                  Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You won't be able to revert this company info!",
                                                    icon: "warning",
                                                    width: "27em",
                                                    allowOutsideClick: false,
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#000",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText:
                                                      "Yes, delete it!",
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      deleteData(ele.Id);
                                                      Swal.fire({
                                                        width: "27em",
                                                        title: "Deleted!",
                                                        text: "Your file has been deleted.",
                                                        confirmButtonColor:
                                                          "#000",
                                                        icon: "success",
                                                        allowOutsideClick: false,
                                                      });
                                                    } else if (
                                                      result.dismiss ===
                                                      Swal.DismissReason.cancel
                                                    ) {
                                                      Swal.fire({
                                                        width: "27em",
                                                        title: "Cancelled",
                                                        text: "Your data is safe :)",
                                                        icon: "error",
                                                        confirmButtonColor:
                                                          "#000",
                                                        allowOutsideClick: false,
                                                      });
                                                    }
                                                  });
                                                }}
                                              />
                                              <EditIcon
                                                onClick={() => {
                                                  setCurrentId(ele.Id);
                                                  setinpVal({
                                                    Id: ele.Id,
                                                    Name: ele.Name,
                                                  });
                                                }}
                                              />
                                            </td>
                                          </tr>
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

export default AddRole;
