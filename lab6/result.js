

function rgbToHex(r,g,b){
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}
function convertRgbToHex(rgb) {
    list = rgb.slice(4, -1).split(", ");
    if (list.length == 1) {
        return rgb;
    }
    hex = rgbToHex(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]));
    return hex;
}

if (localStorage.getItem("list")) {
    let list = localStorage.getItem("list").slice(0, -1).split("\n");
    let new_html = `<ul id="list">`
    for (let line of list) {
        new_html += `<li><div class="stack" style="--stacks: 3;">
        <span id="stack1" style="--index: 0;">${line}</span>
        <span id="stack2" style="--index: 1;">${line}</span>
        <span id="stack3" style="--index: 2;">${line}</span>
        </div></li>`
    }
    new_html += `</ul>`;
    let parent = document.getElementById("glitch-container");
    parent.innerHTML = new_html;
}

let stack = document.getElementsByClassName("stack");

if (localStorage.getItem("font_size")) {
    for (let i of stack) {
        i.style.fontSize = localStorage.getItem("font_size");
    }
}
if (localStorage.getItem("font_style")) {
    for (let i of stack) {
        i.style.fontStyle = localStorage.getItem("font_style");
    }
}
if (localStorage.getItem("text_color")) {
    let color = convertRgbToHex(localStorage.getItem("text_color"));
    for (let i of stack) {
        i.style.color = color;
    }
}
if (localStorage.getItem("first_glitch_color")) {
    let color = convertRgbToHex(localStorage.getItem("first_glitch_color"));
    for (let i of stack) {
        i.style.setProperty("--first-glitch-color", color);
    }
}
if (localStorage.getItem("second_glitch_color")) {
    let color = convertRgbToHex(localStorage.getItem("second_glitch_color"));
    for (let i of stack) {
        i.style.setProperty("--second-glitch-color", color);
    }
}
if (localStorage.getItem("padding_left")) {
    for (let i of stack) {
        i.style.setProperty("--padding-left", localStorage.getItem("padding_left"));
    }
}
if (localStorage.getItem("padding_right")) {
    for (let i of stack) {
        i.style.setProperty("--padding-right", localStorage.getItem("padding_right"));
    }
}
if (localStorage.getItem("text_align")) {
    for (let i of stack) {
        i.style.textAlign = localStorage.getItem("text_align");
    }
}
if (localStorage.getItem("open_animation_duration")) {
    for (let i of stack) {
        i.style.setProperty("--open-animation-duration", localStorage.getItem("open_animation_duration"));
    }
}
if (localStorage.getItem("animation_duration")) {
    for (let i of stack) {
        i.style.setProperty("--animation-duration", localStorage.getItem("animation_duration"));
    }
}
