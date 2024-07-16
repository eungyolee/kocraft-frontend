import React from "react";
import "./styles/Box.css";

export default function Box() {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const item = document.getElementById(data);
    const clone = item.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = e.clientX / window.innerWidth * 100 + "%";
    clone.style.top = e.clientY / window.innerHeight * 100 + "%";
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);
    // 이 클론한 애들도 드래그 가능하게 만들어야 함
    clone.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
    });
  }
  return (
    <canvas className="box w-3/4 bg-white" onDrop={handleDrop} onDragOver={handleDragOver}></canvas>
  );
}