"use strict";
const STORAGE_KEY = 'my_typescript_todos';
function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
let todos = loadTodos();
// 4. Grab DOM Elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
function renderTodos() {
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });
        const span = document.createElement('span');
        span.textContent = todo.title;
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#888';
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });
        li.append(checkbox, span, deleteBtn);
        list.appendChild(li);
    });
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTitle = input.value.trim();
    if (!newTitle)
        return;
    const newTodo = {
        id: crypto.randomUUID(),
        title: newTitle,
        completed: false
    };
    todos.push(newTodo);
    saveTodos();
    input.value = '';
    renderTodos();
});
renderTodos();
