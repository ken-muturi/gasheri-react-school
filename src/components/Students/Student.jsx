import React from "react";

const Student = (props) => {
  const { id, student, setCurrentStudent, handleDelete } = props;
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{student.name}</td>
      <td>{student.entrynumber}</td>
      <td>{student.email}</td>
      <td>{student.contactnumber}</td>
      <td>{student.homecity}</td>
      <td>
        <span
          className="pointer"
          onClick={() => {
            setCurrentStudent(student);
          }}
        >
          <i className="bi bi-pencil-square"></i> Edit
        </span>
        |
        <a href="#" className="pointer">
          <i className="bi bi-trash-fill"></i> Profile
        </a>
        |
        <span
          className="pointer"
          onClick={() => {
            handleDelete(student.id);
          }}
        >
          <i className="bi bi-trash-fill"></i> Delete
        </span>
      </td>
    </tr>
  );
};

export default Student;
