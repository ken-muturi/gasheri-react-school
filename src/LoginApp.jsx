import React from "react";
const LoginApp = (props) => {
  const { children } = props;
  return (
    <main>
      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default LoginApp;
