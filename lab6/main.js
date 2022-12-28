// var http = require('http'); // Завантажуємо модуль http

// // Створюємо web-сервер і вказуємо функцію обробки запиту
// var server = http.createServer(function (req, res) {
//     console.log('Початок обробки запиту');
//     // Передаємо код відповіді і заголовки
//     res.writeHead(200, {
//         'Content-Type': 'text/plain; charset=UTF-8'
//     });
//     res.end('Hello world!');
// });

// // Запускаємо web-сервер
// server.listen(1991, "127.0.0.1", function () {
//     console.log('Cервер запущено за адресою http://127.0.0.1:1991/');
// });


// function copyFields(){
//     here = document.getElementById["#form1"].elements;
//     there = document.getElementById[".glitch-container"];
//     there.style.fontSize = here[1].value + 'rem';
//     setTimeout('copyFields()', 100);
// }
// window.onload=copyFields;


// function saveSettings(e) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('get', '/filename.txt', true);
//     xhr.send();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState != 4) return;
//         if (xhr.status != 200) {
//             alert(xhr.status + ': ' + xhr.statusText);
//         }
//         else {
//             alert(xhr.responseText);
//         }
//     }
// }

// let add_button = document.querySelector("#add_element_btn");
// add_button.addEventListener("click", saveSettings);

// let form1 = document.querySelector("#form1");
// form1.onsubmit = async(e) => {
//     e.preventDefault();
//     let response = await fetch('/', {
//         method: 'post', body: new FormData(form1)
//     });
//     let result = await response.json();
//     alert(result.message);
// };


let stack = document.querySelector(".stack");
let form1 = e.target.parentElement;

function saveForm(e) {
    e.preventDefault();
    stack.style.fontSize = form1.querySelector("#font_size").value + "px";
    if (form1.querySelector("#bold_text").checked) {
        stack.style.fontWeight = "bold";
    }
    else {
        stack.style.fontWeight = "normal";
    }
    if (form1.querySelector("#italic_text").checked) {
        stack.style.fontStyle = "italic";
    }
    else {
        stack.style.fontStyle = "normal";
    }
    stack.style.color = form1.querySelector("#text_color").value;
    stack.style.setProperty("--first-glitch-color", form1.querySelector("#first_glitch_color").value);
    stack.style.setProperty("--second-glitch-color", form1.querySelector("#second_glitch_color").value);
    stack.style.setProperty("--padding-left", form1.querySelector("#padding_left").value + "px");
    stack.style.setProperty("--padding-right", form1.querySelector("#padding_right").value + "px");
    if (form1.querySelector("#left_align").checked) {
        stack.style.textAlign = "left";
    }
    else if (form1.querySelector("#center_align").checked) {
        stack.style.textAlign = "center";
    }
    else {
        stack.style.textAlign = "right";
    }
    stack.style.setProperty("--open-animation-duration", form1.querySelector("#open_animation_duration").value + "ms");
    stack.style.setProperty("--animation-duration", form1.querySelector("#animation_duration").value + "ms");
}

function resetForm(e) {
    e.preventDefault();
    form1.reset();
}
let save_button = document.querySelector("#save_btn");
save_button.addEventListener("click", saveForm);
let reset_button = document.querySelector("#reset_btn");
reset_button.addEventListener("click", resetForm);

function saveToLocalStorage(e) {
    localStorage.setItem("font_size", stack.style.fontSize);
    localStorage.setItem("font_weight", stack.style.fontWeight);
    localStorage.setItem("font_style", stack.style.fontStyle);
    localStorage.setItem("text_color", stack.style.color);
    localStorage.setItem("first_glitch_color", stack.style.getPropertyValue("--first-glitch-color"));
    localStorage.setItem("second_glitch_color", stack.style.getPropertyValue("--second-glitch-color"));
    localStorage.setItem("padding_left", stack.style.getPropertyValue("--padding-left"));
    localStorage.setItem("padding_right", stack.style.getPropertyValue("--padding-right"));
    localStorage.setItem("text_align", stack.style.textAlign);
    localStorage.setItem("open_animation_duration", stack.style.getPropertyValue("--open-animation-duration"));
    localStorage.setItem("animation_duration", stack.style.getPropertyValue("--animation-duration"));
}
window.addEventListener("beforeunload", saveToLocalStorage);

if (localStorage.getItem("font_size")) {
    stack.style.fontSize = localStorage.getItem("font_size");
}
if (localStorage.getItem("font_weight")) {
    stack.style.fontWeight = localStorage.getItem("font_weight");
}
if (localStorage.getItem("font_style")) {
    stack.style.fontStyle = localStorage.getItem("font_style");
}
if (localStorage.getItem("text_color")) {
    stack.style.color = localStorage.getItem("text_color");
}
if (localStorage.getItem("first_glitch_color")) {
    stack.style.setProperty("--first-glitch-color", localStorage.getItem("first_glitch_color"));
}
if (localStorage.getItem("second_glitch_color")) {
    stack.style.setProperty("--second-glitch-color", localStorage.getItem("second_glitch_color"));
}
if (localStorage.getItem("padding_left")) {
    stack.style.setProperty("--padding-left", localStorage.getItem("padding_left"));
}
if (localStorage.getItem("padding_right")) {
    stack.style.setProperty("--padding-right", localStorage.getItem("padding_right"));
}
if (localStorage.getItem("text_align")) {
    stack.style.textAlign = localStorage.getItem("text_align");
}
if (localStorage.getItem("open_animation_duration")) {
    stack.style.setProperty("--open-animation-duration", localStorage.getItem("open_animation_duration"));
}
if (localStorage.getItem("animation_duration")) {
    stack.style.setProperty("--animation-duration", localStorage.getItem("animation_duration"));
}