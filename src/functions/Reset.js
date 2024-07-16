import { clear } from "./Clear";

export function reset({ setState }) {
  const ok = window.confirm("모든 진행 상황이 초기화될 수 있습니다. 진행하시겠습니까?");
  if (ok) {
    let items = Array.from(JSON.parse(localStorage.getItem("items")));
    items = items.filter(function (item) {
      return item.id < 4;
    });
    localStorage.setItem("items", JSON.stringify(items));
    setState(JSON.parse(localStorage.getItem("items")));
    clear();
  }
}