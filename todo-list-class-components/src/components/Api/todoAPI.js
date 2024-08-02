const API_URL = "http://localhost:8080/todos"; // trying to mimic backend port

export const fetchTodos = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const addNewTodo = async (newTodo) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
    });

    return response.json();
};

export const updateTodo = async (id, updatedTitle) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle }),
    });
    return response.json();
};

export const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};
