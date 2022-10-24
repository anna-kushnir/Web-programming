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
    let res = "" + n;
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
    return result ? decodeURIComponent(result[1]) : "";
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


// 5. Напишіть скрипт створення ненумерованого списку:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..5) внаслідок кліку на текстовому посиланні 
// в блоці;
// б) кількість пунктів ненумерованого списку необмежена;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані нумерованого списку зберігаються в localStorage 
// броузера (структуровано на ваш розсуд);
// г) поруч розміщується кнопка для видалення даних ненумерованого списку із localStorage.
// д) якщо список не видалявся кнопкою з п. г), перезавантаження веб-сторінки призводить до демонстрації списку на місці 
// початкового вмісту блока.
