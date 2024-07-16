import axios from "axios";
import { addItem } from "./AddItem";

// TODO : API 요청, setState is not a function 에러 해결
export function handleItemDrop(e, { items, setItems }) {
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

  if (duplicate === "false") {
    item.style.position = "absolute";
    item.style.left = e.clientX / window.innerWidth * 100 + "%";
    item.style.top = e.clientY / window.innerHeight * 100 + "%";
    item.style.zIndex = 1000;
  } else {
    clone = item.cloneNode(true);

    clone.style.position = "absolute";
    clone.style.left = e.clientX / window.innerWidth * 100 + "%";
    clone.style.top = e.clientY / window.innerHeight * 100 + "%";
    clone.style.zIndex = 1000;
    clone.style.opacity = 1;
    clone.id = Math.random().toString(36).substring(7);
    document.body.appendChild(clone);
  }
  const emoji1 = item.children[0].textContent;
  const emoji2 = item2.children[0].textContent;
  const name1 = item.children[1].textContent;
  const name2 = item2.children[1].textContent;
  console.log("item1 :", emoji1 + ' ' + name1);
  console.log("item2 :", emoji2 + ' ' + name2);
  const postData = {
    first_word: emoji1 + ' ' + name1,
    second_word: emoji2 + ' ' + name2,
  }
  axios.post("http://100.64.0.36:8001/v1/merge", postData, {
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
    // <Item /> 생성
    const newItemElement = document.createElement("div");
    newItemElement.id = elementId;
    newItemElement.draggable = true;
    newItemElement.className = "item space-x-1.5 m-1 px-3 py-1 border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg";
    newItemElement.style.position = "absolute";
    newItemElement.style.left = e.clientX / window.innerWidth * 100 + "%";
    newItemElement.style.top = e.clientY / window.innerHeight * 100 + "%";
    newItemElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.setData("clone", false);
    });
    newItemElement.addEventListener("drop", (e) => {
      handleItemDrop(e, { items, setItems });
    });
    newItemElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    newItemElement.innerHTML = `<span>${emoji}</span><span>${name}</span>`;
    document.body.appendChild(newItemElement);
    // document.querySelector(".items").appendChild(`<Item index={${id}} emoji={${emoji}} name={${name}} />`);
    // 만약 생성된 단어가 만약 이미 있다면 추가하지 않음
    Array.from(JSON.parse(localStorage.getItem("items"))).forEach((item) => {
      console.log(item.emoji, item.name);
      if (item.emoji === emoji && item.name === name) {
        flag = false;
      }
    });
    if (flag) {
      const items = JSON.parse(localStorage.getItem("items"));
      items.push(newItem);
      localStorage.setItem("items", JSON.stringify(items));
      addItem(id, emoji, name, { items, setItems });
    }
  }).catch((error) => {
    console.log("오류가 발생했습니다 : ", error);
  });
}