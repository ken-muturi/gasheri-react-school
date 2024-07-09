import React, { useState, useEffect } from "react";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import Student from "./Student";
import App from "../../App";
const apiUrL = "http://localhost:3000/api";

const Index = () => {
  const [students, setStudents] = useState([]);

  const [currentStudent, setCurrentStudent] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const [success, showSuccess] = useState("");
  const [error, showError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${apiUrL}/students`).then((res) => res.json());
      setStudents(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrL}/students/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setStudents(students.filter((d) => d.id !== id));
        showSuccess("Success deleting student");
      })
      .catch((e) => {
        showError("Error deleting student" + e);
      });
  };

  return (
    <App>
      <div className="pagetitle">
        <h1>Blank Page</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Pages</li>
            <li className="breadcrumb-item active">Blank</li>
          </ol>
        </nav>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Students</h5>
            {success && (
              <div
                className="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
                role="alert"
              >
                Success saving students
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            {error && (
              <div
                className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show"
                role="alert"
              >
                Error saving student
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            <table className="table table-hover  table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Entry Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Home City</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  return (
                    <Student
                      key={index}
                      id={++index}
                      student={student}
                      setCurrentStudent={setCurrentStudent}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </tbody>
            </table>
            <p>
              <a
                href="#"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setShowAddStudentForm(true);
                }}
              >
                Add Student
              </a>
            </p>
            {showAddStudentForm && (
              <AddStudent
                setStudents={setStudents}
                setShowError={showError}
                setShowSuccess={showSuccess}
                setShowAddStudentForm={setShowAddStudentForm}
              />
            )}

            {currentStudent && (
              <EditStudent
                setStudents={setStudents}
                setShowError={showError}
                setShowSuccess={showSuccess}
                setCurrentStudent={setCurrentStudent}
                student={currentStudent}
              />
            )}
          </div>
        </div>
      </section>
    </App>
  );
};

export default Index;
