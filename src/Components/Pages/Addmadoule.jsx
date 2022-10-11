import React, { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "../Css/pages.css";
import { Button } from "react-bootstrap";
import { Dots } from "loading-animations-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Addmadoule({ sidebar }) {
  const [comData, setcomData] = useState([]);

  const [currentId, setCurrentId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [inpVal, setinpVal] = useState({
    module_id: 0,
    module_name: "",
    module_icon: "",
    module_order: 0,
  });
  const [updateVal, setupdateVal] = useState({
    module_id: 0,
    module_name: "",
    module_icon: "",
    module_order: 0,
  });
  const [isFormValidate, setisFormValidate] = useState(true);
  const notify = () => toast.success("Data added SuccessFully!");
  const updated = () => toast.success("Data updated SuccessFully!");
  const addData = async () => {
    const { module_name, module_icon } = inpVal;
    if (inpVal.module_name === "" || inpVal.module_icon === "") {
      setisFormValidate(false);
    } else {
      const res = await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Modules?page_name=${"somedata"}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inpVal),
        }
      );

      const data = await res.json();
      console.log(data);
      getData();
      notify();

      setinpVal({ module_name: "", module_icon: "" });
    }
  };
  const getData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/Modules",
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
    // if (res.status === 422 || !data) {
    //   alert("error");
    // } else {
    setcomData(data);

    // }
  };

  const deleteData = async (id) => {
    const dltres = await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Modules/${id}?page_name=${"somedata"}
`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
      }
    );
    const deleteData = await dltres.json();
    // if (dltres.status === 422 || !deleteData) {
    //   alert("error");
    // } else {
    console.log("user deleted");
    getData();
    // }
  };
  const updateData = async () => {
    if (inpVal.module_name === "" || inpVal.module_icon === "") {
      setisFormValidate(false);
    } else {
      const res2 = await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Modules?page_name=${"somedata"}`,
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
        .then((response) => response)
        .then((data) => {
          console.log(data);
          getData();
          updated();
          setinpVal({
            module_name: "",
            module_icon: "",
          });
        });
    }
  };
  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <>
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
                                      <AppRegistrationIcon /> Manage Modoule
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="label">Title:</label>
                                    <span className="imp">*</span>
                                    <input
                                      name="name"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        inpVal.module_name === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Title"
                                      value={inpVal.module_name}
                                      onChange={(e) => {
                                        setinpVal({
                                          ...inpVal,
                                          module_name: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="label">Icon Name:</label>
                                    <span className="imp">*</span>
                                    <input
                                      name="icon_name"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        inpVal.module_icon === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Icon Name"
                                      value={inpVal.module_icon}
                                      onChange={(e) => {
                                        setinpVal({
                                          ...inpVal,
                                          module_icon: e.target.value,
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

                                      setupdateVal({
                                        name: "",
                                        icon_name: "",
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
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>

                                        <th scope="col">Icon</th>
                                        <th scope="col">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {comData.map((ele, ind) => {
                                        return (
                                          <>
                                            <tr>
                                              <th scope="row">{ind + 1}</th>
                                              <td>{ele.module_name}</td>
                                              <td>{ele.module_icon}</td>
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
                                                      confirmButtonColor:
                                                        "#000",
                                                      cancelButtonColor: "#d33",
                                                      confirmButtonText:
                                                        "Yes, delete it!",
                                                    }).then((result) => {
                                                      if (result.isConfirmed) {
                                                        deleteData(
                                                          ele.module_id
                                                        );
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
                                                        Swal.DismissReason
                                                          .cancel
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
                                                    setCurrentId(ele.module_id);
                                                    setinpVal({
                                                      module_id: ele.module_id,
                                                      module_name:
                                                        ele.module_name,
                                                      module_icon:
                                                        ele.module_icon,
                                                      module_order:
                                                        ele.module_order,
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
    </>
  );
}

export default Addmadoule;
