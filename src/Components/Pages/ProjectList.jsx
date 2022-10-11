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
  const [togle, setTogle] = useState(1);
  const [show, setShow] = useState(Array.from(comData, () => false));
  const [taskToggle, setaskToggle] = useState(null);
  const [statusprogress, setStatusprogress] = useState([]);
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
  };

  //! Post Data///shaidd is mein bhi kuch chage kia ho
  const addData = async () => {
    const {
      project_name,
      pro_type,
      proStatus,
      proPriority,
      pro_description,
      start_date,
      end_date,
    } = inpVal;

    console.log(pro_type, "testsfd");
    if (
      project_name === "" ||
      pro_type?.value === "" ||
      proStatus?.value === "" ||
      proPriority === "" ||
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
  //?Toggle data
  const stateToggle = (i) => {
    setTogle(i);
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
                      href="projects.html"
                      className="grid-view btn btn-link active"
                    >
                      <i className="fa fa-th" />
                    </a>
                    <a
                      href="project-list.html"
                      className="list-view btn btn-link"
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
            <div className="row">
              {comData.map((item, index) => {
                const Ongoing =
                  item.projectstatus.pro_status_id == 2
                    ? item.projectstatus?.pro_status
                    : "";
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
                    <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
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
                          <h4 className="project-title">
                            <a>
                              {" "}
                              {item.ProjectName.length > 15
                                ? `${item.ProjectName.substring(0, 10)}...`
                                : item.ProjectName}
                            </a>
                          </h4>

                          <p className="text-muted">
                            {item.Description.length > 80
                              ? `${item.Description.substring(0, 60)}...`
                              : item.Description}
                          </p>
                          <div className="pro-deadline m-b-15">
                            <div className="sub-title">Deadline:</div>
                            <div className="text-muted">
                              {" "}
                              {moment(item.EndDate).format("DD MMM YYYY ")}
                            </div>
                          </div>
                          {/* <div className="project-members m-b-15">
                            <div>Project Leader :</div>
                            <ul className="team-members">
                              <li>
                                <a
                                  href="#"
                                  data-bs-toggle="tooltip"
                                  title="Jeffery Lalor"
                                >
                                  <img
                                    alt
                                    src="assets/img/profiles/avatar-16.jpg"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div> */}
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
                              {/* </a> */}
                              {/* </li> */}

                              {/* <li className="dropdown avatar-dropdown">
                                <a
                                  href="#"
                                  className="all-users dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  +15
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <div className="avatar-group">
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-02.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-09.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-10.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-05.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-11.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-12.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-13.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-01.jpg"
                                      />
                                    </a>
                                    <a className="avatar avatar-xs" href="#">
                                      <img
                                        alt
                                        src="assets/img/profiles/avatar-16.jpg"
                                      />
                                    </a>
                                  </div>
                                  <div className="avatar-pagination">
                                    <ul className="pagination">
                                      <li className="page-item">
                                        <a
                                          className="page-link"
                                          href="#"
                                          aria-label="Previous"
                                        >
                                          <span aria-hidden="true">«</span>
                                          <span className="visually-hidden">
                                            Previous
                                          </span>
                                        </a>
                                      </li>
                                      <li className="page-item">
                                        <a className="page-link" href="#">
                                          1
                                        </a>
                                      </li>
                                      <li className="page-item">
                                        <a className="page-link" href="#">
                                          2
                                        </a>
                                      </li>
                                      <li className="page-item">
                                        <a
                                          className="page-link"
                                          href="#"
                                          aria-label="Next"
                                        >
                                          <span aria-hidden="true">»</span>
                                          <span className="visually-hidden">
                                            Next
                                          </span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </li> */}
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
                      }}
                    >
                      ×
                    </span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
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
                          <input className="form-control" type="text" />
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
                            value={inpVal.pro_type}
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
                            value={inpVal.start_date}
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
                          {/* <div className="cal-icon"> */}{" "}
                          <input
                            name="name"
                            type="date"
                            className={`form-control ${
                              !isFormValidate &&
                              inpVal.end_date === "" &&
                              "border_colr"
                            }`}
                            placeholder="Project Name"
                            value={inpVal.end_date}
                            onChange={(e) => {
                              setinpVal({
                                ...inpVal,
                                end_date: e.target.value,
                              });
                            }}
                          />
                          {/* </div> */}
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
                              inpVal.proPriority.label === "" &&
                              "border_colr"
                            }`}
                            classNamePrefix="select"
                            // value={inpVal.proPriority}
                            // onChange={(e) => {
                            //   setinpVal({
                            //     ...inpVal,
                            //     proPriority: e,
                            //   });
                            //   console.log(e, "protype");
                            // }}
                            // isSearchable
                            // options={priorityData}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        style={{
                          display: "flex",
                          // marginTop: "1px",
                          marginBottom: "1%",
                        }}
                      >
                        Description
                      </label>
                      {useMemo(
                        () => (
                          <JoditEditor
                            ref={editor}
                            // value={dochat.taskChat}
                            config={{
                              buttons: [
                                "bold",
                                "italic",
                                "paragraph",
                                "link",
                                "image",
                              ],
                              readonly: false,
                              toolbarAdaptive: false,
                            }}
                            // onChange={(e) => onChngeContent(e)}
                          />
                        ),
                        []
                      )}{" "}
                    </div>
                    {/* <div className="form-group">
                      <label>Upload Files</label>
                      <input className="form-control" type="file" />
                    </div> */}
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            id="edit_project"
            className="modal custom-modal fade"
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
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Project Name</label>
                          <input
                            className="form-control"
                            defaultValue="Project Management"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Client</label>
                          <select className="select">
                            <option>Global Technologies</option>
                            <option>Delta Infotech</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Start Date</label>
                          <div className="cal-icon">
                            <input
                              className="form-control datetimepicker"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>End Date</label>
                          <div className="cal-icon">
                            <input
                              className="form-control datetimepicker"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>Rate</label>
                          <input
                            placeholder="$50"
                            className="form-control"
                            defaultValue="$5000"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label>&nbsp;</label>
                          <select className="select">
                            <option>Hourly</option>
                            <option selected>Fixed</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Priority</label>
                          <select className="select">
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Add Project Leader</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Team Leader</label>
                          <div className="project-members">
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Jeffery Lalor"
                              className="avatar"
                            >
                              <img
                                src="assets/img/profiles/avatar-16.jpg"
                                alt
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Add Team</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Team Members</label>
                          <div className="project-members">
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="John Doe"
                              className="avatar"
                            >
                              <img
                                src="assets/img/profiles/avatar-16.jpg"
                                alt
                              />
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Richard Miles"
                              className="avatar"
                            >
                              <img
                                src="assets/img/profiles/avatar-09.jpg"
                                alt
                              />
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="John Smith"
                              className="avatar"
                            >
                              <img
                                src="assets/img/profiles/avatar-10.jpg"
                                alt
                              />
                            </a>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              title="Mike Litorus"
                              className="avatar"
                            >
                              <img
                                src="assets/img/profiles/avatar-05.jpg"
                                alt
                              />
                            </a>
                            <span className="all-team">+2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows={4}
                        className="form-control"
                        placeholder="Enter your message here"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Files</label>
                      <input className="form-control" type="file" />
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal custom-modal fade"
            id="delete_project"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Project</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary continue-btn"
                        >
                          Delete
                        </a>
                      </div>
                      <div className="col-6">
                        <a
                          href="javascript:void(0);"
                          data-bs-dismiss="modal"
                          className="btn btn-primary cancel-btn"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      ;
    </div>
  );
}

export default ProjectList;
