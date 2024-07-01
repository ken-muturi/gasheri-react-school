import React from "react";

const form = (props) => {
  const { student, setCurrentStudent } = props;
  return (
    <div className="edit-student" id="edit-student">
      <div id="edit-student-form" className="mb-3">
        <h2>Student Information Form</h2>
        <form action="/submit-form" method="post">
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Student Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              name="studentName"
              defaultValue={student.name}
              required
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
              defaultValue={student.entrynumber}
              name="entryNumber"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              defaultValue={student.email}
              className="form-control"
              id="email"
              name="email"
              required
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
              defaultValue={student.contactnumber}
              name="contactNumber"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="homeCity" className="form-label">
              Home City
            </label>
            <input
              defaultValue={student.homecity}
              type="text"
              className="form-control"
              id="homeCity"
              name="homeCity"
              required
            />
          </div>
          <div className="mt-3">
            <input type="submit" value="Save" className="btn btn-primary" />{" "}
            &nbsp; &nbsp;
            <input
              type="submit"
              onClick={() => {
                setCurrentStudent(null);
              }}
              value="Cancel"
              className="btn btn-danger"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default form;
