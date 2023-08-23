import React from "react";
import './app.css';
import { Homepage } from "./components/Homepage";
import { Topnav } from "./components/Topnav";


function App() {
  return (
    <>
    <div className="">
      <Topnav />
      <Homepage />
    </div>
    </>
  );
}

export default App;
