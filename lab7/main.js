localStorage.setItem("report", "");

let text = document.querySelector("#text");
let work = document.querySelector("#work");
let report = document.querySelector("#message");
let first_block = document.querySelector("#first-box");
let default_text = first_block.innerHTML;
let message;
let time;

let canvas = document.getElementById("anim");
let context = canvas.getContext("2d");

let radius = 5;
let x1, y1, x2, y2;
let color1 = "yellow";
let color2 = "red";
let step = 2;
let dx1 = 5, dx2 = 5, dy1 = 0, dy2 = 0;
let iter1 = 0, iter2 = 0;
let anim;

let play_button = document.querySelector("#play_btn");
let close_button = document.querySelector("#close_btn")
let start_button = document.querySelector("#start_btn");
let reload_button = document.querySelector("#reload_btn");

function getTime() {
    time = new Date();
    time = (time.getHours() < 10? "0" + time.getHours() : time.getHours()) + ":" + 
        (time.getMinutes() < 10? "0" + time.getMinutes() : time.getMinutes()) + ":" + 
        (time.getSeconds() < 10? "0" + time.getSeconds() : time.getSeconds());
    return time;
}
function initializeCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    x1 = (Math.floor(Math.random() * (canvas.width - radius * 2)) + radius);
    y1 = (Math.floor(Math.random() * (canvas.height - radius * 2)) + radius);
    x2 = (Math.floor(Math.random() * (canvas.width - radius * 2)) + radius);
    y2 = (Math.floor(Math.random() * (canvas.height - radius * 2)) + radius);
    drawBall(x1, y1, color1);
    drawBall(x2, y2, color2);

    start_button.disabled = false;
    start_button.style.display = "inline";
    reload_button.style.display = "none";
}

function play(e) {
    first_block.innerHTML = default_text;
    message = `"PLAY" button pressed.\n`;
    localStorage.setItem("report", getTime() + " - " + message + getTime() + " - " + `The "work" area is open.\n`);
    report.innerText = message;

    text.style.display = "none";
    work.style.display = "flex";
    play_button.disabled = true;
    
    initializeCanvas();
}
play_button.addEventListener("click", play);

function outputReport() {
    let log = localStorage.getItem("report").split("\n").join("<br>");
    first_block.innerHTML = `<div class="item" id="first-box-div"><div id="child">${log}</div></div><button id="clear_btn">Clear</button>`;
    let clear_button = document.querySelector("#clear_btn");
    clear_button.addEventListener("click", function(e) {
        first_block.innerHTML = default_text;
        localStorage.setItem("report", "");
    })
}

function close(e) {
    let curr = localStorage.getItem("report") + getTime() + " - " + `"Close" button pressed.\n` + getTime() + " - " + `The "work" area is closed.\n`;
    localStorage.setItem("report", curr);

    text.style.display = "flex";
    work.style.display = "none";
    play_button.disabled = false;
    
    outputReport();
}
close_button.addEventListener("click", close);

function drawBall(x, y, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function draw() {
    if (work.style.display == "none") {
        iter1 = iter2 = 0;
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x1, y1, color1);
    drawBall(x2, y2, color2);

    if ((x1 + radius > x2 - radius && x1 - radius < x2 + radius || x1 + radius < x2 - radius && x1 - radius > x2 + radius) && 
        (y1 + radius > y2 - radius && y1 - radius < y2 + radius || y1 + radius < y2 - radius && y1 - radius > y2 + radius)) {
            message = `The balls hit each other.\n`;
            let curr = localStorage.getItem("report") + getTime() + " - " + message;
            localStorage.setItem("report", curr);
            report.innerText = message;
            
            start_button.style.display = "none";
            reload_button.style.display = "inline";
            iter1 = iter2 = 0;
        return;
    }
    
    if (iter1 == Math.abs(dx1)) {
        dy1 = (dx1 > 0)? dx1 + 1 : dx1 - 1;
        dx1 = 0;
        iter1 = 0;
    }
    else if (iter1 == Math.abs(dy1)) {
        dx1 = (dy1 > 0)? -(dy1 + 1) : -dy1 + 1;
        dy1 = 0;
        iter1 = 0;
    }
    if (iter2 == Math.abs(dx2)) {
        dy2 = (dx2 > 0)? dx2 + 1 : dx2 - 1;
        dx2 = 0;
        iter2 = 0;
    }
    else if (iter2 == Math.abs(dy2)) {
        dx2 = (dy2 > 0)? -(dy2 + 1) : -dy2 + 1;
        dy2 = 0;
        iter2 = 0;
    }
    
    if (dx1 != 0) {
        if (x1 - radius < 0 || x1 + radius > canvas.width) {
            message = `The yellow ball hit the vertical wall.\n`;
            let curr = localStorage.getItem("report") + getTime() + " - " + message;
            localStorage.setItem("report", curr);
            report.innerText = message;
        }
        if (x1 - radius < 0) {
            dx1 = -dx1;
            x1 = 2 * radius - x1;
        }
        else if (x1 + radius > canvas.width) {
            dx1 = -dx1;
            x1 = -2 * radius - x1 + 2 * canvas.width;
        }
        else {
            x1 = x1 + step * (dx1 / Math.abs(dx1));
        }
    }
    else if (dy1 != 0) {
        if (y1 - radius < 0 || y1 + radius > canvas.height) {
            message = `The yellow ball hit the horizontal wall.\n`;
            let curr = localStorage.getItem("report") + getTime() + " - " + message;
            localStorage.setItem("report", curr);
            report.innerText = message;
        }
        if (y1 - radius < 0) {
            dy1 = -dy1;
            y1 = 2 * radius - y1;
        }
        else if (y1 + radius > canvas.height) {
            dy1 = -dy1;
            y1 = -2 * radius - y1 + 2 * canvas.height;
        }
        else {
            y1 = y1 + step * (dy1 / Math.abs(dy1));
        }
    }
    if (dx2 != 0) {
        if (x2 - radius < 0 || x2 + radius > canvas.width) {
            message = `The red ball hit the vertical wall.\n`;
            let curr = localStorage.getItem("report") + getTime() + " - " + message;
            localStorage.setItem("report", curr);
            report.innerText = message;
        }
        if (x2 - radius < 0) {
            dx2 = -dx2;
            x2 = 2 * radius - x2;
        }
        else if (x2 + radius > canvas.width) {
            dx2 = -dx2;
            x2 = -2 * radius - x2 + 2 * canvas.width;
        }
        else {
            x2 = x2 + step * (dx2 / Math.abs(dx2));
        }
    }
    else if (dy2 != 0) {
        if (y2 - radius < 0 || y2 + radius > canvas.height) {
            message = `The red ball hit the horizontal wall.\n`;
            let curr = localStorage.getItem("report") + getTime() + " - " + message;
            localStorage.setItem("report", curr);
            report.innerText = message;
        }
        if (y2 - radius < 0) {
            dy2 = -dy2;
            y2 = 2 * radius - y2;
        }
        else if (y2 + radius > canvas.height) {
            dy2 = -dy2;
            y2 = -2 * radius - y2 + 2 * canvas.height;
        }
        else {
            y2 = y2 + step * (dy2 / Math.abs(dy2));
        }
    }

    iter1++;
    iter2++;

    anim = window.requestAnimationFrame(draw);
}

function start(e) {
    message = `"Start" button pressed.\n`;
    let curr = localStorage.getItem("report") + getTime() + " - " + message;
    localStorage.setItem("report", curr);
    report.innerText = message;

    start_button.disabled = true;
    anim = window.requestAnimationFrame(draw);
}
start_button.addEventListener("click", start);

function reload(e) {
    message = `"Reload" button pressed.\n`;
    let curr = localStorage.getItem("report") + getTime() + " - " + message;
    localStorage.setItem("report", curr);
    report.innerText = message;

    initializeCanvas();
}
reload_button.addEventListener("click", reload);