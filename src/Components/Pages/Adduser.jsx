import React, { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "../Css/pages.css";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Dots } from "loading-animations-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Adduser({ sidebar }) {
  const [comData, setcomData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleData, setroleData] = useState([]);

  const [customState, setCustomState] = useState({});

  const [inpVal, setinpVal] = useState({
    id: 0,
    userName: "",
    email: "",
    password: "",
    // role: 0,
    // roleName: "",
  });
  const [selectedRole, setSelectedRole] = useState();

  //! model states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //! model states end

  const [isFormValidate, setisFormValidate] = useState(true);
  const [disablePass, setdisablePass] = useState(false);
  const notify = () => toast.success("Data added SuccessFully!");
  const updated = () => toast.success("Data updated SuccessFully!");
  const addData = async () => {
    if (
      inpVal.userName === "" ||
      inpVal.email === "" ||
      inpVal.password === ""
    ) {
      setisFormValidate(false);
    } else {
      await fetch("http://usman1206-001-site1.btempurl.com/api/Users", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inpVal),
      })
        .then((response) => response.json())
        .then((data) => {
          if (selectedRole.Id === "") {
            setisFormValidate(false);
          } else {
            fetch("http://usman1206-001-site1.btempurl.com/api/UserRoles", {
              method: "POST",
              headers: {
                Authorization:
                  "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                UserId: data,
                RoleId: selectedRole,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                getData();
                notify();
              })
              .catch((err) => {
                console.log("err", err);
              });

            setinpVal({
              userName: "",
              email: "",
              password: "",
            });
            setSelectedRole("");
          }
        });
    }
  };
  const getData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/Users",
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

    console.log(data);

    // }
    const resrole = await fetch(
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
    const getrole = await resrole.json();
    setroleData(getrole);
    // setSelectedRole(getrole.Id);
  };

  const deleteData = async (id) => {
    const dltres = await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Users/${id}?page_name=${"somedata"}
`,
      {
        method: "DELETE",
        headers: {
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
    const { id, userName, email } = inpVal;
    if (userName === "" || email === "") {
      setisFormValidate(false);
    } else {
      await fetch(
        `http://usman1206-001-site1.btempurl.com/api/Users?InputId=${id}&InputuserName=${userName}&Inputemail=${email}&page_name=${"somedata"}`,
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
        .then((response) => response.json())
        .then((data) => {
          getData();
          updated();
          setinpVal({
            userName: "",
          });
        });
    }
  };

  //!update role data
  const updateRoleData = async () => {
    if (selectedRole === "") {
      setisFormValidate(false);
    } else {
      await fetch("http://usman1206-001-site1.btempurl.com/api/UserRoles", {
        method: "PUT",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: inpVal.id,
          RoleId: selectedRole,
        }),
      })
        .then((response) => response)
        .then(() => {
          getData();
          updated();
          setSelectedRole("");
        });
    }
  };
  //!update PAssword
  const updatePassword = async () => {
    console.log(customState, "user id");
    // if (inpVal.name === "") {
    //   setisFormValidate(false);
    // } else {

    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Users/changePassword?Userid=${customState.id}&UserOldPassword=${inpVal.password}&UserNewPassword=${customState.password}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(updateVal),
      }
    )
      .then((response) => response)
      .then(() => {
        getData();
        setinpVal({
          password: "",
        });
      });
  };
  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div>
      {" "}
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
                                      <AppRegistrationIcon /> Manage User
                                    </a>
                                  </li>
                                </ul>
                              </div>

                              <div className="row">
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      {" "}
                                      Name:
                                      <span className="imp">*</span>
                                    </label>
                                    <input
                                      name="name"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        inpVal.userName === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Enter name"
                                      value={inpVal.userName}
                                      onChange={(e) => {
                                        // setdata(e);
                                        setinpVal({
                                          ...inpVal,
                                          userName: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      {" "}
                                      Email:
                                      <span className="imp">*</span>
                                    </label>
                                    <input
                                      name="email"
                                      type="text"
                                      className={`form-control ${
                                        !isFormValidate &&
                                        inpVal.email === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="Enter email"
                                      value={inpVal.email}
                                      onChange={(e) => {
                                        setinpVal({
                                          ...inpVal,
                                          email: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      {" "}
                                      Passowrd:
                                      <span className="imp">*</span>
                                    </label>
                                    <input
                                      name="password"
                                      type="text"
                                      disabled={disablePass}
                                      className={`form-control ${
                                        !isFormValidate &&
                                        inpVal.password === "" &&
                                        "border_colr"
                                      }`}
                                      placeholder="password"
                                      value={inpVal.password}
                                      onChange={(e) => {
                                        // setdata(e);

                                        setinpVal({
                                          ...inpVal,
                                          password: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-4 col-sm-6">
                                  <div className="input-group mb-1">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                      Role:
                                      <span className="imp">*</span>
                                    </label>
                                    <Form.Select
                                      aria-label="Default select example"
                                      className={`form-control text-center w-50 ${
                                        !isFormValidate &&
                                        selectedRole === "" &&
                                        "border_colr"
                                      }`}
                                      name="role_id"
                                      value={selectedRole}
                                      onChange={(e) =>
                                        setSelectedRole(
                                          // ...selectedRole,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" disabled>
                                        --select Role--
                                      </option>
                                      {roleData.map((item) => {
                                        return (
                                          <>
                                            <option value={item.Id}>
                                              {item.Name}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </Form.Select>
                                  </div>
                                </div>
                                <div
                                  className="col-lg-10 col-md-4 col-sm-10"
                                  id="btn_styl"
                                >
                                  <Button
                                    variant="danger"
                                    style={{ marginRight: "2px" }}
                                    onClick={() => {
                                      setinpVal({
                                        userName: "",
                                        email: "",
                                      });
                                      setSelectedRole({ Id: "" });
                                      setCurrentId(null);
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
                                      onClick={() => {
                                        updateData();
                                        updateRoleData();
                                      }}
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
              {/* //*Model */}
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header>
                  <Modal.Title>Update Password</Modal.Title>
                  <CloseIcon onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      Old password<span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control"
                        // data-validate-length-range={6}
                        // data-validate-words={2}
                        name="password"
                        placeholder=" Enter Old password"
                        // required="required"
                        value={inpVal.password}
                        onChange={(e) => {
                          // setdata(e);

                          setinpVal({
                            ...inpVal,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="field item form-group">
                    <label className="col-form-label col-md-4 col-sm-4  label-align">
                      New password<span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                      <input
                        className="form-control"
                        // data-validate-length-range={6}
                        // data-validate-words={2}
                        name="password"
                        placeholder=" Enter New password"
                        // required="required"
                        value={customState.password}
                        onChange={(e) => {
                          // setdata(e);

                          setCustomState({
                            ...customState,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="success"
                    className="btn-sm px-3 ModalButtonPositionAdjectment"
                    onClick={() => {
                      updatePassword();
                      setinpVal({
                        password: "",
                      });
                      handleClose();
                    }}
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>

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

                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col">Passwoed update</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {comData.map((ele, ind) => {
                                        return (
                                          <>
                                            <tr key={ind}>
                                              <th scope="row">{ind + 1}</th>
                                              <td>{ele.userName}</td>
                                              <td>{ele.email}</td>
                                              <td>{ele.roleName}</td>
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
                                                />
                                                <EditIcon
                                                  onClick={() => {
                                                    setdisablePass(true);
                                                    setCurrentId(ele.id);
                                                    setinpVal(ele);
                                                    setSelectedRole(ele.role);
                                                  }}
                                                  
                                                />
                                              </td>
                                              <td>
                                                <Button
                                                  type="button"
                                                  variant="success"
                                                  onClick={() => {
                                                    setdisablePass(true);

                                                    setCustomState(ele);
                                                    handleShow();
                                                    setinpVal(ele);

                                                    console.log(
                                                      "edit button selecte "
                                                    );
                                                  }}
                                                >
                                                  update password
                                                </Button>
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

export default Adduser;
