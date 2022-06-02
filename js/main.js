import calendar from './calendar.js';

let curMonth = new Date().toLocaleString('default', { month: 'long' })
let curYear = new Date().getFullYear();

const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();


const addEventToCalendar = (date, event) => {

    if (calendar[date.month].events[date.day] != '') {
        console.log('adding event');
        calendar[date.month].events[date.day] = event;
        if(modalRoot.children.length >= 1) {
            modalRoot.classList.remove('modal-active');
            modalRoot.children[0].remove();
        }
    }

    render();
}

const modalRoot = document.querySelector('#modal-root');
modalRoot.classList.remove('modal-active');

const eventModalBuilder = (date) => {

    const modalRoot = document.querySelector('#modal-root');

    modalRoot.classList.add(
        'modal-active'
    );

    const eventModal = document.createElement('div');
    eventModal.classList.add('event-modal');

    const eventModalHeader = document.createElement('div');
    eventModalHeader.classList.add('event-modal__header');

    const eventModalHeaderMonth = document.createElement('p');
    eventModalHeaderMonth.classList.add('event-modal__header__month');
    eventModalHeaderMonth.textContent = date.month;

    const eventModalHeaderDay = document.createElement('p');
    eventModalHeaderDay.classList.add('event-modal__header__day');
    eventModalHeaderDay.textContent = date.day;

    const eventModalHeaderYear = document.createElement('p');
    eventModalHeaderYear.classList.add('event-modal__header__year');
    eventModalHeaderYear.textContent = date.year;

    eventModalHeader.appendChild(eventModalHeaderMonth);
    eventModalHeader.appendChild(eventModalHeaderDay);
    eventModalHeader.appendChild(eventModalHeaderYear);

    const eventModalBody = document.createElement('div');
    eventModalBody.classList.add('event-modal__body');

    const eventModalBodyDescription = document.createElement('p');
    eventModalBodyDescription.classList.add('event-modal__body__description');
    eventModalBodyDescription.textContent = 'Schedule an event to be viewed on the calendar.';

    eventModalBody.appendChild(eventModalBodyDescription);

    const eventModalBodyForm = document.createElement('form');
    eventModalBodyForm.classList.add('event-modal__body__form');

    const eventModalBodyFormInput = document.createElement('textarea');
    eventModalBodyFormInput.classList.add('event-modal__body__form__textarea');
    eventModalBodyFormInput.placeholder = 'enter a name for the event';

    const eventModalBodyFormButton = document.createElement('button');
    eventModalBodyFormButton.classList.add('event-modal__body__form__button');
    eventModalBodyFormButton.classList.add('success');
    eventModalBodyFormButton.textContent = 'Add New Event';

    const eventModalBodyFormButtonCancel = document.createElement('button');
    eventModalBodyFormButtonCancel.classList.add('event-modal__body__form__button');
    eventModalBodyFormButtonCancel.classList.add('danger');
    eventModalBodyFormButtonCancel.textContent = 'Cancel';

    eventModalBodyFormButton.addEventListener('click', (e) => {
        e.preventDefault();
        addEventToCalendar({month: date.month, day: date.day}, eventModalBodyFormInput.value);
    });

    eventModalBody.appendChild(eventModalBodyForm);

    eventModalBodyForm.appendChild(eventModalBodyFormInput);
    eventModalBodyForm.appendChild(eventModalBodyFormButton);
    eventModalBodyForm.appendChild(eventModalBodyFormButtonCancel);

    eventModal.appendChild(eventModalHeader);
    eventModal.appendChild(eventModalBody);

    modalRoot.appendChild(eventModal);
};


const calendarCellBuilder = (date, event) => {

    let cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    
    cell.addEventListener('click', () => {
        document.querySelector('#modal-root').classList.add('show-modal');
        eventModalBuilder({month: curMonth, day: date, year: curYear});
    });

    cell.addEventListener('mouseover', () => {
        cell.classList.add('calendar-cell--hover');
    });

    cell.addEventListener('mouseout', () => {
        cell.classList.remove('calendar-cell--hover');
    });

    let cellDate = document.createElement('p');
    cellDate.classList.add('calendar-cell__date');
    cellDate.textContent = date;
    cell.appendChild(cellDate);

    if (date == '') {
        cell.classList.add('calendar-cell__empty');
    }

    if (event) {
        let cellEvent = document.createElement('p');
        cellEvent.classList.add('calendar-cell__event');
        cell.classList.add('active-event');
        cellEvent.textContent = event;
        cell.appendChild(cellEvent);
    }

    return cell;
}

const calendarRowBuilder = (week) => {
    const calendarRow = document.createElement('div');
    calendarRow.classList.add('calendar-row');
    //add cells to the row
    for (let i = 0; i < week.length; i++) {
        calendarRow.appendChild(calendarCellBuilder(week[i].day, week[i].event));
    }

    return calendarRow;
}

const calendarBuilder = (month, year) => {

    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');

    const calendarHeaderMonth = document.createElement('p');
    calendarHeaderMonth.classList.add('calendar-header__month');
    calendarHeaderMonth.textContent = month;

    const calendarHeaderYear = document.createElement('p');
    calendarHeaderYear.classList.add('calendar-header__year');
    calendarHeaderYear.textContent = year;
    
    calendarHeader.appendChild(calendarHeaderMonth);
calendarHeader.appendChild(calendarHeaderYear);

    const calendarMonth = document.createElement('div');
    calendarMonth.classList.add('calendar-month');

    let monthLength = calendar[month].numDays;
    let monthStartOffset = new Date(`${month}, ${year}, 1`).getDay();
    let monthStart = 1 - monthStartOffset;

    calendarMonth.appendChild(calendarHeader);

    for (let i = 0; i < (monthLength + monthStartOffset) / 7; i++) {
        let week = [];

        for (let j = 0; j < 7; j++) {
            let day = monthStart + (i * 7) + j;
            if (day > 0 && day <= monthLength) {
                week.push({day: day, event: calendar[month].events[day]});
            } else {
                week.push({day: '', event: ''});
            }
        }
        calendarMonth.appendChild(calendarRowBuilder(week));
    }


    return calendarMonth;
}

//timer function
setInterval(() =>{
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}, 1000);

calendar.May.events[27] = "John Moves In";

function render () {
    const calendarRoot = document.querySelector('#calendar')
    if (calendarRoot.children.length >= 1) {
        for (let i=0; i < calendarRoot.children.length; i++) {
            calendarRoot.children[i].remove();
        }
    }
    
    calendarRoot.appendChild(calendarBuilder(curMonth, curYear));
}

const prevMonthBtn = document.querySelector('#prevMonthBtn');
const nextMonthBtn = document.querySelector('#nextMonthBtn');

prevMonthBtn.addEventListener('click', () => {

    const months = Object.keys(calendar);
    const currentMonthIndex = months.indexOf(curMonth);

    if (currentMonthIndex === 0) {
        curMonth = months[months.length - 1];
        curYear--;
    } else {
        curMonth = months[currentMonthIndex - 1];
    }

    render();
});

nextMonthBtn.addEventListener('click', () => {

    const months = Object.keys(calendar);

    const currentMonthIndex = months.indexOf(curMonth);

    if (currentMonthIndex === months.length - 1) {
        curMonth = months[0];
        curYear++;
    } else {
        curMonth = months[currentMonthIndex + 1];
    }

    render();
});

render();