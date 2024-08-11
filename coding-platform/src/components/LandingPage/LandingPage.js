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
      <header className="landing-header">
        <h1>Welcome to CODE CONQUER</h1>
        <p>Your ultimate destination for mastering coding skills through interactive and competitive experiences.</p>
      </header>
      <section className="intro-section">
        <h2>Why Choose CODE CONQUER?</h2>
        <p>CODE CONQUER is more than just a coding platform—it's a vibrant community where learners and experts come together to improve their skills and tackle challenges. Whether you're a beginner exploring the world of coding or an advanced developer looking to test your abilities, our platform offers something for everyone.</p>
        <div className="features">
          <div className="feature-item">
            <h3>Interactive Learning</h3>
            <p>Dive into our Coding Playground to experiment with code and gain hands-on experience.</p>
          </div>
          <div className="feature-item">
            <h3>Challenging Exercises</h3>
            <p>Sharpen your skills with a wide range of coding problems in the Arena.</p>
          </div>
          <div className="feature-item">
            <h3>Competitive Edge</h3>
            <p>Participate in coding competitions and prove your skills in the Battleground.</p>
          </div>
        </div>
      </section>
      
      <div className="cards">
        <div className="card" onClick={() => handleNavigation('/playground')}>
          <img src="/images/playground.jpg" alt="Coding Playground" />
          <h2>Coding Playground</h2>
          <p>Experiment with code in an interactive environment where you can freely test your ideas and learn new concepts.</p>
          <button className="card-button">Explore Playground</button>
        </div>
        <div className="card" onClick={() => handleNavigation('/Arena')}>
          <img src="/images/coding_arena.jpg" alt="Coding Arena" />
          <h2>Coding Arena</h2>
          <p>Challenge yourself with a variety of coding exercises and problems designed to sharpen your skills and push your limits.</p>
          <button className="card-button">Enter Arena</button>
        </div>
        <div className="card" onClick={() => handleNavigation('/battleground')}>
          <img src="/images/battleground.jpg" alt="Coding Battleground" />
          <h2>Coding Battleground</h2>
          <p>Compete with others in coding competitions that test your problem-solving abilities and offer recognition for your achievements.</p>
          <button className="card-button">Join Battleground</button>
        </div>
      </div>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"CODE CONQUER has transformed the way I approach coding challenges. The interactive Playground and Arena have made learning fun and effective!"</p>
          <cite>- Lakshmi K. M., Software Engineer</cite>
        </div>
        <div className="testimonial">
          <p>"I love the competitive aspect of the Battleground. It pushes me to improve and compete with other talented coders."</p>
          <cite>- Gourav H. G., Web Developer</cite>
        </div>
        <div className="testimonial">
          <p>"CODE CONQUER has been a game-changer for my coding journey. The interactive exercises and real-time feedback have greatly improved my problem-solving skills."</p>
          <cite>- Advith N., Data Scientist</cite>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2024 CODE CONQUER. All rights reserved.</p>
        <p>Need help? <a href="/support">Contact our support team</a> for assistance.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
