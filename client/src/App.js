import React from "react";
import Main from "./components/main"
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Example from './components/pieChart';


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
