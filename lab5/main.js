// 1. Поміняйте місцями тексти, позначені «1» та «2».
function swapOneAndTwo() {
    let firstText = document.querySelector("#first_text");
    let secondText = document.querySelector("#second_text");
    if (firstText.innerHTML != "" && secondText.innerHTML != "") {
        let temp = firstText.innerHTML;
        firstText.innerHTML = secondText.innerHTML;
        secondText.innerHTML = temp;
    }
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

let first = document.querySelector("#first-box");
let second = document.querySelector("#second-box");

function mouseoverOne(e) {
    if (!e.relatedTarget || !e.relatedTarget.closest("#first-box")) {
        if (first.style.textAlign == "right") {
            first.style.textAlign = "center";
            let ul = first.querySelector(".ullist");
            ul.style.textAlign = "center";
        }
        else {
            first.style.textAlign = "right";
            let ul = first.querySelector(".ullist");
            ul.style.textAlign = "right";
        }
    }
}
function mouseoverTwo(e) {
    if (!e.relatedTarget || !e.relatedTarget.closest("#second-box")) {
        if (second.style.textAlign == "right") {
            second.style.textAlign = "center";
            let ul = second.querySelector(".ullist");
            ul.style.textAlign = "center";
            ul.style.listStylePosition = "outside";
        }
        else {
            second.style.textAlign = "right";
            let ul = second.querySelector(".ullist");
            ul.style.textAlign = "right";
            ul.style.listStylePosition = "inside";
        }
    }
}
first.addEventListener("mouseover", mouseoverOne);
second.addEventListener("mouseover", mouseoverTwo);

function saveToLocalStorage(e) {
    if (flag1res) {
        localStorage.setItem("first_align", first.style.textAlign);
    }
    if (flag2res) {
        localStorage.setItem("second_align", second.style.textAlign);
    }
}
window.addEventListener("beforeunload", saveToLocalStorage);

if (localStorage.getItem("first_align")) {
    console.log(localStorage.getItem("first_align"));
    first.style.textAlign = localStorage.getItem("first_align");
}

if (localStorage.getItem("second_align")) {
    console.log(localStorage.getItem("second_align"));
    second.style.textAlign = localStorage.getItem("second_align");
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

function saveList(e) {
    let parent = e.target.parentElement;
    let text = parent.querySelector("textarea").value;
    let new_text = "";
    if (localStorage.getItem(`ul_${parent.parentElement.id}`)) {
        new_text += localStorage.getItem(`ul_${parent.parentElement.id}`) + "\n";
    }
    new_text += text;
    localStorage.setItem(`ul_${parent.parentElement.id}`, new_text);
    let div = parent.parentElement;
    parent.remove();
    div.innerHTML += `<p class="ul-add">Add List</p>`;
    div.innerHTML += `<p class="ul-del">Delete List</p>`;
}
function deleteList(e) {
    let parent = e.target.parentElement;
    if (localStorage.getItem(`ul_${parent.parentElement.id}`)) {
        localStorage.removeItem(`ul_${parent.parentElement.id}`);
    }
    let div = parent.parentElement;
    parent.remove();
}
function cancelDeleting(e) {
    let parent = e.target.parentElement;
    let div = parent.parentElement;
    parent.remove();
    div.innerHTML += `<p class="ul-add">Add List</p>`;
    div.innerHTML += `<p class="ul-del">Delete List</p>`;
}

function clickList(e) {
    if (e.target.classList.contains("ul-add")) {
        let parent = e.target.parentElement;
        parent.innerHTML+=`<div style="margin: 10px;">
        <label for="list">List:</label><br>
        <textarea cols="40" rows="3"></textarea><br>
        <button class="save">Save</button></div>`;
        let del1 = parent.querySelector(".ul-add");
        let del2 = parent.querySelector(".ul-del");
        del1.remove();
        if (del2) {
            del2.remove();
        }
        let button = parent.querySelector(".save");
        button.addEventListener("click", saveList);
    }
    if (e.target.classList.contains("ul-del")) {
        let parent = e.target.parentElement;
        parent.innerHTML+=`<div style="margin: 10px;">
        <label for="submit">Do you really want to delete this list?</label><br>
        <button class="delete">Yes, delete</button>
        <button class="no">No</button></div>`;
        let del1 = parent.querySelector(".ul-add");
        let del2 = parent.querySelector(".ul-del");
        del1.remove();
        del2.remove();
        let deleteButton = parent.querySelector(".delete");
        deleteButton.addEventListener("click", deleteList);
        let cancelButton = parent.querySelector(".no");
        cancelButton,addEventListener("click", cancelDeleting);
    }
}

document.addEventListener("click", clickList);

if (localStorage.getItem("ul_first")) {
    let text = localStorage.getItem("ul_first");
    let strings = text.split("\n");
    let parent = document.querySelector("#first");
    parent.innerHTML = `<span id="first_text"></span><ul class="ullist"></ul><p class="ul-add">Add List</p><p class="ul-del">Delete List</p>`;
    let ul = parent.querySelector("ul");
    for (let i = 0; i< strings.length; i++) {
        ul.innerHTML += `<li>${strings[i]}</li>`;
    }
}
if (localStorage.getItem("ul_second")) {
    let text = localStorage.getItem("ul_second");
    let strings = text.split("\n");
    let parent = document.querySelector("#second");
    parent.innerHTML = `<span id="second_text"></span><ul class="ullist"></ul><p class="ul-add">Add List</p><p class="ul-del">Delete List</p>`;
    let ul = parent.querySelector("ul");
    for (let i = 0; i< strings.length; i++) {
        ul.innerHTML += `<li>${strings[i]}</li>`;
    }
}
if (localStorage.getItem("ul_third-box")) {
    let text = localStorage.getItem("ul_third-box");
    let strings = text.split("\n");
    let parent = document.querySelector("#third-box");
    parent.innerHTML = `<ul class="ullist"></ul><p class="ul-add">Add List</p><p class="ul-del">Delete List</p>`;
    let ul = parent.querySelector("ul");
    for (let i = 0; i< strings.length; i++) {
        ul.innerHTML += `<li>${strings[i]}</li>`;
    }
}
if (localStorage.getItem("ul_forth")) {
    let text = localStorage.getItem("ul_forth");
    let strings = text.split("\n");
    let parent = document.querySelector("#forth");
    parent.innerHTML = `<ul class="ullist"></ul><p class="ul-add">Add List</p><p class="ul-del">Delete List</p>`;
    let ul = parent.querySelector("ul");
    for (let i = 0; i< strings.length; i++) {
        ul.innerHTML += `<li>${strings[i]}</li>`;
    }
}
if (localStorage.getItem("ul_fifth")) {
    let text = localStorage.getItem("ul_fifth");
    let strings = text.split("\n");
    let parent = document.querySelector("#fifth");
    parent.innerHTML = `<ul class="ullist"></ul><p class="ul-add">Add List</p><p class="ul-del">Delete List</p>`;
    let ul = parent.querySelector("ul");
    for (let i = 0; i< strings.length; i++) {
        ul.innerHTML += `<li>${strings[i]}</li>`;
    }
}