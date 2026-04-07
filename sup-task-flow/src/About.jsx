import { useState } from "react";
import "./styles/about.css";

function About() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "background-about dark-mode" : "background-about"}>
      
      <div className="about">
        <a href="/login">Login</a>
        <a href="/register">Sign-up</a>
      </div>

      <button className="dark-toggle-about"
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>

      <div className="text-about">
        <h1 className="header-about">Kanban</h1>
        <p>Organize tasks the simple way.</p>
      </div>

      <div className="about-phone">
        <p className="phone-text">Use our app on your phone and manage your tasks on the go!</p>
      </div>
    </div>
  );
}

export default About;