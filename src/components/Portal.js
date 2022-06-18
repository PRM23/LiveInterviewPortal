import React, { useEffect, useState, useRef } from "react";
import "./Portal.css";
import axios from "axios";
import image from "./image/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

let reCaptchaToken = "";
function Portal() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const recaptchaRef = (value) => {
    reCaptchaToken = value;
  };
  const TEST_SITE_KEY = "6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5";

  let url = "http://admin.liveexamcenter.in/api/auth/login";

  const SubmitHandler = (e) => {
    e.preventDefault();

    const payload = JSON.stringify({
      email: email,
      password: pwd,
      reCaptchaToken: reCaptchaToken,
    });

    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.token);
        navigate("/dashboard");
        localStorage.setItem("_activeUser", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
        alert(err);
        navigate("/");
      });

    // let data = { email, pwd, reCaptchaToken };
    // const recaptchaOption = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ data }),
    // };

    // fetch(
    //   "http://admin.liveexamcenter.in/api/auth/login",
    //   recaptchaOption
    // ).then((res) => res.json());
    // console.log("login added!");
  };

  return (
    <>
      <div class="container">
        <img src={image} />
        <section class="vh-100 ">
          <div class="container py-5 h-100 ">
            <div class="row d-flex align-items-center justify-content-center h-100">
              <div class="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  class="img-fluid"
                  alt="Phone image"
                />
              </div>

              <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 ">
                <h4>Login To Your Account</h4>
                <form>
                  <div class="form-outline mb-4 border">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="form1Example13"
                      class="form-control form-control-lg"
                      required
                    />
                    <label class="form-label" for="form1Example13">
                      Email address
                    </label>
                  </div>
                  <div class="form-outline mb-4 border">
                    <input
                      type="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      id="form1Example23"
                      class="form-control form-control-lg"
                      required
                    />
                    <label class="form-label" for="form1Example23">
                      Password
                    </label>
                  </div>
                  <div class="d-flex justify-content-around align-items-center mb-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                      />
                      <label class="form-check-label" for="form1Example3">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                    <a href="#!">Forgot password?</a>
                  </div>
                  <GoogleReCaptchaProvider reCaptchaKey={TEST_SITE_KEY}>
                    <GoogleReCaptcha onVerify={recaptchaRef} />
                  </GoogleReCaptchaProvider>

                  <button
                    type="submit"
                    class="btn btn-primary btn-lg btn-block"
                    style={{
                      width: "inherit",
                      display: "initial",
                      margin: "3px",
                    }}
                    onClick={SubmitHandler}
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>{" "}
      </div>
    </>
  );
}

export default Portal;
