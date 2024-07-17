import axios from "axios";

export function handleItemDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const duplicate = e.dataTransfer.getData("clone");
  const item = document.getElementById(data);
  let clone;
  let item2;
  if (e.target.tagName === "SPAN") {
    item2 = document.getElementById(e.target.parentElement.id);
  } else {
    item2 = document.getElementById(e.target.id);
  }

  const emoji1 = item.children[0].textContent;
  const emoji2 = item2.children[0].textContent;
  const name1 = item.children[1].textContent;
  const name2 = item2.children[1].textContent;

  item2.remove();

  if (duplicate === "false") {
    item.style.position = "absolute";
    item.style.left = e.clientX / window.innerWidth * 100 + "%";
    item.style.top = e.clientY / window.innerHeight * 100 + "%";
    item.style.zIndex = 1000;

    item.remove();
  } else {
    clone = item.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = e.clientX / window.innerWidth * 100 + "%";
    clone.style.top = e.clientY / window.innerHeight * 100 + "%";
    clone.style.zIndex = 1000;
    clone.style.opacity = 1;
    clone.id = Math.random().toString(36).substring(7);
    document.querySelector(".App").appendChild(clone);

    clone.style.opacity = 0;
  }
  const tempItem = document.createElement("div");
  tempItem.className = "item space-x-1.5 m-1 px-4 py-2 border-gray-200 shadow cursor-pointer transition inline-block font-medium border rounded-lg";
  tempItem.style.position = "absolute";
  tempItem.style.left = e.clientX / window.innerWidth * 100 + "%";
  tempItem.style.top = e.clientY / window.innerHeight * 100 + "%";
  tempItem.style.zIndex = 1000;
  tempItem.draggable = false;
  tempItem.innerText = "생성 중...";
  document.querySelector(".App").appendChild(tempItem);
  console.log("item1 :", emoji1 + ' ' + name1);
  console.log("item2 :", emoji2 + ' ' + name2);
  const postData = {
    first_word: emoji1 + ' ' + name1,
    second_word: emoji2 + ' ' + name2,
  }
  axios.post("https://craft.runa.pw/v1/merge", postData, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    // console.log(response.data.response.emoji, response.data.response.word);
    const emoji = response.data.response.emoji;
    const name = response.data.response.word;
    const id = JSON.parse(localStorage.getItem("items")).length;
    const elementId = Math.random().toString(36).substring(7);
    const newItem = { id, emoji, name };
    let flag = true;
    console.log(newItem);
    item2.remove();
    if (duplicate === "false") {
      item.remove();
    } else {
      clone.remove();
    }
    tempItem.remove();
    // <Item /> 생성
    const newItemElement = document.createElement("div");
    newItemElement.id = elementId;
    newItemElement.draggable = true;
    newItemElement.className = "item space-x-1.5 m-1 px-4 py-2 border-gray-200 shadow cursor-pointer transition inline-block font-medium border rounded-lg";
    newItemElement.style.position = "absolute";
    newItemElement.style.left = e.clientX / window.innerWidth * 100 + "%";
    newItemElement.style.top = e.clientY / window.innerHeight * 100 + "%";
    newItemElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.setData("clone", false);
    });
    newItemElement.addEventListener("drop", (e) => {
      handleItemDrop(e);
    });
    newItemElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    newItemElement.innerHTML = `<span>${emoji}</span><span>${name}</span>`;
    document.querySelector(".App").appendChild(newItemElement);
    Array.from(JSON.parse(localStorage.getItem("items"))).forEach((item) => {
      if (item.name === name) {
        flag = false;
      }
    });
    if (flag) {
      const items = JSON.parse(localStorage.getItem("items"));
      items.push(newItem);
      localStorage.setItem("items", JSON.stringify(items));
      const newSidebarItem = document.createElement("div");
      newSidebarItem.id = newItemElement.children[1].textContent;
      newSidebarItem.draggable = true;
      newSidebarItem.className = "item space-x-1.5 m-1 px-4 py-2 border-gray-200 shadow cursor-pointer transition inline-block font-medium border rounded-lg";
      newSidebarItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setData("clone", true);
      });
      newSidebarItem.addEventListener("drop", (e) => {
        handleItemDrop(e);
      });
      newItemElement.className = "item space-x-1.5 m-1 px-4 py-2 border-gray-200 shadow cursor-pointer transition inline-block font-medium border rounded-lg";
      newSidebarItem.innerHTML = `<span>${emoji}</span><span>${name}</span>`;
      document.querySelector(".sidebar > .items").appendChild(newSidebarItem);
    }
  }).catch((error) => {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  });
}