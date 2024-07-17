import { clear } from "./Clear";

export function reset({ setState, setDarkMode }) {
  const ok = window.confirm("모든 진행 상황이 초기화될 수 있습니다. 진행하시겠습니까?");
  if (ok) {
    let items = Array.from(JSON.parse(localStorage.getItem("items")));
    items = items.filter(function (item) {
      return item.id < 10;
    });
    localStorage.setItem("items", JSON.stringify(items));
    setState(JSON.parse(localStorage.getItem("items")));
    localStorage.clear();
    // clear()가 완전히 끝난 후 페이지 새로고침
    clear();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}