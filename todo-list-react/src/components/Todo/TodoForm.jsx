import React, { useEffect, useState } from "react";

export default function TodoForm({
    handleAddNewTodo,
    editTodo,
    handleUpdateTodo,
}) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (editTodo) {
            setInputValue(editTodo.title);
        }
    }, [editTodo]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        if (editTodo) {
            handleUpdateTodo(editTodo.id, inputValue);
        } else {
            handleAddNewTodo(inputValue);
        }
        setInputValue("");
    };

    return (
        <div className="input__container">
            <input id="input" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSubmit}>
                {editTodo ? "Update Todo" : "Add Todo"}
            </button>
        </div>
    );
}
