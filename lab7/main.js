let text = document.querySelector("#text");
let work = document.querySelector("#work");

function play(e) {
    text.style.display = "none";
    work.style.display = "flex";
}
let play_button = document.querySelector("#play_btn");
play_button.addEventListener("click", play);

function close(e) {
    text.style.display = "flex";
    work.style.display = "none";
}
let close_button = document.querySelector("#close_btn")
close_button.addEventListener("click", close);