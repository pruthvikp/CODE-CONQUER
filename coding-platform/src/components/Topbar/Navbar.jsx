import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handlePlayground = () => {
    navigate("/Playground");
  };

  const handleArena = () => {
    navigate("/arena");
  };

  const handleBattleground = () => {
    navigate("/battleground");
  };

  return (
    <nav>
      <div className="navbar-container">
        <button className="nav-btn" onClick={handlePlayground}>
          PLAYGROUND
        </button>
        <button className="nav-btn" onClick={handleArena}>
          ARENA
        </button>
        <button className="nav-btn" onClick={handleBattleground}>
          BATTLEGROUND
        </button>
      </div>
    </nav>
  );
};

export default Navbar;