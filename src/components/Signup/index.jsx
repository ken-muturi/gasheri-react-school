import React, { useState } from "react";
import Form from "./form";

const SignUp = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex justify-content-center py-4">
          <a href="/" className="logo d-flex align-items-center w-auto">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <div className="pt-4 pb-2">
              <h5 className="card-title text-center pb-0 fs-4">
                Create an account
              </h5>
            </div>
            <Form
              user={null}
              setCurrentUser={() => {}}
              setSuccess={() => {}}
              setUsers={() => console.log("signup")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
