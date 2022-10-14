import React, { useState, useRef, useMemo, useEffect } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import moment from "moment";
import Select from "react-select";
import AvatarGroup from "react-avatar-group";
import Creatable from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Markup } from "interweave";
import Avatar from "react-avatar";
import ProgressBar from "@ramonak/react-progress-bar";
//added new____
import Modal from "react-bootstrap/Modal";

import CloseIcon from "@mui/icons-material/Close";
import { Dots } from "loading-animations-react";
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Addtasks from "../Configuration/Addtasks";
import axios from "axios";
import { LinearProgress } from "@mui/material";
const style = {
  control: (base) => ({
    ...base,
    border: 0,
  }),
};

function ProjectList({ sidebar }) {
  // new 3 line
  const [showModel, setShowModel] = useState(false);
  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [comData, setcomData] = useState([]);
  const [isFormValidate, setisFormValidate] = useState(true);
  const [userData, setuserData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [projectType, setprojectType] = useState([]);
  const [clientInfo, setclientInfo] = useState([]);
  const [togle, setTogle] = useState(1);
  const [show, setShow] = useState(Array.from(comData, () => false));
  const [taskToggle, setaskToggle] = useState(null);
  const [statusprogress, setStatusprogress] = useState([]);
  const [dropdownToggle, setdropdownToggle] = useState(null);

  const editor = useRef(null);
  const onChngeContent = (value) => {
    console.log(value + "hello there was something");
    // setDochat(value);
  };
  //! model states

  const [showmodel, setShowmodel] = useState(false);
  const handleclose = () => setShowmodel(false);
  const handleshow = () => setShowmodel(true);

  //state new -----
  const [newCreatedProjectType, setnewCreatedProjectType] = useState({
    name: "",
    color: "",
  });

  const [inpVal, setinpVal] = useState({
    projectID: "",
    project_name: "",
    pro_description: "",
    pro_type: "",
    proStatus: "",
    proPriority: "",
    start_date: "",
    end_date: "",
    clientId: "",
    projectLeader: "",
    users: [],
  });

  const formateTime = () => {
    const d = new Date();

    let time = d.getHours() + ":" + d.getMinutes();
    let AmOrPm = time >= 12 ? " PM" : " AM";

    return time + AmOrPm;
  };
  ///new function ------------
  const create_project_type = async () => {
    var hardcoded_values = {
      project_type_id: 0,
      project_type1: newCreatedProjectType.name,
      project_type_colur: newCreatedProjectType.color,
    };
    console.log("dsasd", hardcoded_values);
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/ProjectType",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hardcoded_values),
      }
    );
    const data = await res.json();

    let newly_added_data = {
      value: data.project_type_id,
      label: data.project_type1,
    };

    console.log(newly_added_data, "saad");
    setprojectType([...projectType, newly_added_data]);
    setinpVal({
      ...inpVal,
      pro_type: newly_added_data,
    });
    if (res.status === 201) {
      handleClose();
    }
  };

  // !GET DATA

  const getData = async () => {
    const res = await fetch(
      "http://usman1206-001-site1.btempurl.com/api/AddProject",
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
    console.log(data + "cbhbvfbvfdvdbvfbh");
    setcomData(data);

    await fetch("http://usman1206-001-site1.btempurl.com/api/Users", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv- adApqkv8TZAJma5AVPaGPVhjNxmv - PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v - JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX - VyloD33SW5fS9WD7o_893eo7 - 6TYtQEzMwhBHbi1w- zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
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

    //*status
    await fetch(
      "http://usman1206-001-site1.btempurl.com/api/project/projectStatus",
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
        let optionStatus = [];

        result.map((eachUser) => {
          optionStatus.push({
            value: eachUser.pro_status_id,
            label: eachUser.pro_status,
          });
        });
        setStatusData(optionStatus);
      });

    //*priority
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

    //*Project Type
    await fetch("http://usman1206-001-site1.btempurl.com/api/ProjectType", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let optionProtype = [];

        result.map((eachUser) => {
          optionProtype.push({
            value: eachUser.project_type_id,
            label: eachUser.project_type1,
          });
        });
        setprojectType(optionProtype);
      });

    //?Client info
    await fetch(
      "http://usman1206-001-site1.btempurl.com/api/client/GetAllclient",
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
        let optionStatus = [];

        result.map((eachUser) => {
          optionStatus.push({
            value: eachUser.client_id,
            label: eachUser.client_Name,
          });
        });
        setclientInfo(optionStatus);
      });
  };

  //! Post Data///shaidd is mein bhi kuch chage kia ho
  const addData = async () => {
    console.log("clickedndcndkdn");
    const {
      project_name,
      pro_type,
      proStatus,
      proPriority,
      pro_description,
      start_date,
      end_date,
    } = inpVal;

    if (
      project_name === "" ||
      pro_type?.value === "" ||
      proStatus?.value == "" ||
      proPriority?.value === "" ||
      pro_description === "" ||
      start_date === "" ||
      end_date === ""
    ) {
      setisFormValidate(false);
    } else {
      var raw = JSON.stringify({
        project_name: inpVal.project_name,
        pro_description: inpVal.pro_description,
        pro_type: inpVal.pro_type?.value,
        proStatus: inpVal.proStatus?.value,
        proPriority: inpVal.proPriority?.value,
        projectLeader: inpVal.projectLeader?.value,
        clientId: inpVal.clientId?.value,
        start_date: inpVal.start_date,
        end_date: inpVal.end_date,
        users: inpVal.users.map((data) => {
          return { user_ID: data.value };
        }),
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
        "http://usman1206-001-site1.btempurl.com/api/AddProject",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          getData();
          setinpVal({
            project_name: "",
            pro_description: "",
            pro_type: "",
            proStatus: "",
            proPriority: "",
            start_date: "",
            end_date: "",
            users: [],
          });
          console.log(result + "some data");
        })
        .catch((error) => console.log("error", error));
    }
  };
  // change nwe  this function
  const handleChange = (value) => {
    console.log(value, "....");

    if (value.__isNew__ === true) {
      setShowModel(true);
    } else {
      setinpVal({
        ...inpVal,
        pro_type: value,
      });
    }
    //     let config = {
    //       method: "post",
    //       url: "http://usman1206-001-site1.btempurl.com/api/ProjectType",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "Bearer Hi4gpu687-H0O7lAe7WBQWl8ypXHBy5w1sMkMgM51U-giHLjDbgpLNE-Hv3xNVN3bdVAq-IBM2nm59PQvezGJAic5jE_RLj70JE2KVIskfUtN1Ud4VLlk8UePgJs8nmwb8NAwbXBG22XTsrNJpr1YRpk0MJcpgQGs0lS6f25-V8SiFIcLlzdLJMMrnvzyzpCW5mKIvU4T5euEMhTr4kyBXxd9UHZcA96r3RC6jwhqrDc-YsY_hXOB94XOdLw0gWtiUu0Ab3YGS2rMc2bItjA0lSSd8qSyFtOlOTs2BmS8ZvyC58vebj4Q2EPJEfhsdExM0I3_dJ2rFroFh7f3MlVeoMeaA8h9wv4iIMeej6z_PExLmOM7K-YCq070SP9xjOX9WOp6jFMYua_ViBwS30bJwr0eCmoVinYuKOT4wtNlunG7Vk3niZjsXKoklFmLXHVtAncg1p_Tf9L3C8HiOWLgn8x9LboerJ0RmiwlR2tbOsBGhHOopZ5y8XpYZAWHWVwLENeOjWBWMZ9n1iNrK5gJQ",
    //       },
    //       data: data,
    //     };
    //     axios(config)
    //       .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    // if (value._isNew_ == true) {
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       designationName: value.value,
    //     }),
    //   };

    //   fetch(url + "api/employeeDesignations", requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setDesignationValue(data.designation_id);
    //       setAddNewEmployee({
    //         ...addNewEmployee,
    //         designation: data.designation_id,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("err front End", err);
    //     });
    // } else {
    //   setDesignationValue(value.value);
    //   setAddNewEmployee({ ...addNewEmployee, designation: value.value });
  };
  //!update data
  const updateData = async () => {
    // if (inpVal.name === "") {
    //   setisFormValidate(false);
    // } else {
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/project/update/${inpVal.projectID}`,
      {
        method: "PUT",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: inpVal.project_name,
          pro_description: inpVal.pro_description,
          pro_type: inpVal.pro_type?.value,
          proStatus: inpVal.proStatus?.value,
          proPriority: inpVal.proPriority?.value,
          start_date: inpVal.start_date,
          end_date: inpVal.end_date,
          users: inpVal.users.map((data) => {
            return { user_ID: data.value };
          }),
        }),
      }
    )
      .then((response) => {
        getData();
        setinpVal({
          project_name: "",
          pro_description: "",
          pro_type: "",
          proStatus: "",
          proPriority: "",
          start_date: "",
          end_date: "",
          users: [],
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  //!Delte data

  const deleteData = async (id) => {
    console.log(inpVal.projectID + "hello someone");
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/project/delete?projectiD=${id}
`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer 1DKy2hsnj8KKWTeVaFWYmh-WmAfKqNCrQ3jZoheLbU8ps_qk6ZRlMV0cpn-sIXxK_GdZuEbLQlE23KggzmDfEYhiFDz9U-3l9zlYUbY-AYJcesk5iXzOE8IJsdQNSCF1HPthA09GSC8vfZJAijwKe5y3VeiMlNB6Tvx7ZV4c2U3QwI9SgsZXqX0J8vIxv-adApqkv8TZAJma5AVPaGPVhjNxmv-PVFYnKYZBniA5H6VxXrVr0m3g0un3PQy4ZfDFDbfhKYbWxeP5v-JQY4b94vh4lwSLVAN81b6hRU2xEKLg6pPDXJVIRZP2e_0Wd9bWJbI4BQBzMU27qaCtHyOilsUaoX-VyloD33SW5fS9WD7o_893eo7-6TYtQEzMwhBHbi1w-zGMYZ8LBoe6ogWq5UmPZAbvll35eaa2lswjtL02n9TBdd92CeUcZqlJ_JgjdDWri84xpSOvWWkQ8W7JfTg3ivspKBaERRKulz9h34mAMIPOrUD7_xaaQ5RaWaqq",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((result) => {
        getData();
        setinpVal({
          project_name: "",
          pro_description: "",
          pro_type: "",
          proStatus: "",
          proPriority: "",
          start_date: "",
          end_date: "",
          users: [],
        });
        console.log(result + "some data");
      });
  };
  //?Toggle data / dropdown toggle
  const stateToggle = (i) => {
    setTogle(i);
  };
  const dropToggle = (i) => {
    setdropdownToggle(i);
    // setdropdownToggle(null);
  };
  const togglde = (i, value) => {
    const newOpenState = [...show];
    newOpenState[i] = value ?? !newOpenState[i];
    setShow(newOpenState);
  };

  //?Get statusProgress data
  const getStatusDataByID = async (id) => {
    await fetch(
      `http://usman1206-001-site1.btempurl.com/api/Task/projectTaskStatus?project_id=${id}`,
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
          let arr_to_review = [
            "Completed",
            "In progress",
            "Planned",
            "Pending",
          ];
          let orignal_data = data;
          let refactored_data = arr_to_review.map((each) => {
            let aaa = data.find((e) => e.status === each);
            if (aaa === null || aaa === undefined) {
              orignal_data.push({
                status: each,
                task: 0,
                taskpercentage: 0,
              });
            }
          });
          setStatusprogress(orignal_data);
          console.log(data, "progress bar data render here");
        });
      });
  };

  const Editform = (Recid) => {
    navigate("/addtask", { state: { id: Recid, flag: true } });
  };

  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div>
      {/* {taskToggle ? (
        <>
          {" "} */}
      <Addtasks
        style={{
          display: taskToggle ? "block" : "none",
        }}
        setaskToggle={setaskToggle}
        taskToggle={taskToggle}
        sidebar={sidebar}
        statusprogress={statusprogress}
        getStatusDataByID={getStatusDataByID}
        showmodel={showmodel}
        handleclose={handleclose}
        handleshow={handleshow}
        setinpVal={setinpVal}
        inpVal={inpVal}
        statusData={statusData}
        priorityData={priorityData}
        projectType={projectType}
        clientInfo={clientInfo}
        handleChange={handleChange}
        userData={userData}
      />
      {/* </> */}
      {/* // ) : ( */}
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title" style={{ display: "flex" }}>
                    Projects
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="admin-dashboard.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Projects</li>
                  </ul>
                </div>
                <div className="col-auto float-end ms-auto">
                  <a
                    className="btn add-btn"
                    data-bs-toggle="modal"
                    // data-bs-target="#create_project"
                    onClick={() => {
                      console.log("clicked on the button");

                      handleshow();
                    }}
                  >
                    <i className="fa fa-plus" /> Create Project
                  </a>
                  <div className="view-icons">
                    <a
                      className={
                        togle === 1
                          ? "grid-view btn btn-link active"
                          : "grid-view btn btn-link"
                      }
                      onClick={() => stateToggle(1)}
                    >
                      <i className="fa fa-th" />
                    </a>
                    <a
                      className={
                        togle === 2
                          ? "list-view btn btn-link active"
                          : "list-view btn btn-link"
                      }
                      onClick={() => stateToggle(2)}
                    >
                      <i className="fa fa-bars" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row filter-row">
              <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">Project Name</label>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">Employee Name</label>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus select-focus">
                  <Creatable
                    classNamePrefix="select"
                    // onChange={(e) => {
                    // }}
                    isSearchable
                    value={inpVal.pro_type}
                    options={projectType}
                    isClearable={false}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                  />
                  {/* <label className="focus-label">Designation</label> */}
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <a href="#" className="btn btn-success w-100">
                  {" "}
                  Search{" "}
                </a>
              </div>
            </div>
            {/* //?Grid type */}
            <div className="row">
              {comData.map((item, index) => {
                // const Ongoing =
                //   item.projectstatus.pro_status_id == 2
                //     ? item.projectstatus?.pro_status
                //     : "";
                const rendomlyColor = item.proTypeID?.project_type_colur;

                const Username = item.ProjectTeam.map((each) => {
                  return each.UserName;
                });
                const UsernameAvater = item.ProjectTeam.map((each) => {
                  return each.UserName.substring(0, 1).toUpperCase();
                });

                let progress = Math.round(
                  (item.project_progress?.completedtask /
                    item.project_progress?.count) *
                    100
                );

                if (isNaN(progress)) progress = 0;

                const Profilpic = item.ProjectTeam.map((each) => {
                  if (each.Profilepic === "") {
                    return UsernameAvater;
                  }
                });
                return (
                  <>
                    <div
                      className="col-lg-4 col-sm-6 col-md-4 col-xl-3"
                      style={{ display: togle === 1 ? "block" : "none" }}
                    >
                      <div className="card">
                        <div
                          className="card-body"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            // alignItems: "flex-start",
                            textAlign: "left",
                          }}
                        >
                          <div className="dropdown dropdown-action profile-action">
                            <a
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="material-icons"
                                onClick={() => {
                                  if (dropdownToggle == null) {
                                    dropToggle(index);
                                  } else {
                                    setdropdownToggle(null);
                                  }
                                }}
                              >
                                more_vert
                              </i>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right"
                              style={{
                                marginLeft: "-454%",
                                display:
                                  dropdownToggle === index ? "block" : "none",
                              }}
                            >
                              <a
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_project"
                                onClick={() => {
                                  deleteData(item.projectID);
                                }}
                              >
                                <i className="fas fa-trash m-r-5" /> Delete
                              </a>
                            </div>
                          </div>

                          <h4
                            className="project-title"
                            onClick={() => {
                              Editform(item.projectID);
                              setaskToggle(item);
                              getStatusDataByID(item.projectID);
                            }}
                          >
                            <a>
                              {item.ProjectName.length > 15
                                ? `${item.ProjectName.substring(0, 10)}...`
                                : item.ProjectName}
                            </a>
                          </h4>

                          <p className="text-muted">
                            <Markup
                              content={
                                item.Description.length > 80
                                  ? `${item.Description.substring(0, 60)}...`
                                  : item.Description
                              }
                            />
                          </p>
                          <div className="pro-deadline m-b-15">
                            <div className="sub-title">Deadline:</div>
                            <div className="text-muted">
                              {" "}
                              {moment(item.EndDate).format("DD MMM YYYY ")}
                            </div>
                          </div>
                          <div className="project-members m-b-15">
                            <div>Project Leader :</div>
                            <div>
                              <Avatar
                                name={item.project_leader?.UserName}
                                size="20"
                                value="*"
                                // round="20px"
                                // textSizeRatio={0.75}
                                style={{ fontSize: "2px" }}
                                round={true}
                              />
                              {/* <AvatarGroup
                                avatars={item && item.project_leader}
                                initialCharacters={1}
                                max={3}
                                size={20}
                                displayAllOnHover
                                shadow={2}
                              /> */}
                            </div>
                          </div>
                          <div className="project-members m-b-15">
                            <div>Team :</div>
                            <div>
                              {/* <li> */}
                              {/* <a> */}
                              <AvatarGroup
                                avatars={Username}
                                initialCharacters={1}
                                max={3}
                                size={20}
                                displayAllOnHover
                                shadow={2}
                              />
                            </div>
                          </div>
                          <p className="m-b-5">
                            Progress{" "}
                            <span className="text-success float-end">
                              {progress}%
                            </span>
                          </p>
                          {/* <div className="progress progress-xs mb-0"> */}
                          <ProgressBar
                            completed={progress}
                            maxCompleted={100}
                            bgColor="#55ce63"
                            customLabel=" "
                            height="6%"
                          />
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            {/* //?List type */}

            <div className="row">
              <div
                className="col-md-12"
                style={{ display: togle === 2 ? "block" : "none" }}
              >
                <div className="table-responsive">
                  <table className="table table-striped custom-table datatable">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Team</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comData.map((item, index) => {
                        const Ongoing = item.projectstatus?.pro_status;
                        const rendomlyColor =
                          item.proTypeID?.project_type_colur;

                        const Username = item.ProjectTeam.map((each) => {
                          return each.UserName;
                        });
                        const UsernameAvater = item.ProjectTeam.map((each) => {
                          return each.UserName.substring(0, 1).toUpperCase();
                        });

                        let progress = Math.round(
                          (item.project_progress?.completedtask /
                            item.project_progress?.count) *
                            100
                        );

                        if (isNaN(progress)) progress = 0;

                        const Profilpic = item.ProjectTeam.map((each) => {
                          if (each.Profilepic === "") {
                            return UsernameAvater;
                          }
                        });
                        return (
                          <>
                            <tr>
                              <td>
                                <a>
                                  {" "}
                                  {item.ProjectName.length > 15
                                    ? `${item.ProjectName.substring(0, 10)}...`
                                    : item.ProjectName}
                                </a>
                              </td>

                              <td style={{ paddingLeft: "3%" }}>
                                <ul>
                                  <AvatarGroup
                                    avatars={Username}
                                    initialCharacters={1}
                                    max={3}
                                    size={20}
                                    displayAllOnHover
                                    shadow={2}
                                  />
                                </ul>
                              </td>
                              <td>
                                {" "}
                                {moment(item.EndDate).format("DD MMM YYYY ")}
                              </td>
                              <td>
                                <div className="dropdown action-label">
                                  <a
                                    className="btn btn-white btn-sm btn-rounded "
                                    // data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {/* <i className="fa fa-dot-circle-o text-danger" />{" "} */}
                                    {item.projectpriority?.pro_priority1}
                                  </a>
                                </div>
                              </td>
                              <td>
                                <div className="dropdown action-label">
                                  <a
                                    className="btn btn-white btn-sm btn-rounded "
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {/* <i className="fa fa-dot-circle-o text-success" />{" "} */}
                                    {Ongoing}
                                  </a>
                                </div>
                              </td>

                              <td>
                                <div className="dropdown action-label">
                                  <a
                                    className="btn btn-white btn-sm btn-rounded "
                                    // data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                      color: "white",
                                      backgroundColor: rendomlyColor,
                                    }}
                                  >
                                    {/* <i className="fa fa-dot-circle-o text-danger" />{" "} */}
                                    {item.proTypeID?.project_type1}{" "}
                                  </a>
                                </div>
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

          {/* //!Model for create project  */}

          <div
            id="create_project"
            className={
              showmodel == true
                ? "modal custom-modal fade show"
                : "modal custom-modal fade"
            }
            style={{
              display: showmodel === true ? "block" : "none",
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
                  <h5 className="modal-title">Create Project</h5>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span
                      aria-hidden="true"
                      onClick={() => {
                        handleclose();
                        setisFormValidate(true);
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
                          Project Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Project Name"
                          contentEditable={inpVal}
                          suppressContentEditableWarning={true}
                          value={inpVal.project_name}
                          onChange={(e) => {
                            setinpVal({
                              ...inpVal,
                              project_name: e.target.value,
                            });
                          }}
                        />
                        {!isFormValidate && inpVal.project_name == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          Project Type *{/* <span className="imp">*</span> */}
                        </label>

                        <Creatable
                          classNamePrefix="select"
                          // onChange={(e) => {
                          // }}
                          isSearchable
                          value={inpVal.pro_type}
                          options={projectType}
                          isClearable={false}
                          onChange={(value) => {
                            handleChange(value);
                          }}
                        />
                        {!isFormValidate && inpVal.pro_type == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          className="form-control"
                          name="name"
                          type="date"
                          placeholder="Project Name"
                          value={inpVal.start_date}
                          onChange={(e) => {
                            setinpVal({
                              ...inpVal,
                              start_date: e.target.value,
                            });
                          }}
                        />
                        {!isFormValidate && inpVal.start_date == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          className="form-control"
                          name="name"
                          type="date"
                          placeholder="Project Name"
                          value={inpVal.end_date}
                          onChange={(e) => {
                            setinpVal({
                              ...inpVal,
                              end_date: e.target.value,
                            });
                          }}
                        />
                        {!isFormValidate && inpVal.end_date == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          classNamePrefix="select"
                          value={inpVal.proStatus}
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
                        {!isFormValidate && inpVal.proStatus == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          classNamePrefix="select"
                          value={inpVal.proPriority}
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
                        {!isFormValidate && inpVal.proPriority == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          value={inpVal.users}
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
                        {!isFormValidate && inpVal.users == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          classNamePrefix="select"
                          value={inpVal.projectLeader}
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
                        {!isFormValidate && inpVal.projectLeader == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                          classNamePrefix="select"
                          value={inpVal.clientId}
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
                        {!isFormValidate && inpVal.clientId == "" && (
                          <p className="impValid">Fill the Data*</p>
                        )}
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
                        value={inpVal.pro_description}
                        onChange={(e) => {
                          setinpVal({
                            ...inpVal,
                            pro_description: e.target.value,
                          });
                        }}
                      />
                      {!isFormValidate && inpVal.pro_description == "" && (
                        <p className="impValid">Fill the Data*</p>
                      )}
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
                      onClick={addData}
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
      {/* // )}{" "} */};
    </div>
  );
}

export default ProjectList;

/*  <div className="dropdown dropdown-action">
                                  <a
                                    className="action-icon dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i
                                      className="material-icons"
                                      onClick={() => {
                                        if (dropdownToggle == null) {
                                          dropToggle(index);
                                        } else {
                                          setdropdownToggle(null);
                                        }
                                      }}
                                    >
                                      more_vert
                                    </i>
                                  </a>
                                  <div
                                    className="dropdown-menu dropdown-menu-right"
                                    style={{
                                      marginLeft: "-89%",
                                      marginTop: "-21%",
                                      display:
                                        dropdownToggle === index
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_project"
                                    >
                                      <i className="fa fa-pencil " /> Edit
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#delete_project"
                                    >
                                      <i className="fa fa-trash-o " /> Delete
                                    </a>
                                  </div>
                                </div>*/
