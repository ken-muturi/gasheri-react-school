import React from "react";
import Form from "../Signup/form";
import Modal from "../Modal";

const UserForm = (props) => {
  const { user, setCurrentUser, setSuccess, setUsers } = props;

  return (
    <Modal onClose={setCurrentUser}>
      <Form
        user={user}
        setUsers={setUsers}
        setSuccess={setSuccess}
        setCurrentUser={setCurrentUser}
      />
    </Modal>
  );
};

export default UserForm;
