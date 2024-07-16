import React from "react";
import "./styles/Item.css";

export default function Item({ index, emoji, name }) {
  function handleDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  return (
      <div id={name} draggable={true} key={index} onDragStart={handleDrag} className="item space-x-1.5 m-1 px-3 py-1 border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg">
        <span>{emoji}</span>
        <span>{name}</span>
      </div>
  )
}