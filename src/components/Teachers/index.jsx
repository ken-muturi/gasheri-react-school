import React, { useState, useEffect } from "react";
import AddTeacher from "./AddTeacher";
import EditTeacher from "./EditTeacher";
import Teacher from "./Teacher";
import App from "../../App";
const apiUrL = "http://localhost:3000/api";

const Index = () => {
  const [teachers, setTeachers] = useState([]);

  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);

  const [success, showSuccess] = useState("");
  const [error, showError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${apiUrL}/teachers`).then((res) => res.json());
      setTeachers(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrL}/teachers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setTeachers(teachers.filter((d) => d.id !== id));
        showSuccess("Success deleting Teacher");
      })
      .catch((e) => {
        showError("Error deleting Teacher" + e);
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
            <h5 className="card-title">Teachers</h5>
            {success && (
              <div
                className="alert alert-success bg-success text-light border-0 alert-dismissible fade show"
                role="alert"
              >
                Success saving Teachers
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
                Error saving Teacher
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
                {teachers.map((teacher, index) => {
                  return (
                    <Teacher
                      key={index}
                      id={++index}
                      teacher={teacher}
                      setCurrentTeacher={setCurrentTeacher}
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
                  setShowAddTeacherForm(true);
                }}
              >
                Add Teacher
              </a>
            </p>
            {showAddTeacherForm && (
              <AddTeacher
                setTeachers={setTeachers}
                setShowError={showError}
                setShowSuccess={showSuccess}
                setShowAddTeacherForm={setShowAddTeacherForm}
              />
            )}

            {currentTeacher && (
              <EditTeacher
                setTeachers={setTeachers}
                setShowError={showError}
                setShowSuccess={showSuccess}
                setCurrentTeacher={setCurrentTeacher}
                teacher={currentTeacher}
              />
            )}
          </div>
        </div>
      </section>
    </App>
  );
};

export default Index;
