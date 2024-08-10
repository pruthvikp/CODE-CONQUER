import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import LandingPage from "./components/LandingPage/LandingPage";
import Playground from "./components/Playground/Playground";
import Arena from "./components/Arena/Arena";


function App() {
  return (
    <Router>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/battleground" element={<h2>Coding Battleground</h2>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;