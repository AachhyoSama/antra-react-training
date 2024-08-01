import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm";
import Todo from "./components/Todo/Todo";
import {
    fetchTodos,
    addNewTodo,
    deleteTodo,
    updateTodo,
} from "./components/Api/todoAPI";

function App() {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const todos = await fetchTodos();
        setTodos(todos);
    };

    const handleAddNewTodo = async (newTodoValue) => {
        const newTodo = { title: newTodoValue, completed: false };
        const data = await addNewTodo(newTodo);
        setTodos([...todos, data]);
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        const filteredTodo = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodo);
    };

    const handleUpdateTodo = async (id, updatedTitle) => {
        const data = await updateTodo(id, updatedTitle);
        setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
        setEditTodo(null);
    };

    const flag = true;

    return (
        <>
            <TodoForm
                handleAddNewTodo={handleAddNewTodo}
                editTodo={editTodo}
                handleUpdateTodo={handleUpdateTodo}
            />
            {flag
                ? todos.map((todo) => {
                      return (
                          <Todo
                              title={todo.title}
                              handleDeleteTodo={() => handleDeleteTodo(todo.id)}
                              handleEditTodo={() => setEditTodo(todo)}
                              key={todo.id}
                          />
                      );
                  })
                : null}
        </>
    );
}

export default App;
