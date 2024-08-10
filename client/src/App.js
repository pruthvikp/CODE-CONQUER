import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Main/Home";
import Problem from "./components/Problem/Problem";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <ToastContainer />
      <div className="main">
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/problem/:id" element={<Problem />} />
          <Route exact path="/" element={<Navigate replace to="/home" />} />
        </Routes>
        

      </div>
    </div>
  );
}

export default App;