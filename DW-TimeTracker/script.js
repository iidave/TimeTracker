//Form inputs
const $employee = document.getElementById('employee');
const $jobNo = document.getElementById('job-no');
const $customer = document.getElementById('customer');
const $task = document.getElementById('task');
const $jobDesc = document.getElementById('job-desc');
const $form = document.getElementById('form');

//List elements
// const $list = document.getElementById('day-list');
//Above Removed from DOM for now

//Containers and Wrappers
const $addProjContainer = document.querySelector('.add-proj-container');
const $containerCardLists = document.querySelector('.container-card-lists');
const $datesList = document.querySelector('.dates');
const $punchDayList = document.querySelector('.list');
const $punchDateContainer = document.getElementById(
  'punch-date-container-open'
);

//Buttons
const $openCloseBtn = document.querySelector('.open-close-btn');
const $punchOpenCloseBtn = document.getElementById('punch-open-close-btn');
const $addProjBtn = document.querySelector('.add-proj-btn');

//Dummy punches
const dummyPunches = [
  {
    id: 1,
    employee: 'Dave Winfield',
    jobNo: 'DW-0001',
    cust: 'OBDK',
    desc: 'design a brochure',
    task: 'Design',
    notes: 'This is a note',
    start: 'Sun Aug 29 2021 12:51:37 GMT-0700',
    end: 'Sun Aug 29 2021 17:04:37 GMT-0700',
  },
  {
    id: 2,
    employee: 'Gaile McGregor',
    jobNo: 'DW-0002',
    cust: 'WERC',
    desc: 'design a brochure',
    task: 'Project Management',
    notes: 'This is a note',
    start: 'Sun Aug 29 2021 11:14:37 GMT-0700',
    end: 'Sun Aug 29 2021 14:51:37 GMT-0700',
  },
  {
    id: 3,
    employee: 'Dave Winfield',
    jobNo: 'DW-0001',
    cust: 'OBDK',
    desc: 'Illustrate GIF',
    task: 'Illustration',
    notes: 'This is a note',
    start: 'Sun Aug 30 2021 12:51:37 GMT-0700',
    end: 'Sun Aug 30 2021 16:51:37 GMT-0700',
  },
  {
    id: 4,
    employee: 'Finnighan',
    jobNo: 'DW-0036',
    cust: 'Himself',
    desc: 'Clean fur',
    task: 'Production',
    notes: 'This is a note',
    start: 'Sun Aug 30 2021 12:21:37 GMT-0700',
    end: 'Sun Aug 30 2021 20:51:37 GMT-0700',
  },
  {
    id: 5,
    employee: 'Dave Winfield',
    jobNo: 'DW-0036',
    cust: 'Finnighan',
    desc: 'Clean up fur ball',
    task: 'Production',
    notes: 'Yuck',
    start: 'Sun Sep 02 2021 12:31:37 GMT-0700',
    end: 'Sun Sep 02 2021 14:51:37 GMT-0700',
  },
];
const localStoragePunches = JSON.parse(localStorage.getItem('punches'));

let punches =
  localStorage.getItem('punches') !== null ? localStoragePunches : [];

//Current Date and time
const now = new Date();
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const day = days[now.getDay()];
const month = months[now.getMonth()];

let time = `${now.getHours()}:${pad(now.getMinutes(), 2)} `;
let calendarDate = `${
  now.getMonth() + 1
}/${now.getDate()}/${now.getFullYear()} `;
let punchDate = `${time} ${calendarDate}`;

//Add transaction to array of Punches
function addPunches(e) {
  e.preventDefault();

  if (
    $employee.value.trim() === '' ||
    $jobNo.value.trim() === '' ||
    $customer.value.trim() === '' ||
    $task.value.trim() === '' ||
    $jobDesc.value.trim() === '' ||
    $task.value.trim() === ''
  ) {
    alert('Please add all job info before adding punch');
  } else {
    const punch = {
      id: 1,
      employee: $employee.value,
      jobNo: $jobNo.value,
      cust: $customer.value,
      task: $task.value,
      notes: $jobDesc.value,
      start: `${punchDate}`,
      end: '',
    };

    punches.push(punch);
    console.log(punches);

    addPunchDOM(punch);

    $employee.value = '';
    $jobNo.value = '';
    $customer.value = '';
    $task.value = '';
    $jobDesc.value = '';
  }
}

// Add punches to DOM List
function addPunchDOM(punch) {
  //Get punch date to determine where generated li is to be added in organized list
  const listDate = document.createElement('li');
  let punchListDate = calendarDate;

  listDate.classList.add('punch-date-container-open');
  listDate.innerHTML = `<div class="day-heading">${day}<span class="day">${punchListDate}</span><button class="open-close-btn-small"><img src="images/switch_button_gray_on.png" alt="Hide-unhide punches button" aria-hidden="true"></button></div>`;

  $datesList.appendChild(listDate);

  // const item = document.createElement('li');

  // item.classList.add('job-info-card');
}

//Leading Zero to number
//https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

//Calculate Elapsed Time
// Code reference
//https://stackoverflow.com/questions/16767301/calculate-difference-between-2-timestamps-using-javascript

//Find Day and add UL to DOM
function createDayList() {
  const day = punches.map(
    (localStoragePunches) =>
      `${new Date(localStoragePunches.start).getMonth() + 1}/
    ${new Date(localStoragePunches.start).getDate()}/
    ${new Date(localStoragePunches.start).getFullYear()}`
  );
  console.log('createDayList function ', day.value);
}
//Below is temporary and needs to be removed
createDayList();
//Create unique ID see article
//https://answers.laserfiche.com/questions/162900/Javascript-to-generate-a-sequence-number
//Possible answer

//Add Project Button
// Not complete
function addProjectToArray() {
  $addProjBtn.addEventListener('click', addProjToList);
}

//Open and close Add new project window
function openCloseContainer() {
  $addProjContainer.classList.toggle('add-proj-container-closed');
}

//Open and close Time Punch window
function openClosePunchList() {
  $containerCardLists.classList.toggle('container-card-lists-closed');
}

//Open and close THIS Dates-List
const $dayOpenCloseBtn = document.querySelectorAll('.open-close-btn-small');
$dayOpenCloseBtn.forEach(function (ele) {
  ele.addEventListener('click', toggleBtn);
});

function toggleBtn(e) {
  this.parentNode.parentNode.classList.toggle('punch-date-container-closed');
  let swapBtn = e.target;
  console.log('btn ', swapBtn);
  if (swapBtn.src.match('switch_button_gray_on.png')) {
    swapBtn.src = 'images/switch_button_gray_off.png';
  } else {
    swapBtn.src = 'images/switch_button_gray_on.png';
  }
}

//Set Date function
//AM/PM conversion, see article
//https://www.aspsnippets.com/Articles/JavaScript-Display-Current-Time-in-12-hour-format-AM-PM-and-24-hour-format-with-Hours-Minutes-and-Seconds-hhmmss.aspx
function setDate() {
  const now = new Date();
  let calendarDate = `${
    now.getMonth() + 1
  }/${now.getDate()}/${now.getFullYear()} `;
  let time = `${now.getHours()}:${pad(now.getMinutes(), 2)} `;
  let punchDate = `punch date = ${time} ${calendarDate} ${now.getMonth()}`;
  console.log('punchDate value= ', punchDate);
  console.log('Time is:', time, calendarDate, now.getMonth());
}

//Start and Stop THIS time punch
const $startStopBtn = document.querySelectorAll('.start-stop-button');
$startStopBtn.forEach(function (ele) {
  console.log(ele);
  ele.addEventListener('click', StartStopBtn);
});

function StartStopBtn(e) {
  let swapBtn = e.target;
  if (swapBtn.src.match('start_button_green.png')) {
    swapBtn.src = 'images/stop_button_red.png';
  } else {
    swapBtn.src = 'images/start_button_green.png';
  }

  setDate();
}

//Unique ID increment
//This needs to be figured out
function uniqueID() {
  let x = 1;
  const uID = x++;
}

//Init app
// This section is still WIP-------------------------
function init() {
  $punchDayList.innerHTML = '';

  // punches.forEach(addPunchesDOM);
  // updateValues();
}

init();

// EventListeners
$openCloseBtn.addEventListener('click', openCloseContainer);
$punchOpenCloseBtn.addEventListener('click', openClosePunchList);
$form.addEventListener('submit', addPunches);

//TASK Drop-down JS below
//Custom-select functionality from w3Schools
let x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName('custom-select');
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      let y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener('click', closeAllSelect);
