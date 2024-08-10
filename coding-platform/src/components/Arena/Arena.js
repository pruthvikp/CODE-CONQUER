import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../Main/Home";
import Problem from "../Problem/Problem";

const Arena = () => {
    const user = localStorage.getItem("token");
    return (
      <div className="App">
        <ToastContainer />
        <div className="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/problem/:id" element={<Problem />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </div>
    );
};

export default Arena;
