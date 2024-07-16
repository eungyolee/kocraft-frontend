import React, { useState, useEffect } from "react";
import "./styles/Sidebar.css";
import Item from "./Item";
import { reset } from "../functions/Reset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faBrush, faVolumeXmark, faSun, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { clear } from "../functions/Clear";

export default function Sidebar({ state, postObj, darkMode, toggleDarkMode }) {
  const [items, setItems] = useState([]);
  const [mute, setMute] = useState(false);
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
  }, []);

  function changeMute() {
    setMute(!mute);
  }

  return (
    <>
      <div className="sidebar w-1/4 shadow px-4 py-3 overflow-y-scroll">
        <div className="items">
          {items && items.map((item, index) => (
            <Item key={index} emoji={item.emoji} name={item.name} />
          ))}
        </div>
      </div>
      <div className="bottom">
      <span onClick={() => reset(postObj)}>초기화</span>
      <ul className="right">
        <li onClick={toggleDarkMode}>
          {darkMode ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </li>
        <li onClick={() => clear()}>
          <FontAwesomeIcon icon={faBrush} />
        </li>
        <li onClick={() => changeMute()}>
          {mute ? (
            <FontAwesomeIcon icon={faVolumeXmark} />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} />
          )}
        </li>
      </ul>
    </div>
  </>
  );
}