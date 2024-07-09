import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const App = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default App;
