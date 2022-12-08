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


function saveSettings(e) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/filename.txt', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        }
        else {
            alert(xhr.responseText);
        }
    }
}

let add_button = document.querySelector("#add_element_btn");
add_button.addEventListener("click", saveSettings);