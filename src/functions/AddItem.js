export function addItem(id, emoji, name, { items, setItems }) {
  const newItems = [...items, { id, emoji, name }];
  setItems(newItems);
  localStorage.setItem("items", JSON.stringify(newItems));
}