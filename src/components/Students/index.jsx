import React, { useState, useEffect } from "react";

const apiUrL = "http://localhost:3000/api";

const Index = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${apiUrL}/students`).then((res) => res.json());
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <>
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
                    <tr>
                      <th scope="row">{++index}</th>
                      <td>{student.name}</td>
                      <td>{student.entrynumber}</td>
                      <td>{student.email}</td>
                      <td>{student.contactnumber}</td>
                      <td>{student.homecity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
