import React, { Component } from "react";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm";
import Todo from "./components/Todo/Todo";
import {
    fetchTodos,
    addNewTodo,
    deleteTodo,
    updateTodo,
} from "./components/Api/todoAPI";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            editTodo: null,
        };
    }

    componentDidMount() {
        this.getTodos();
    }

    getTodos = async () => {
        const todos = await fetchTodos();
        this.setState({ todos });
    };

    handleAddNewTodo = async (newTodoValue) => {
        const newTodo = { title: newTodoValue, completed: false };
        const data = await addNewTodo(newTodo);
        this.setState({ todos: [...this.state.todos, data] });
    };

    handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        const filteredTodo = this.state.todos.filter((todo) => todo.id !== id);
        this.setState({ todos: filteredTodo });
    };

    handleUpdateTodo = async (id, updatedTitle) => {
        const data = await updateTodo(id, updatedTitle);
        this.setState({
            todos: this.state.todos.map((todo) =>
                todo.id === id ? data : todo
            ),
            editTodo: null,
        });
    };

    setEditTodo = (todo) => {
        this.setState({ editTodo: todo });
    };

    render() {
        const { todos, editTodo } = this.state;
        const flag = true;

        return (
            <>
                <TodoForm
                    handleAddNewTodo={this.handleAddNewTodo}
                    editTodo={editTodo}
                    handleUpdateTodo={this.handleUpdateTodo}
                />
                {flag &&
                    todos.map((todo) => (
                        <Todo
                            title={todo.title}
                            handleDeleteTodo={() =>
                                this.handleDeleteTodo(todo.id)
                            }
                            handleEditTodo={() => this.setEditTodo(todo)}
                            key={todo.id}
                        />
                    ))}
            </>
        );
    }
}

export default App;
