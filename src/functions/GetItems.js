export const GetItems = () => {
  if (localStorage.getItem("items") === null) {
    localStorage.setItem("items", JSON.stringify([
      { id: 0, emoji: "💧", name: "물" },
      { id: 1, emoji: "🔥", name: "불" },
      { id: 2, emoji: "🌏", name: "땅" },
      { id: 3, emoji: "💨", name: "바람"}
    ]));
  }
  return JSON.parse(localStorage.getItem("items"));
}