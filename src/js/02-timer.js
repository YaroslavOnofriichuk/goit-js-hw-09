import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from "./function/convertMs";
import addLeadingZero from "./function/addLeadingZero";

const refs = {
    input: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    dateFormat: "d-m-y H:i",
    minuteIncrement: 1,
    onClose(selectedDates) {    
        if (Date.now() > selectedDates[0].getTime()) {
            Notify.warning("Please choose a date in the future");
            return;
        }
        refs.startBtn.removeAttribute('disabled');
    },
};

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick () {
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.input.setAttribute('disabled', 'disabled');

    let selectDate = refs.input._flatpickr.selectedDates[0];
    let timerId = null;

    timerId = setInterval(() => {
        const diffObj = convertMs(selectDate.getTime() - Date.now());
        
        refs.days.textContent = addLeadingZero(diffObj.days);
        refs.hours.textContent = addLeadingZero(diffObj.hours);
        refs.minutes.textContent = addLeadingZero(diffObj.minutes);
        refs.seconds.textContent = addLeadingZero(diffObj.seconds);

        if ((selectDate.getTime() - Date.now()) <= 1000) {
            clearInterval(timerId);
        };
    }, 1000);

  
};



