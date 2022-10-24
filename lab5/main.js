// 1. Поміняйте місцями тексти, позначені «1» та «2».
function swapOneAndTwo() {
    let firstText = document.querySelector("#first_text");
    let secondText = document.querySelector("#second_text");
    let temp = firstText.innerHTML;
    firstText.innerHTML = secondText.innerHTML;
    secondText.innerHTML = temp;
}

setTimeout(swapOneAndTwo, 2000);

// 2. Напишіть функцію, яка обчислює площу овала, беручи необхідні значення із відповідних змінних у скрипті, 
// і виводить отриманий результат в кінці контенту в блоці «3».
function areaOfTheOval(r1, r2) {
    let third = document.querySelector("#third_text");
    third.innerHTML += `<p>Півосі: r1 = ${r1}, r2 = ${r2}. Площа: S = ${(Math.PI * r1 * r2).toFixed(2)}</p>`;
}

areaOfTheOval(5, 6);

// 3. Напишіть скрипт, який визначає всі дільники заданого натурального числа, беручи це число із відповідної 
// форми в блоці «3», а отриманий результат виводить за допомогою діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері користувачу за допомогою діалогового вікна виводиться інформація,
// збережена в cookies, із питанням про необхідність видалити дані із cookies, і не виводиться згадана вище форма;
// б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка оновлюється з початковим станом із 
// наявною формою для введення даних;
// в) при відмові виводиться наступне діалогове вікно із інформуванням
function findDividers(n) {
    let res = "";
    for (let i = 0; i <= n; i++) {
        if (n % i == 0) {
            res += i + ",";
        }
    }
    return res;
}

function sendForm(e) {
    e.preventDefault();
    let N = document.querySelector("#N");
    document.cookie = `dividers=${findDividers(parseInt(N.value))};`;
    let flag1 = document.querySelector("#right_first");
    let flag2 = document.querySelector("#right_second");
    flag1res = flag1.checked? 1: 0;
    flag2res = flag2.checked? 1: 0;
}

function showCookies() {
    alert(document.cookie);
}

function deleteCookies(){
    document.cookie = "dividers=;";
}

function getCookie(name) {
    let result = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
    return result ? decodeURIComponent(result[1]) : undefined;
}

let button = document.querySelector("button");
button.addEventListener("click", sendForm);

if (getCookie("dividers")!="") {
    if (confirm('There are some cookies here. Do you want to delete them?\n'+` ${document.cookie}`)) {
        deleteCookies();
        alert("There are no cookies here")
      } else {
        alert('There are some cookies here. You need to reload the page to see the form!');
        let third_box = document.querySelector("#third-box");
        let form = third_box.querySelector("form");
        third_box.removeChild(form);
      }
}

// 4. Напишіть скрипт, який при настанні події mouseover задає вирівнювання по правому краю вмісту блоків «1» і «2» 
// при встановленні користувачем відповідних галочок у формі і зберігає відповідні значення в localStorage броузера 
// так, щоб при наступному відкриванні веб-сторінки властивості вирівнювання по правому краю вмісту блоків «1» і «2» 
// встановлювались із збережених значень в localStorage.

let first = document.querySelector("#first_text");
let second = document.querySelector("#second_text");

function mouseoverOne(e) {
    if (!e.relatedTarget || !e.relatedTarget.closest("#first_text")) {
        if (first.style.textAlign == "right") {
            first.style.textAlign = "center";
        }
        else {
            first.style.textAlign = "right";
        }
    }
}
function mouseoverTwo(e) {
    if (!e.relatedTarget || !e.relatedTarget.closest("#second_text")) {
        if (second.style.textAlign == "right") {
            second.style.textAlign = "center";
        }
        else {
            second.style.textAlign = "right";
        }
    }
}
first.addEventListener("mouseover", mouseoverOne);
second.addEventListener("mouseover", mouseoverTwo);

let flag1res = 0;
let flag2res = 0;
function saveToLocalStorage(e) {
    if (flag1res) {
        localStorage.setItem("first_align", first.style.textAlign);
    }
    if (flag2res) {
        localStorage.setItem("second_align", second.style.textAlign);
    }
}
addEventListener("beforeunload", saveToLocalStorage);

if (localStorage.getItem("first_align")) {
    console.log(localStorage.getItem("first_align"));
    first.style.textAlign = localStorage.getItem("first_align");
}

if (localStorage.getItem("second_align")) {
    console.log(localStorage.getItem("second_align"));
    first.style.textAlign = localStorage.getItem("second_align");
}

// 5. Напишіть скрипт створення ненумерованого списку:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..5) внаслідок кліку на текстовому посиланні 
// в блоці;
// б) кількість пунктів ненумерованого списку необмежена;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані нумерованого списку зберігаються в localStorage 
// броузера (структуровано на ваш розсуд);
// г) поруч розміщується кнопка для видалення даних ненумерованого списку із localStorage.
// д) якщо список не видалявся кнопкою з п. г), перезавантаження веб-сторінки призводить до демонстрації списку на місці 
// початкового вмісту блока.
