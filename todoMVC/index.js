// API
const API = (() => {
    const baseURL = "http://localhost:3000/todos";
    const getTodos = () => {
        return fetch(baseURL).then((res) => res.json());
    };

    const createTodo = (newTodo) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        }).then((res) => res.json());
    };

    const deleteTodo = (id) => {
        return fetch(`${baseURL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    };

    return {
        getTodos,
        createTodo,
        deleteTodo,
    };
})();

// Model
// Talks to the database
const Model = (() => {
    // Manage a state for data manipulation from the database
    class State {
        // Priate variables
        #todos;
        #onChange;

        constructor() {
            this.#todos = []; // empty array for adding todos
        }

        set todos(newTodos) {
            this.#todos = newTodos;
            this.#onChange(); // for rendering page on changing of todo list
        }

        get todos() {
            return this.#todos;
        }

        subscribe(cb) {
            this.#onChange = cb;
        }
    }

    return {
        State,
        ...API,
    };
})();

// View
// UI to the user
const View = (() => {
    let todoListElement = document.querySelector(".todo__list");
    let inputElement = document.querySelector(".todo__input");
    let addTodoBtnElement = document.querySelector(".todo__add-btn");

    const getInputValue = () => {
        return inputElement.value;
    };

    const clearInputValue = () => {
        inputElement.value = "";
    };

    const renderTodos = (todos) => {
        let todoListTemp = "";

        todos.forEach((todo) => {
            const todoList = `<li class="todo__item" id="${todo.id}">
                                <span>${todo.title}</span>
                                <button class="todo__delete-btn">X</button>
                            </li>`;

            todoListTemp += todoList;
        });

        todoListElement.innerHTML = todoListTemp;
    };

    return {
        renderTodos,
        addTodoBtnElement,
        getInputValue,
        clearInputValue,
        todoListElement,
    };
})();

// Controller
// Communication between Model and View
const Controller = ((view, model) => {
    const state = new model.State();

    state.subscribe(() => {
        view.renderTodos(state.todos);
    });

    const addNewTodo = () => {
        view.addTodoBtnElement.addEventListener("click", (event) => {
            event.preventDefault();

            const inputValue = view.getInputValue();
            if (inputValue !== "") {
                const newTodo = {
                    title: inputValue,
                };
                model.createTodo(newTodo).then((data) => {
                    state.todos = [...state.todos, data];
                    view.clearInputValue();
                });
            } else {
                alert("Write a TODO to insert.!!");
            }
        });
    };

    // event bubbling / delegation for deleting todo
    view.todoListElement.addEventListener("click", (event) => {
        const element = event.target;
        if (element.className === "todo__delete-btn") {
            const todoId = element.parentElement.getAttribute("id");

            model
                .deleteTodo(todoId)
                .then(() => {
                    return model.getTodos();
                })
                .then((data) => {
                    state.todos = data;
                });
        }
    });

    const init = () => {
        model.getTodos().then((data) => {
            state.todos = data;
        });

        addNewTodo();
    };

    return {
        init,
    };
})(View, Model);

Controller.init();
