// =========================
// Get HTML Elements
// =========================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const remainingCount = document.getElementById("remainingCount");
const clearBtn = document.getElementById("clearBtn");
const counter = document.getElementById("counter");
const allDoneMsg = document.getElementById("allDoneMsg");

const colorCircles = document.querySelectorAll(".color-circle");

// Data

let tasks = [];


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.done) {
            li.classList.add("done");
        }

        li.innerHTML = `
            <span class="task-text">${task.text}</span>

            <button class="done-btn">
                ${task.done ? "Undo" : "Done"}
            </button>

            <button class="delete-btn">
                Delete
            </button>
        `;

        const doneButton = li.querySelector(".done-btn");
        const deleteButton = li.querySelector(".delete-btn");

        doneButton.addEventListener("click", () => {
            toggleTask(index);
        });

        deleteButton.addEventListener("click", () => {
            deleteTask(index);
        });

        taskList.appendChild(li);

    });

    updateCounter();

}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        errorMsg.textContent = "Please type a task first.";

        return;

    }

    const duplicate = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());

    if (duplicate) {

        errorMsg.textContent = "This task already exists!";

        return;

    }

    errorMsg.textContent = "";

    tasks.push({

        text: text,
        done: false

    });

    taskInput.value = "";

    renderTasks();

}


// Toggle Done

function toggleTask(index) {

    tasks[index].done = !tasks[index].done;

    renderTasks();

}

// Delete Task

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();

}

// Update Counter

function updateCounter() {

    const remaining = tasks.filter(task => !task.done).length;

    const completed = tasks.filter(task => task.done).length;

    remainingCount.textContent = remaining;

    counter.innerHTML = `
        Tasks remaining:
        <span id="remainingCount">${remaining}</span>
        <br>
        ${completed} of ${tasks.length} tasks completed
    `;

    if (tasks.length > 0 && completed === tasks.length) {

        allDoneMsg.classList.add("visible");

    } else {

        allDoneMsg.classList.remove("visible");

    }

}

// Clear All

function clearAll() {

    tasks = [];

    renderTasks();

}

// Event Listeners

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAll);

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

// Color Picker

colorCircles.forEach(circle => {

    circle.addEventListener("click", () => {

        document.body.style.backgroundColor = circle.dataset.color;

        colorCircles.forEach(c => {

            c.classList.remove("active");

        });

        circle.classList.add("active");

    });

});

// Initial Render

renderTasks();