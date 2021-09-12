import flatpickr from "../../node_modules/flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import Notiflix from "../../node_modules/notiflix";
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const timer = qs(".timer");
const value = qsa(".value");
const field = qsa(".field");
const label = qsa(".label");
const startBtn = qs("[data-start]");
const stopBtn = qs("[data-stop]");
const days = qs("[data-days]");
const hours = qs("[data-hours]");
const minutes = qs("[data-minutes]");
const seconds = qs("[data-seconds]");
startBtn.setAttribute("disabled", true);
let dateSet = null
let timerId = null;
timer.style.display = "flex";
value.forEach((val)=>{
  val.style.fontWeight = "600";
  val.style.fontSize = "40px";
});
field.forEach((fiel)=>{
  fiel.style.display = "flex";
  fiel.style.flexDirection = "column";
  fiel.style.alignItems = "center";
  fiel.style.paddingRight = "30px"
})
label.forEach((lab)=>{
  lab.style.textTransform = "uppercase";
  lab.style.fontWeight = "500";
})
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateNow = new Date()
    console.log(selectedDates[0]);
    if(selectedDates[0] <= dateNow){
      Notiflix.Notify.failure("Please choose a date in the future");
    }
    else {startBtn.removeAttribute("disabled");
  dateSet=selectedDates[0]}
  },
};
function addLeadingZero(value){
  return value.toString().padStart(2, 0);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
flatpickr("#date-selector", options)
startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    let dateNow = new Date();
    let milSec = dateSet.getTime()-dateNow.getTime();
  let time = convertMs(milSec);
  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
  }, 1000);
});
stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
});


