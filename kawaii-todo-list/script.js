let tasks = []
let messageTimer;
let editingTask = null;
let editingIndex = -1;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const statusMsg = document.getElementById("statusMsg");

function showMessage(message) {

    clearTimeout(messageTimer);

    statusMsg.textContent = message;
    statusMsg.style.display = "block";

    messageTimer = setTimeout(function () {

        statusMsg.style.display = "none";

    }, 2000);

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task){

            createTaskElement(task);

        });
    }
}

function createTaskElement(task) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const taskName = document.createElement("span");
    taskName.classList.add("task-name");
    taskName.textContent = task;

    const taskIcons = document.createElement("div");
    taskIcons.classList.add("task-icons");

    const editIcon = document.createElement("img");
    editIcon.src = "assets/edit.png";
    editIcon.alt = "Edit";

    editIcon.addEventListener("click", function () {
        taskInput.value = taskName.textContent;

        editingTask = todoItem;
        editingIndex = tasks.indexOf(task);

        taskInput.focus();

        showMessage("Edit your task and click +");
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/delete.png";
    deleteIcon.alt = "Delete";

    deleteIcon.addEventListener("click", function () {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTasks();

        if (editingTask === todoItem) {
            editingTask = null;
            editingIndex = -1;

            taskInput.value = "";
            taskInput.focus();
        }

        todoItem.remove();
        showMessage("Task deleted successfully!");
    })

    taskIcons.appendChild(editIcon);
    taskIcons.appendChild(deleteIcon);

    todoItem.appendChild(taskName);
    todoItem.appendChild(taskIcons);

    taskList.appendChild(todoItem);
}

function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        showMessage("Please enter a task.");
        return;
    }

    if (editingTask !== null) {
        tasks[editingIndex] = task;
        saveTasks();
        editingTask.querySelector(".task-name").textContent = task;
        
        editingTask = null;
        editingIndex = -1;

        taskInput.value = "";
        showMessage("Task updated successfully!");

        return;
    }

    const exists = tasks.some(function(item) {
        return item.toLowerCase() === task.toLowerCase();
    });
    
    if (exists) {
        showMessage("Task already exists.");
        return;
    }

    tasks.push(task);
    saveTasks();

    createTaskElement(task);

    showMessage("Task added successfully!");

    taskInput.value = "";
    taskInput.focus();

};

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();