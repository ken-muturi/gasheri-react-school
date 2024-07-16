import { useState } from "react";
const apiUrl = "http://localhost:3000/api";
const Form = (props) => {
  const { user, setCurrentUser, setSuccess, setUsers } = props;

  const [errors, setErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [userDetails, setUserDetails] = useState(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors("");

    let userData = userDetails;
    delete user.confirmPassword;

    fetch(apiUrl + "/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
        console.log({ data });
        setUserDetails(null);

        if (user == null) {
          console.log("hhhahahahhaeeeeee");
          setFormSuccess("Signup completed.");
          window.location.href = "/";
        } else {
          setSuccess("Success adding user");
          setUsers((prevUser) => {
            return [...prevUser, data];
          });
          setCurrentUser(null);
        }
      })
      .catch((e) => {
        setErrors(e.message);
      });
  };

  return (
    <form className="row g-3 needs-validation">
      {errors && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errors}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {formSuccess && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {formSuccess}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
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
            defaultValue={userDetails?.email}
            id="email"
            onChange={(event) =>
              setUserDetails({
                ...userDetails,
                email: event.target.value,
              })
            }
          />
          <div className="invalid-feedback">Please enter your email.</div>
        </div>
      </div>
      <div className="col-12">
        <label htmlFor="firstname" className="form-label">
          Firstname
        </label>
        <input
          type="text"
          name="firstname"
          className="form-control"
          required=""
          defaultValue={userDetails?.firstname}
          onChange={(event) =>
            setUserDetails({
              ...userDetails,
              firstname: event.target.value,
            })
          }
        />
        <div className="invalid-feedback">Please enter your Firstname!</div>
      </div>
      <div className="col-12">
        <label htmlFor="othernames" className="form-label">
          Othernames
        </label>
        <input
          type="text"
          name="lastname"
          className="form-control"
          required=""
          defaultValue={userDetails?.othernames}
          onChange={(event) =>
            setUserDetails({
              ...userDetails,
              othernames: event.target.value,
            })
          }
        />
        <div className="invalid-feedback">Please enter your othernames!</div>
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
          defaultValue={userDetails?.password}
          onChange={(event) =>
            setUserDetails({
              ...userDetails,
              password: event.target.value,
            })
          }
        />
        <div className="invalid-feedback">Please enter your password!</div>
      </div>

      <div className="col-12">
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          id="confirmPassword"
          defaultValue={userDetails?.confirmPassword}
          onChange={(event) => {
            if (userDetails.password !== event.target.value) {
              setErrors("Password confirm does not match password.");
            } else {
              setErrors("");
              setUserDetails({
                ...userDetails,
                confirmPassword: event.target.value,
              });
            }
          }}
        />
        <div className="invalid-feedback">
          Please enter your confirm password!
        </div>
      </div>
      <div className="col-12">
        <button
          className="btn btn-primary w-100"
          type="submit"
          onClick={handleSubmit}
        >
          {user === null ? "Signup" : "Save"}
        </button>
      </div>
      {user === null && (
        <div className="col-12">
          <p className="small mb-0">
            Have an account? <a href="/">Login</a>
          </p>
        </div>
      )}
    </form>
  );
};

export default Form;
