const refs = {
    daysValue: document.querySelector('[data-value="days"]'),
    hoursValue: document.querySelector('[data-value="hours"]'),
    minutesValue: document.querySelector('[data-value="mins"]'),
    secondsValue: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    };

    start() {
        const intervalId = setInterval(() => {
            const currentDate = Date.now();
            const deltaTime = this.targetDate - currentDate;
            const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
            
            if (deltaTime > 0) {
                refs.daysValue.textContent = `${days}`;
                refs.hoursValue.textContent = `${hours}`;
                refs.minutesValue.textContent = `${mins}`;
                refs.secondsValue.textContent = `${secs}`;
            } else {
                clearInterval(intervalId);
              }

            // console.log(`${days}:${hours}:${mins}:${secs}`);
        }, 1000)
    };
    
    pad(value) {
        return String(value).padStart(2, '0');
    };
    
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    };
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 24 2021 GMT+0300'),
});

timer.start();