import { useState } from "react";
import { encrypt } from "../../utils/util";
import LoginApp from "../../LoginApp";

const apiUrl = "http://localhost:3000/api";
const Login = () => {
  // get the email and password
  // use the email and password and post to api
  // if the email and password are correct
  // store the session
  // redirect to students/teachers
  // else
  // show errors on the page
  // clear password

  // go to app and check if loggedIn from session
  // if logged in continue
  // else redirect to login

  // go to Header and get the session data
  // update the page with the loggin user from the session data
  // add  a loggout link with a callback to remove/clear session data

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  console.log({ email });
  console.log({ password });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          const data = await res.json();
          throw new Error(data.error);
        }
      })
      .then((data) => {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("auth", encrypt(JSON.stringify(data)));
        window.location.href = "/students";
      })
      .catch((e) => {
        setErrors(e.message);
        setPassword("");
      });
  };

  const session = sessionStorage.getItem("loggedIn");
  if (session && session === "true") {
    window.location.href = "/students";
  }

  return (
    <LoginApp>
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center py-4">
            <a
              href="index.html"
              className="logo d-flex align-items-center w-auto"
            >
              <img src="assets/img/logo.png" alt="" />
              <span className="d-none d-lg-block">NiceAdmin</span>
            </a>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">
                  Login to Your Account
                </h5>
                <p className="text-center small">
                  Enter your username &amp; password to login
                </p>
              </div>
              {errors && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {errors}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <form className="row g-3 needs-validation">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      @
                    </span>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={email}
                      id="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter your email.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    required=""
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter your password!
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
                <div className="col-12">
                  <p className="small mb-0">
                    Don't have account? <a href="/signup">Create an account</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginApp>
  );
};

export default Login;
