import React, { Component } from "react";

class Todo extends Component {
    render() {
        // destructure
        const { title, handleDeleteTodo, handleEditTodo } = this.props;

        return (
            <div>
                <span> * {title} </span>
                <button onClick={handleEditTodo}>Edit</button>
                <button onClick={handleDeleteTodo}>Delete</button>
            </div>
        );
    }
}

export default Todo;
