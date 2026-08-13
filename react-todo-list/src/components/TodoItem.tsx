import React, { useState } from 'react';
import type { Todo } from '../types';
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button className="icon-btn save-btn" onClick={handleSave} aria-label="Save">
            <FiCheck size={20} />
          </button>
        </div>
      ) : (
        <>
          <span className="todo-text">{todo.text}</span>
          <div className="actions">
            <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)} aria-label="Edit">
              <FiEdit size={18} />
            </button>
            <button className="icon-btn delete-btn" onClick={() => deleteTodo(todo.id)} aria-label="Delete">
              <FiTrash2 size={18} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;