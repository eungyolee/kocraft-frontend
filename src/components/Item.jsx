import React from "react";
import "./styles/Item.css";
import { handleItemDrop } from "../functions/ItemDrop";

export default function Item({ index, emoji, name }) {
  function handleDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.setData("clone", true);
  }

  return (
      <div id={name} draggable={true} key={index} onDragStart={handleDrag} onDrop={handleItemDrop} className="item space-x-1.5 m-1 px-4 py-2 border-gray-200 shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg">
        <span>{emoji}</span>
        <span>{name}</span>
      </div>
  )
}