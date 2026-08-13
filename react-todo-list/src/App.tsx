import { useState, useEffect } from 'react';
import type { Todo } from './types';
import TodoItem from './components/TodoItem';
import { FiPlus } from 'react-icons/fi';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="app-container">
      <h1>My Tasks</h1>
      
      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" aria-label="Add Task">
          <FiPlus size={22} />
        </button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;