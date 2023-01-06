localStorage.setItem("report", "");

let text = document.querySelector("#text");
let work = document.querySelector("#work");

let radius = 10;
let canvas = document.getElementById("anim");
let context = canvas.getContext("2d");

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

function play(e) {
    text.style.display = "none";
    work.style.display = "flex";
    context.clearRect(0, 0, canvas.width, canvas.height);
    x1 = (Math.floor(Math.random() * (canvas.width - radius * 2)) + radius);
    y1 = (Math.floor(Math.random() * (canvas.height - radius * 2)) + radius);
    x2 = (Math.floor(Math.random() * (canvas.width - radius * 2)) + radius);
    y2 = (Math.floor(Math.random() * (canvas.height - radius * 2)) + radius);
    drawBall(x1, y1, color1);
    drawBall(x2, y2, color2);
}
play_button.addEventListener("click", play);

function close(e) {
    text.style.display = "flex";
    work.style.display = "none";
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(x1, y1, color1);
    drawBall(x2, y2, color2);

    if ((x1 + radius > x2 - radius && x1 - radius < x2 + radius || x1 + radius < x2 - radius && x1 - radius > x2 + radius) && 
        (y1 + radius > y2 - radius && y1 - radius < y2 + radius || y1 + radius < y2 - radius && y1 - radius > y2 + radius)) {
            start_button.style.display = "none";
            reload_button.style.display = "inline";
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

start_button.addEventListener("click", function(e) {
    start_button.disabled = true;
    anim = window.requestAnimationFrame(draw);
});

function reload(e) {
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
reload_button.addEventListener("click", reload);