import React from "react";
import './app.css';
import { Homepage } from "./components/Homepage";
import { Topnav } from "./components/Topnav";
import { Route, Routes } from "react-router-dom"
import { About } from "./components/About";


function App() {
  return (
    <>
    <div className="">
      <Topnav />
      <Homepage />
      {/* <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
      </Routes> */}
    </div>
    </>
  );
}

export default App;
