import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Students from './components/Students';

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />

      <main id="main" className="main">
        <Students />
      </main>

      <Footer />
    </>
  );
}

export default App;
