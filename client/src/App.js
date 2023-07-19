import React from "react";
import { useState } from "react";
import Main from "./components/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

// function App() {
//    const { currentForm, setCurrentForm } = useState("login");
//   return (
//     <div>
//       <Login />
//     </div>
//   );
// }
export default App;
