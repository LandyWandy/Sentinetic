import React from "react";
import Main from "./components/main"
import Example from './components/pieChart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
        <>
        
        <div className="pie-chart">

      <Example />

        </div>

    <div>
      <Main />
    </div>

        </>
  );
}
export default App;
