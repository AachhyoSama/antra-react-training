import React, { useState } from "react";

export default function TodoForm({ addNewTodo }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="input__container">
            <input id="input" value={inputValue} onChange={handleInputChange} />
            <button
                onClick={() => {
                    addNewTodo(inputValue);
                    setInputValue("");
                }}
            >
                Add Todo
            </button>
        </div>
    );
}
