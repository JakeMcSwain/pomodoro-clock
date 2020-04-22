var startButton = document.getElementById('startButton');
var clockFace = document.getElementById('clockDiv')
var header = document.getElementById('mainMessage')
var statusMessage = document.getElementById('statusMessage')
var inspireMessage = document.getElementById('ideas')
var freeIdeas = ["Call A Friend You Haven't spoken to in a while", "Read an Article", "Play Speed Chess", "Get Up and Walk Around"]
const changeSound = new Audio("changeSound.mp3");
var newsUpdate = document.getElementById('newsUpdate')
var workTimeInMinutes = prompt('How Many Minutes Do You to Work?');
var freeTimeInMinutes = prompt('How Many Minutes Do You to Have a Break?');

//Functions//

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60);
    var minutes = Math.floor( (t/1000/60) % 60);
    return {
        'minutes': minutes,
        'seconds': seconds,
    };
}

function initializeWorkClock(id, endtime) {
    var clock = document.getElementById(id);
    var timeInterval = setInterval(function (){
        var t = getTimeRemaining(endtime);
        clock.textContent = t.minutes + ":" + (('0' + t.seconds).slice(-2));
    if(t.minutes <= 0 && t.seconds <= 0){
        clearInterval(timeInterval)
        changeSound.play();
        startFreeTime();
    }
    },1000);
}

function initializeFreeClock(id, endtime) {
    var clock = document.getElementById(id);
    var timeInterval = setInterval(function (){
        var t = getTimeRemaining(endtime);
        clock.textContent = t.minutes + ":" + (('0' + t.seconds).slice(-2));
    if(t.minutes <= 0 && t.seconds <= 0){
        clearInterval(timeInterval)
        changeSound.play();
        startWorkTime();
    }
    },1000);
}

function startWorkTime() {
    var currentTime = Date.parse(new Date());
    var workDeadline = new Date(currentTime + workTimeInMinutes*60*1000);
    clockFace.classList.remove('freeTime')
    clockFace.classList.add('workTime')
    statusMessage.textContent = "Work Hard and Stay Focused!"
    inspireMessage.textContent = "Close Out Any Apps That Will Deistract You"
    initializeWorkClock('clockDiv', workDeadline);
}

function startFreeTime() {
    var currentTime = Date.parse(new Date());
    var freeDeadline = new Date(currentTime + freeTimeInMinutes*60*1000);
    clockFace.classList.remove('workTime')
    clockFace.classList.add('freeTime');
    statusMessage.textContent = "Enjoy Your Free Time! Need Ideas? Try the Suggestion Below!";
    inspireMessage.textContent = freeIdeas[Math.floor(Math.random() * freeIdeas.length)];
    initializeFreeClock('clockDiv', freeDeadline);
}


//Event Listeners//
startButton.addEventListener('click', function(){
    var clock = document.getElementById('clockDiv')
    clock.innerHTML = "Lets Go!"
    startWorkTime();
    startButton.remove();
    header.remove();
});

