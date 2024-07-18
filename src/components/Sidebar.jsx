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
        { id: 3, emoji: "💨", name: "바람"},
        { id: 4, emoji: "👪", name: "사람" },
        { id: 5, emoji: "🥵", name: "지구온난화"},
        { id: 6, emoji: "🗑️", name: "쓰레기"},
        { id: 7, emoji: "🍀", name: "친환경"}
      ]));
    }
    setItems(JSON.parse(localStorage.getItem("items")));
  }, []);

  function changeMute() {
    setMute(!mute);
  }

  function searchItem() {
    const search = document.getElementById("search-items").value;
    const items = JSON.parse(localStorage.getItem("items"));
    const filteredItems = items.filter((item) => item.name.includes(search));
    setItems(filteredItems);
    if (search === '') {
      setItems(JSON.parse(localStorage.getItem("items")));
    }
  }

  return (
    <>
      <div className="sidebar w-1/4 shadow px-4 py-3">
        <input type="text" id="search-items" onInput={searchItem} placeholder="🔎 단어 검색" />
        <div className="items">
          {items && items.map((item, index) => (
            <Item key={index} emoji={item.emoji} name={item.name} darkMode={darkMode} />
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