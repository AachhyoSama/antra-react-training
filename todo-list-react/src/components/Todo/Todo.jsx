import React from "react";

export default function Todo({ title, deleteHandler }) {
    return (
        <div>
            <span> * {title}</span>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
}
