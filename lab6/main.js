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



function submitForm(e) {
    e.preventDefault();
    let form1 = e.target.parentElement;
    let stack = document.querySelector(".stack");

    let font_size = form1.querySelector("#font_size").value + "px";
    let bold_text = form1.querySelector("#bold_text").checked;
    let italic_text = form1.querySelector("#italic_text").checked;
    let text_color = form1.querySelector("#text_color").value;
    let first_glitch_color = form1.querySelector("#first_glitch_color").value;
    let second_glitch_color = form1.querySelector("#second_glitch_color").value;
    let padding_left = form1.querySelector("#padding_left").value + "px";
    let padding_right = form1.querySelector("#padding_right").value + "px";
    let left_align = form1.querySelector("#left_align").checked;
    let center_align = form1.querySelector("#center_align").checked;
    let open_animation_duration = form1.querySelector("#open_animation_duration").value + "ms";
    let animation_duration = form1.querySelector("#animation_duration").value + "ms";

    stack.style.fontSize = font_size;
    if (bold_text) {
        stack.style.fontWeight = "bold";
    }
    if (italic_text) {
        stack.style.fontStyle = "italic";
    }
    stack.style.color = text_color;
    stack.style.setProperty("--first-glitch-color", first_glitch_color);
    stack.style.setProperty("--second-glitch-color", second_glitch_color);
    stack.style.setProperty("--padding-left", padding_left);
    stack.style.setProperty("--padding-right", padding_right);
    if (left_align) {
        stack.style.textAlign = "left";
    }
    else if (center_align) {
        stack.style.textAlign = "center";
    }
    else {
        stack.style.textAlign = "right";
    }
    stack.style.setProperty("--open-animation-duration", open_animation_duration);
    stack.style.setProperty("--animation-duration", animation_duration);
}
let save_button = document.querySelector("#save_btn");
save_button.addEventListener("click", submitForm);