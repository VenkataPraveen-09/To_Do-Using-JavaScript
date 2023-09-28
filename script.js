const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function Addtask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        const taskName = inputbox.value;
        const li = document.createElement("li");
        li.innerHTML = taskName;
        li.draggable = true;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputbox.value = "";
    savedata();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

let draggedItem = null;

listcontainer.addEventListener("dragstart", function (e) {
    draggedItem = e.target;
    setTimeout(function () {
        e.target.style.display = "none";
    }, 0);
});

listcontainer.addEventListener("dragend", function (e) {
    setTimeout(function () {
        draggedItem.style.display = "block";
        draggedItem = null;
    }, 0);
});

listcontainer.addEventListener("dragover", function (e) {
    e.preventDefault();
});

listcontainer.addEventListener("dragenter", function (e) {
    e.preventDefault();
    if (e.target.tagName === "LI") {
        e.target.classList.add("dragged-over");
    }
});

listcontainer.addEventListener("dragleave", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("dragged-over");
    }
});

listcontainer.addEventListener("drop", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("dragged-over");
        const oldIndex = Array.from(listcontainer.children).indexOf(draggedItem);
        const newIndex = Array.from(listcontainer.children).indexOf(e.target);
        if (oldIndex !== -1 && newIndex !== -1) {
            // Reorder the tasks in the list
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const taskToMove = tasks[oldIndex];
            tasks.splice(oldIndex, 1);
            tasks.splice(newIndex, 0, taskToMove);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        listcontainer.insertBefore(draggedItem, e.target);
    }
    savedata();
});

function savedata() {
    const tasks = Array.from(listcontainer.children).map((li) => li.innerHTML);
    localStorage.setItem("data", listcontainer.innerHTML);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showtask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listcontainer.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = task;
        li.draggable = true;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
}
showtask();