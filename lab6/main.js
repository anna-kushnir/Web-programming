let stack = document.getElementsByClassName("stack");
let form1 = document.querySelector("#form1");

function saveForm(e) {
    e.preventDefault();
    let font_size = form1.querySelector("#font_size").value + "px";
    let font_style;
    if (form1.querySelector("#italic_text").checked) font_style = "italic";
    else font_style = "normal";
    let color = form1.querySelector("#text_color").value;
    let fst_color = form1.querySelector("#first_glitch_color").value;
    let snd_color = form1.querySelector("#second_glitch_color").value;
    let pad_left = form1.querySelector("#padding_left").value + "px";
    let pad_right = form1.querySelector("#padding_right").value + "px";
    let text_align;
    if (form1.querySelector("#left_align").checked) text_align = "left";
    else if (form1.querySelector("#center_align").checked) text_align = "center";
    else text_align = "right";
    let open_anim_duration = form1.querySelector("#open_animation_duration").value + "ms";
    let anim_duration = form1.querySelector("#animation_duration").value + "ms";

    for (let i of stack) {
        i.style.fontSize = font_size;
        i.style.fontStyle = font_style;
        i.style.color = color;
        i.style.setProperty("--first-glitch-color", fst_color);
        i.style.setProperty("--second-glitch-color", snd_color);
        i.style.setProperty("--padding-left", pad_left);
        i.style.setProperty("--padding-right", pad_right);
        i.style.textAlign = text_align;
        i.style.setProperty("--open-animation-duration", open_anim_duration);
        i.style.setProperty("--animation-duration", anim_duration);
    }
}
let save_button = document.querySelector("#save_btn");
save_button.addEventListener("click", saveForm);

function resetForm(e) {
    e.preventDefault();
    form1.reset();
}
let reset_button = document.querySelector("#reset_btn");
reset_button.addEventListener("click", resetForm);

function saveList(e) {
    let parent = e.target.parentElement;
    let text = parent.querySelector("input").value;
    if (text != "") {
        let new_html = `<li><div class="stack" style="--stacks: 3;">
        <span id="stack1" style="--index: 0;">${text}</span>
        <span id="stack2" style="--index: 1;">${text}</span>
        <span id="stack3" style="--index: 2;">${text}</span>
        </div></li>`
        let container = document.querySelector("#sortlist");
        container.innerHTML += new_html;
    }
    let div = parent.parentElement;
    parent.remove();
    div.innerHTML += `<button id="add_element_btn">Add element</button>`;
    div.innerHTML += `<button id="del_fst_element_btn">Delete First Element</button>`;
    document.location.reload();
}
function addItem(e) {
    let parent = e.target.parentElement;
    parent.innerHTML += `<div style="margin: 10px;">
        <label for="item">New item:</label><br>
        <input type="text"><br>
        <button class="save">Save</button></div>`;
        let del1 = parent.querySelector("#add_element_btn");
        let del2 = parent.querySelector("#del_fst_element_btn");
        del1.remove();
        if (del2) {
            del2.remove();
        }
        let button = parent.querySelector(".save");
        button.addEventListener("click", saveList);
}
let add_button = document.querySelector('#add_element_btn');
add_button.addEventListener("click", addItem);

function deleteItem(e) {
    let li = document.querySelectorAll("#sortlist li");
    li[0].parentNode.removeChild(li[0]);
    if (li.length <= 2) {
        let parent = e.target.parentElement;
        let del = parent.querySelector("#del_fst_element_btn");
        del.remove();
    }
}
let del_fst_element_btn = document.querySelector('#del_fst_element_btn');
del_fst_element_btn.addEventListener("click", deleteItem);

function saveToLocalStorage(e) {
    localStorage.setItem("font_size", stack[0].style.fontSize);
    localStorage.setItem("font_style", stack[0].style.fontStyle);
    localStorage.setItem("text_color", stack[0].style.color);
    localStorage.setItem("first_glitch_color", stack[0].style.getPropertyValue("--first-glitch-color"));
    localStorage.setItem("second_glitch_color", stack[0].style.getPropertyValue("--second-glitch-color"));
    localStorage.setItem("padding_left", stack[0].style.getPropertyValue("--padding-left"));
    localStorage.setItem("padding_right", stack[0].style.getPropertyValue("--padding-right"));
    localStorage.setItem("text_align", stack[0].style.textAlign);
    localStorage.setItem("open_animation_duration", stack[0].style.getPropertyValue("--open-animation-duration"));
    localStorage.setItem("animation_duration", stack[0].style.getPropertyValue("--animation-duration"));
    let list = "";
    for (let i of stack) {
        list += i.getElementsByTagName("span")[0].innerText + "\n";
    }
    localStorage.setItem("list", list);
}
window.addEventListener("beforeunload", saveToLocalStorage);

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
    let new_html = `<ul id="sortlist">`
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
    if (list.length < 2) {
        let del = document.querySelector("#del_fst_element_btn");
        if (del) del.remove();
    }
}
function onload(e) {
    if (localStorage.getItem("font_size")) {
        form1.querySelector("#font_size").value = localStorage.getItem("font_size").slice(0, -2);
        for (let i of stack) {
            i.style.fontSize = localStorage.getItem("font_size");
        }
    }
    if (localStorage.getItem("font_style")) {
        form1.querySelector("#italic_text").checked = (localStorage.getItem("font_style") == "italic" ? true : false);
        for (let i of stack) {
            i.style.fontStyle = localStorage.getItem("font_style");
        }
    }
    if (localStorage.getItem("text_color")) {
        let color = convertRgbToHex(localStorage.getItem("text_color"));
        form1.querySelector("#text_color").value = color;
        for (let i of stack) {
            i.style.color = color;
        }
    }
    if (localStorage.getItem("first_glitch_color")) {
        let color = convertRgbToHex(localStorage.getItem("first_glitch_color"));
        form1.querySelector("#first_glitch_color").value = color;
        for (let i of stack) {
            i.style.setProperty("--first-glitch-color", color);
        }
    }
    if (localStorage.getItem("second_glitch_color")) {
        let color = convertRgbToHex(localStorage.getItem("second_glitch_color"));
        form1.querySelector("#second_glitch_color").value = color;
        for (let i of stack) {
            i.style.setProperty("--second-glitch-color", color);
        }
    }
    if (localStorage.getItem("padding_left")) {
        form1.querySelector("#padding_left").value = localStorage.getItem("padding_left").slice(0, -2);
        for (let i of stack) {
            i.style.setProperty("--padding-left", localStorage.getItem("padding_left"));
        }
    }
    if (localStorage.getItem("padding_right")) {
        form1.querySelector("#padding_right").value = localStorage.getItem("padding_right").slice(0, -2);
        for (let i of stack) {
            i.style.setProperty("--padding-right", localStorage.getItem("padding_right"));
        }
    }
    if (localStorage.getItem("text_align")) {
        if (localStorage.getItem("text_align") == "left") {
            form1.querySelector("#left_align").checked = true;
        }
        else if (localStorage.getItem("text_align") == "center") {
            form1.querySelector("#center_align").checked = true;
        }
        else {
            form1.querySelector("#right_align").checked = true;
        }
        for (let i of stack) {
            i.style.textAlign = localStorage.getItem("text_align");
        }
    }
    if (localStorage.getItem("open_animation_duration")) {
        form1.querySelector("#open_animation_duration").value = localStorage.getItem("open_animation_duration").slice(0, -2);
        for (let i of stack) {
            i.style.setProperty("--open-animation-duration", localStorage.getItem("open_animation_duration"));
        }
    }
    if (localStorage.getItem("animation_duration")) {
        form1.querySelector("#animation_duration").value = localStorage.getItem("animation_duration").slice(0, -2);
        for (let i of stack) {
            i.style.setProperty("--animation-duration", localStorage.getItem("animation_duration"));
        }
    }
}
window.addEventListener("load", onload);



function slist (e) {
    e.classList.add("slist");
    let items = e.getElementsByTagName("li"), current = null;
    for (let i of items) {
        i.draggable = true;
        i.ondragstart = (ev) => {
            current = i;
            for (let it of items) {
                if (it != current) it.classList.add("hint");
            }
        };
        i.ondragenter = (ev) => {
            if (i != current) i.classList.add("active");
        };
        i.ondragleave = () => {
            i.classList.remove("active");
        };
        i.ondragend = () => {
            for (let it of items) {
                it.classList.remove("hint");
                it.classList.remove("active");
            }
        };
        i.ondragover = (evt) => {
            evt.preventDefault();
        };
        i.ondrop = (evt) => {
            evt.preventDefault();
            if (i != current) {
                let currentpos = 0, droppedpos = 0;
                for (let it=0; it<items.length; it++) {
                    if (current == items[it]) currentpos = it;
                    if (i == items[it]) droppedpos = it;
                }
                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(current, i);
                }
            }
        };
    }
}
window.addEventListener("DOMContentLoaded", () => {
    slist(document.getElementById("sortlist"));
});
