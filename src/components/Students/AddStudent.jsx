import React, { useState } from "react";
import Modal from "../Modal";
const apiUrL = "http://localhost:3000/api";

const Form = (props) => {
  const { setShowAddStudentForm, setShowError, setShowSuccess, setStudents } =
    props;

  const [studentDetails, setStudentDetails] = useState({
    email: "",
    entrynumber: "",
    homecity: "",
    name: "",
  });
  console.log({ studentDetails });

  const handleFormElement = (input, value) => {
    setStudentDetails({
      ...studentDetails,
      [input]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrL}/students`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentDetails),
    })
      .then((res) => res.json())
      .then((d) => {
        setShowSuccess("Success deleting student");
        // console.log(d);
        setStudents((prevStudents) => {
          return [...prevStudents, d];
        });
        setShowAddStudentForm(false);
      })
      .catch((e) => {
        setShowError("Error deleting student" + e);
      });
  };

  return (
    <Modal onClose={setShowAddStudentForm}>
      <h2>Student Information Form</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="studentName"
            name="studentName"
            defaultValue={studentDetails.name}
            required
            onChange={(e) => {
              // console.log({ event: e.target.value });
              setStudentDetails({
                ...studentDetails,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="entryNumber" className="form-label">
            Entry Number
          </label>
          <input
            type="text"
            className="form-control"
            id="entryNumber"
            defaultValue={studentDetails.entrynumber}
            name="entryNumber"
            required
            onChange={(e) => {
              handleFormElement("entrynumber", e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            defaultValue={studentDetails.email}
            className="form-control"
            id="email"
            name="email"
            required
            onChange={(e) => {
              handleFormElement("email", e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            defaultValue={studentDetails.contactnumber}
            name="contactNumber"
            required
            onChange={(e) => {
              handleFormElement("contactnumber", e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="homeCity" className="form-label">
            Home City
          </label>
          <input
            defaultValue={studentDetails.homecity}
            type="text"
            className="form-control"
            id="homeCity"
            name="homeCity"
            required
            onChange={(e) => {
              setStudentDetails({
                ...studentDetails,
                homecity: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-5 mb-2">
          <hr />
          <div className="pt-2">
            <input
              type="submit"
              // onClick={(e) => { handleFormSubmit(e) }}
              onClick={handleFormSubmit}
              value="Save"
              className="btn btn-primary"
            />{" "}
            &nbsp; &nbsp;
            <input
              type="submit"
              onClick={() => {
                setShowAddStudentForm(null);
              }}
              value="Cancel"
              className="btn btn-danger"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
