import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm";
import Todo from "./components/Todo/Todo";

function App() {
    const [todos, setTodos] = useState([]);

    const addNewTodo = (newTodoValue) => {
        const newTodos = [...todos, { title: newTodoValue }];
        setTodos(newTodos);
    };

    const deleteHandler = (deleteIndex) => {
        const newTodos = todos.filter((_, index) => index !== deleteIndex);
        setTodos(newTodos);
    };

    const flag = true;

    return (
        <>
            <TodoForm addNewTodo={addNewTodo} />
            {flag
                ? todos.map((todo, index) => {
                      return (
                          <Todo
                              title={todo.title}
                              deleteHandler={() => deleteHandler(index)}
                              key={index}
                          />
                      );
                  })
                : null}
        </>
    );
}

export default App;
