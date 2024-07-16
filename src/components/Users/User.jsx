import React from "react";

const Student = (props) => {
  const { id, user, setCurrentUser, handleDelete } = props;
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{user.firstname}</td>
      <td>{user.othernames}</td>
      <td>{user.email}</td>
      <td>
        <span
          className="pointer"
          onClick={() => {
            setCurrentUser(user);
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
            handleDelete(user.id);
          }}
        >
          <i className="bi bi-trash-fill"></i> Delete
        </span>
      </td>
    </tr>
  );
};

export default Student;
