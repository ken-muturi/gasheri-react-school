import React from "react";

const index = (props) => {
  const { children, onClose } = props;
  return (
    <div className="school-modal" id="edit-student">
      <div id="school-modal-form" className="mb-3">
        <p className="text-end">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose(null);
            }}
          >
            <i className="bi bi-x-lg text-secondary font-weight-medium"></i>
          </a>
        </p>
        {children}
      </div>
    </div>
  );
};
export default index;
