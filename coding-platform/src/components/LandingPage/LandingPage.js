import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to CODE CONQUER</h1>
      <div className="cards">
        <div className="card" onClick={() => handleNavigation('/playground')}>
          <img src="/images/playground.jpg" alt="Coding Playground" />
          <h2>Coding Playground</h2>
          <p>Experiment with code in an interactive environment.</p>
        </div>
        <div className="card" onClick={() => handleNavigation('/Arena')}>
          <img src="/images/coding_arena.jpg" alt="Coding Arena" />
          <h2>Coding Arena</h2>
          <p>Challenge yourself with coding exercises and problems.</p>
        </div>
        <div className="card" onClick={() => handleNavigation('/battleground')}>
          <img src="/images/battleground.jpg" alt="Coding Battleground" />
          <h2>Coding Battleground</h2>
          <p>Compete with others in coding competitions.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;