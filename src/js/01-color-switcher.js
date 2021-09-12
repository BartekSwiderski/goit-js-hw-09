const qs = (selector) => document.querySelector(selector);
const startBtn = qs("[data-start]");
const stopBtn = qs("[data-stop]");
const cont = qs("body")
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  timerId = setInterval(() => {
   let color = getRandomHexColor();
   console.log(color);
   cont.style.backgroundColor = color;
  }, 1000);
});
stopBtn.addEventListener("click", () => {
  startBtn.removeAttribute("disabled");
  clearInterval(timerId);
});
