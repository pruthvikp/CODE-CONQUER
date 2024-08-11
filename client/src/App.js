import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import LandingPage from "./components/LandingPage/LandingPage";
import Playground from "./components/Playground/Playground";
import Arena from "./components/Arena/Arena"; 
import SupportPage from './components/Support/SupportPage';
import Battleground from './components/Battleground/Battleground'; // Import Battleground component

// Imported components from the new app
import Home from "./components/Main/Home";
import Problem from "./components/Problem/Problem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <Routes>
          {/* Original Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/battleground" element={<Battleground />} /> {/* Add Battleground route */}
          <Route path="/support" element={<SupportPage />} />

          {/* Integrated Arena Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/arena" element={<Navigate replace to="/home" />} /> {/* Redirect to Home when Arena is accessed */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
