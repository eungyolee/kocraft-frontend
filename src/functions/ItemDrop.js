// TODO : API 요청, setState is not a function 에러 해결
export function handleItemDrop(e, { setState }) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const item = document.getElementById(data);
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
  fetch("http://100.64.0.36:8001/v1/merge", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { 
      "first_word": emoji1 + name1,
      "second_word": emoji2 + name2
    },
  }).then((response) => response.json()).then((data) => {
    const emoji = data.emoji;
    const word = data.word;
    const id = JSON.parse(localStorage.getItem("items")).length;
    const elementId = Math.random().toString(36).substring(7);
    const newItem = { id, emoji, word };
    const items = JSON.parse(localStorage.getItem("items"));
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    setState(items);
    item.remove();
    item2.remove();
    // <Item /> 생성
    const newItemElement = document.createElement("div");
    newItemElement.id = elementId;
    newItemElement.draggable = true;
    newItemElement.className = "item space-x-1.5 m-1 px-3 py-1 border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg";
    newItemElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.setData("clone", false);
    });
    newItemElement.addEventListener("drop", (e) => {
      handleItemDrop(e, { setState });
    });
    newItemElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    newItemElement.innerHTML = `<span>${emoji}</span><span>${word}</span>`;
    document.querySelector(".items").appendChild(`<Item index={${id}} emoji={${emoji}} name={${word}} />`);
  }).catch((error) => {
    console.log("오류가 발생했습니다 : ", error);
  });
}