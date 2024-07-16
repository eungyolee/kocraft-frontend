import React, { useState, useEffect } from "react";
import "./styles/Sidebar.css";
import Item from "./Item";
import { reset } from "../functions/Reset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faBrush, faVolumeXmark, faSun, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { clear } from "../functions/Clear";

export default function Sidebar() {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [mute, setMute] = useState(false);
  const postObj = {setState : setItems};
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

  function addItem(id, emoji, name) {
    const newItems = [...items, { id, emoji, name }];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }

  function changeColorMode() {
    setDarkMode(!darkMode);
  }

  function changeMute() {
    setMute(!mute);
  }

  return (
    <>
      <div className="sidebar w-1/4 shadow px-4 py-3 border-gray-200 border rounded-lg overflow-y-scroll bg-slate-50">
        <div className="items">
          {items && items.map((item, index) => (
            <Item key={index} emoji={item.emoji} name={item.name} />
          ))}
          <button onClick={() => {addItem(items.length, "🍋", "lemon")}}>레몬</button>
        </div>
      </div>
      <div className="bottom">
      <span onClick={() => reset(postObj)}>초기화</span>
      <ul className="right">
        <li onClick={() => changeColorMode()}>
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