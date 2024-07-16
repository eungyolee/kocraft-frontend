import React from "react";
import "./styles/Box.css";
import { handleItemDrop } from "../functions/ItemDrop";

export default function Box({ setState }) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const item = document.getElementById(data);
    if (e.dataTransfer.getData("clone") === "false"){
      item.style.position = "absolute";
      item.style.left = e.clientX / window.innerWidth * 100 + "%";
      item.style.top = e.clientY / window.innerHeight * 100 + "%";
      item.style.zIndex = 1000;
    } else {
      const clone = item.cloneNode(true);

      clone.style.position = "absolute";
      clone.style.left = e.clientX / window.innerWidth * 100 + "%";
      clone.style.top = e.clientY / window.innerHeight * 100 + "%";
      clone.style.zIndex = 1000;
      clone.style.opacity = 1;
      clone.id = Math.random().toString(36).substring(7);
      document.body.appendChild(clone);

      clone.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setData("clone", false);
        clone.style.opacity = 0;
      });

      clone.addEventListener("dragend", (e) => {
        clone.style.opacity = 1;
      });

      clone.addEventListener("drop", (e) => handleItemDrop(e, { setState }));

      clone.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
    }
  }
  return (
    <canvas className="box w-3/4 bg-white" onDrop={handleDrop} onDragOver={handleDragOver}></canvas>
  );
}