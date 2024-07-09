import React from "react";

const Teacher = (props) => {
  const { id, teacher, setCurrentTeacher, handleDelete } = props;
  console.log({ teacher });
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{teacher.name}</td>
      <td>{teacher.entrynumber}</td>
      <td>{teacher.email}</td>
      <td>{teacher.contactnumber}</td>
      <td>{teacher.homecity}</td>
      <td>
        <span
          className="pointer"
          onClick={() => {
            setCurrentTeacher(teacher);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </span>
        |
        <span
          className="pointer"
          onClick={() => {
            handleDelete(teacher.id);
          }}
        >
          <i className="bi bi-trash-fill"></i>
        </span>
      </td>
    </tr>
  );
};

export default Teacher;
