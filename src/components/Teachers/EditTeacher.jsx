import React, { useState } from "react";
const apiUrL = "http://localhost:3000/api";

const Form = (props) => {
  const {
    teacher,
    setCurrentTeacher,
    setShowError,
    setShowSuccess,
    setTeachers,
  } = props;

  const [teacherDetails, setTeacherDetails] = useState(teacher);
  console.log({ teacherDetails });

  const handleFormElement = (input, value) => {
    setTeacherDetails({
      ...teacherDetails,
      [input]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrL}/teachers/${teacherDetails.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherDetails),
    })
      .then((res) => res.json())
      .then((d) => {
        setShowSuccess("Success deleting teacher");
        setTeachers((prevTeachers) => {
          return prevTeachers.map((s) => {
            // if(s.id === teacherDetails.id) {
            //   return teacherDetails;
            // }
            // return s;
            return s.id === teacherDetails.id ? teacherDetails : s;
          });
        });
        setCurrentTeacher(null);
      })
      .catch((e) => {
        setShowError("Error deleting teacher" + e);
      });
  };

  return (
    <div className="school-modal" id="edit-teacher">
      <div id="school-modal-form " className="mb-3">
        <h2>Teacher Information Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="teacherName" className="form-label">
              Teacher Name
            </label>
            <input
              type="text"
              className="form-control"
              id="teacherName"
              name="teacherName"
              defaultValue={teacherDetails.name}
              required
              onChange={(e) => {
                // console.log({ event: e.target.value });
                setTeacherDetails({
                  ...teacherDetails,
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
              defaultValue={teacherDetails.entrynumber}
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
              defaultValue={teacherDetails.email}
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
              defaultValue={teacherDetails.contactnumber}
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
              defaultValue={teacherDetails.homecity}
              type="text"
              className="form-control"
              id="homeCity"
              name="homeCity"
              required
              onChange={(e) => {
                setTeacherDetails({
                  ...teacherDetails,
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
                  setCurrentTeacher(null);
                }}
                value="Cancel"
                className="btn btn-danger"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
