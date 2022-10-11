import React, { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "../Css/pages.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Dots } from "loading-animations-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AddPages({ sidebar }) {
  const [comData, setcomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [modulData, setmodulData] = useState([]);
  const [postedData, setpostedData] = useState({
    page_id: 0,
    page_name: "",
    page_link: "",
    module_id: "",
    page_order: 0,
  });
  const [inpVal, setinpVal] = useState({
    id: 0,
    name: "",
    pageUrl: "",
    moduleId: "",
    module: "",
  });
  const [updateVal, setupdateVal] = useState({
    page_id: 0,
    page_name: "",
    page_link: "",

    module_id: "",
    // module_name: "",
  });

  const [isFormValidate, setisFormValidate] = useState(true);
  const notify = () => toast.success("Data added SuccessFully!");
  const updated = () => toast.success("Data updated SuccessFully!");
  const addData = async () => {
    const { page_name, page_link, module_id } = postedData;

    if (page_name === "" || page_link === "" || module_id == "") {
      setisFormValidate(false);
    } else {
      const rqes = await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Pages?page_name=${page_name}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postedData),
        }
      );

      const datas = await rqes.json();
      console.log(datas);
      getData();
      notify();

      setinpVal({
        name: "",
        pageUrl: "",
        moduleId: "",
        module: "",
      });
    }
  };

  const getData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/Pages",
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
    console.log(data, "TB SDATA");
    console.log("succcess full added");
    // }
    const resmodul = await fetch(
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
    const getmodul = await resmodul.json();
    console.log(getmodul);
    // if (res.status === 422 || !getmodul) {
    //   alert("error");
    // } else {
    console.log(getmodul, "Id");
    setmodulData(getmodul);
    console.log("succcess full added");
    // }
  };

  const deleteData = async (id) => {
    const dltres = await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Pages/${id}?page_name=${"somedata"}`,
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
    // console.log("user deleted");
    getData();
    // }
  };
  const updateData = async () => {
    const { page_name, page_link, module_id } = postedData;

    if (page_name === "" || page_link === "" || module_id == "") {
      setisFormValidate(false);
    } else {
      await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Pages?page_name=${page_name}
`,
        {
          method: "PUT",
          headers: {
            Authorization:
              "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postedData),
        }
      )
        .then((response) => response)
        .then((data) => {
          console.log(data);
          getData();
          updated();
          setpostedData({
            page_name: "",
            page_link: "",
            module_id: "",
          });
        });
    }
  };
  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div>
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
                                      <AppRegistrationIcon /> Manage Pages
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="row">
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      {" "}
                                      Page Title:
                                      <span className="imp">*</span>
                                    </label>
                                    <input
                                      // name="name"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        postedData.page_name === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Page Title"
                                      value={postedData.page_name}
                                      onChange={(e) => {
                                        setpostedData({
                                          ...postedData,
                                          page_name: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      {" "}
                                      Page Url:
                                      <span className="imp">*</span>
                                    </label>
                                    <input
                                      // name="url"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        postedData.page_link === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Page Url"
                                      value={postedData.page_link}
                                      onChange={(e) => {
                                        setpostedData({
                                          ...postedData,
                                          page_link: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      Module
                                      <span className="imp">*</span>
                                    </label>
                                    <Form.Select
                                      aria-label="Default select example"
                                      className={`form-control text-center w-50 ${
                                        !isFormValidate &&
                                        postedData.module_id === "" &&
                                        "border_colr"
                                      }`}
                                      name="module_id"
                                      value={postedData.module_id}
                                      onChange={(e) => {
                                        setpostedData({
                                          ...postedData,
                                          module_id: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="" disabled>
                                        --select Module--
                                      </option>
                                      {modulData.map((item) => {
                                        return (
                                          <>
                                            <option value={item.module_id}>
                                              {item.module_name}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </Form.Select>
                                  </div>
                                </div>

                                <div
                                  className="col-lg-7 col-md-4 col-sm-10"
                                  style={{ marginTop: "4%" }}
                                >
                                  <Button
                                    variant="danger"
                                    style={{ marginRight: "2px" }}
                                    onClick={() => {
                                      setCurrentId(null);
                                      setpostedData({
                                        page_name: "",
                                        page_link: "",
                                        module_id: "",
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
                                        <th scope="col">Url</th>
                                        <th scope="col">Module</th>

                                        <th scope="col">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {comData.map((ele, ind) => {
                                        return (
                                          <>
                                            <tr>
                                              <th scope="row">{ind + 1}</th>
                                              <td>{ele.name}</td>
                                              <td>{ele.pageUrl}</td>
                                              <td>{ele.module}</td>

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
                                                        deleteData(ele.id);
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

                                                  //
                                                />
                                                <EditIcon
                                                  onClick={() => {
                                                    setCurrentId(ele.id);
                                                    console.log(ele, "ddddd");
                                                    setpostedData({
                                                      page_id: ele.id,
                                                      page_name: ele.name,
                                                      page_link: ele.pageUrl,

                                                      module_id: ele.moduleId,
                                                      // page_order: ele.module,
                                                      // module_name:
                                                      //   ele.module_id.name,
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
    </div>
  );
}

export default AddPages;
