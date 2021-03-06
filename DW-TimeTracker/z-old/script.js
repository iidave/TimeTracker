
//Form inputs
const $employee = document.getElementById('employee-name');
const $jobNo = document.getElementById('job-no');
const $customer = document.getElementById('customer');
const $task = document.getElementById('task');
const $jobNote = document.getElementById('job-note');
const $form = document.getElementById('form');

//List elements
// const $list = document.getElementById('day-list'); 
//Above Removed from DOM for now

//Containers and Wrappers
const $addProjContainer = document.querySelector('.add-proj-container');
const $containerCardLists = document.querySelector('.container-card-lists');
const $datesList = document.querySelector('.dates');
const $punchDayList = document.querySelector('.list');
const $punchDateContainer = document.getElementById('punch-date-container-open');

//Buttons
const $openCloseBtn = document.querySelector('.open-close-btn');
const $punchOpenCloseBtn = document.getElementById('punch-open-close-btn');


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

let punches = dummyPunches;

//Add punches to DOM List
function addPunchesDOM(punch) {
  const startPunch = new Date(punch.start);
  const startPunchMilli = startPunch.getTime();
  const endPunch = new Date(punch.end);
  const endPunchMilli = endPunch.getTime();

  let elapsed = endPunchMilli - startPunchMilli;

  const daysElapsed = Math.floor(elapsed/1000/60/60/24);
  elapsed -= daysElapsed*1000*60*60*24;
  
  const hoursElapsed = Math.floor(elapsed/1000/60/60);
  elapsed -= hoursElapsed*1000*60*60;
  
  const minutesElapsed = Math.floor(elapsed/1000/60);
  elapsed -= minutesElapsed*1000*60;

  const elapsedTotal = `${(daysElapsed*24)+hoursElapsed}:${pad(minutesElapsed, 2)}h`

  const item = document.createElement('li');

  item.classList.add('job-info-card');

  item.innerHTML = `<div class="info">${punch.employee} | ${punch.jobNo} | ${punch.cust}</div><button class='start-stop-button'><img src="images/stop_button_red.png" class="punch-img" alt="stop" aria-hidden="true"></button><div class="start">${punch.start}</div><div class="stop">${punch.end}</div><div class="elapse"> > ${elapsedTotal}</div><br><div class="desc">DESC: ${punch.desc}&nbsp &nbsp |&nbsp &nbsp NOTES: ${punch.notes}</div><button class="delete-btn">x</button>`

  $punchDayList.appendChild(item);
}

//Leading Zero to number
//https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

//Calculate Elapsed Time
// Code reference
//https://stackoverflow.com/questions/16767301/calculate-difference-between-2-timestamps-using-javascript

//Find Day and add UL to DOM
function createDayList() {
  const day = punches.map(dummyPunches => 
    `${new Date(dummyPunches.start).getMonth()+1}/
    ${new Date(dummyPunches.start).getDate()}/
    ${new Date(dummyPunches.start).getFullYear()}`
    );
  console.log(day);
};
//Below is temporary and needs to be removed
createDayList();
//Create unique ID see article
//https://answers.laserfiche.com/questions/162900/Javascript-to-generate-a-sequence-number
//Possible answer

//Open and close Add new project window
function openCloseContainer() {
  $addProjContainer.classList.toggle('add-proj-container-closed');
}

//Open and close Time Punch window
function openClosePunchList() {
  console.log('close');
  $containerCardLists.classList.toggle('container-card-lists-closed');
}

//Open and close THIS Dates-List
const $dayOpenCloseBtn = document.querySelectorAll('.open-close-btn-small');
$dayOpenCloseBtn.forEach(function(ele) {
  ele.addEventListener('click', toggleBtn)
})

function toggleBtn(e) {
  this.parentNode.parentNode.classList.toggle('punch-date-container-closed');
  let swapBtn = e.target;
  console.log('btn ', swapBtn);
  if(swapBtn.src.match('switch_button_gray_on.png')) {
    swapBtn.src = 'images/switch_button_gray_off.png';
  } else {
    swapBtn.src = 'images/switch_button_gray_on.png';
  }
  
}

//Set Date function
//AM/PM conversion, see article
//https://www.aspsnippets.com/Articles/JavaScript-Display-Current-Time-in-12-hour-format-AM-PM-and-24-hour-format-with-Hours-Minutes-and-Seconds-hhmmss.aspx
function setDate() {
  let now = new Date();
  let calendarDate = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`;
  let time = `${now.getHours()}:${now.getMinutes()}`;
  console.log('Time is:', time, calendarDate, now.getMonth());
}

//Start and Stop THIS time punch
const $startStopBtn = document.querySelectorAll('.start-stop-button');
$startStopBtn.forEach(function(ele) {
  console.log(ele);
  ele.addEventListener('click', StartStopBtn)
})

function StartStopBtn(e) {
  let swapBtn = e.target;
  if(swapBtn.src.match('start_button_green.png')) {
    swapBtn.src = 'images/stop_button_red.png';
  } else {
    swapBtn.src = 'images/start_button_green.png';
  }
  
  setDate();
}



//Local storage Array
const localStoragePunches = JSON.parse(localStorage.getItem('punches'));

let transactions =
  localStorage.getItem('punches') !== null ? localStoragePunches : [];

// Add values from input to localStorage array
// This section is still in the works-------------------------
function addProjToList(e) {
  e.preventDefault();
  console.log('It is listening');
  if (employee.value.trim() === '') {
    alert('Please enter all required information');
  } else {
    const punch = {
      id: 1,
      employee: employee.value,
      jobNo: jobNo.value,
      cust: cust.value,
      desc: desc.value,
      task: task.value,
      notes: notes.value,
    };

    punches.push(punch);
  }
}

//Init app
// This section is still in the works-------------------------
function init() {
  $punchDayList.innerHTML = '';

  punches.forEach(addPunchesDOM);
  // updateValues();
}

init();

// EventListeners
$openCloseBtn.addEventListener('click', openCloseContainer);
$punchOpenCloseBtn.addEventListener('click', openClosePunchList);
$form.addEventListener('submit', addProjToList);

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
