import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import Sidebar from '../components/Sidebar';
import './styles/Home.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const postObj = {setState : setItems};
  
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  }

  useEffect(() => {
    if (localStorage.getItem("items") === null) {
      localStorage.setItem("items", JSON.stringify([
        { id: 0, emoji: "💧", name: "물" },
        { id: 1, emoji: "🔥", name: "불" },
        { id: 2, emoji: "🌏", name: "땅" },
        { id: 3, emoji: "💨", name: "바람"}
      ]));
    }
    setItems(JSON.parse(localStorage.getItem("items")));

    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", JSON.stringify(false));
    }
    setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
  }, []);
  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Box state={items} postObj={postObj} darkMode={darkMode} />
      <hr />
      <Sidebar state={items} postObj={postObj} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}