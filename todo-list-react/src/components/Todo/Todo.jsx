import React from "react";

export default function Todo({ title, handleDeleteTodo, handleEditTodo }) {
    return (
        <div>
            <span> * {title}</span>
            <button onClick={handleEditTodo}>Edit</button>
            <button onClick={handleDeleteTodo}>Delete</button>
        </div>
    );
}
