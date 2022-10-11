import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { endPoint } from "../../config/config";
import logo from "../../assets/logo2.png";
function Authuntication({ setisLogin }) {
  const [credientials, setCredientials] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const [logInAuth, setlogInAuth] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });

  const onLogin = (e) => {
    e.preventDefault();

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", logInAuth.username);
    urlencoded.append("password", logInAuth.password);
    urlencoded.append("grant_type", "password");
    fetch(endPoint + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlencoded,
    })
      .then((result) => {
        result.json().then((response) => {
          if (result.status === 200) {
            localStorage.setItem("access_token", JSON.stringify(response));
            setisLogin(true);
          } else {
            console.log("no data found");
            setCredientials(true);
            // setdisableLoginButton(false);
          }
        });
      })
      .catch((error) => console.log("error", error));
    localStorage.setItem("authUser", endPoint);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div class="account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            <div className="account-logo">
              <a>
                <img src={logo} alt="Dreamguy's Technologies" />
              </a>
            </div>
            <div className="account-box" onSubmit={onLogin}>
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                <form action="admin-dashboard.html">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>Email Address</label>
                    <input
                      className="form-control"
                      type="text"
                      value={logInAuth.username}
                      onChange={(e) => {
                        setCredientials(false);
                        setlogInAuth({
                          ...logInAuth,
                          username: e.target.value,
                        });
                      }}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label style={{ display: "flex" }}>Password</label>
                      </div>
                      <div className="col-auto">
                        <a className="text-muted" href="forgot-password.html">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        type={passwordType}
                        id="password"
                        placeholder="Password"
                        value={logInAuth.password}
                        onChange={(e) => {
                          setCredientials(false);
                          setlogInAuth({
                            ...logInAuth,
                            password: e.target.value,
                          });
                        }}
                      />
                      <span onClick={togglePassword}>
                        {passwordType === "password" ? (
                          <span
                            className="	far fa-eye-slash"
                            id="toggle-password"
                          />
                        ) : (
                          <span className="	far fa-eye" id="toggle-password" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    {credientials ? <code>Wrong credientials</code> : ""}
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        //   // setdisableLoginButton(true);

                        onLogin(e);
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Don't have an account yet?{" "}
                      <a href="register.html">Register</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authuntication;
