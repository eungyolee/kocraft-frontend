export function clear() {
  const itemsInBody = document.querySelectorAll(".App > .item");
  itemsInBody.forEach((item) => {
    let size = 1;
    const interval = setInterval(() => {
      size -= 0.1;
      item.style.transform = `scale(${size})`;
      if (size <= 0) {
        clearInterval(interval);
        item.remove();
      }
    }, 30);
  });
}