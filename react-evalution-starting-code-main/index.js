const API = (() => {
    const URL = "http://localhost:3000";

    const getCart = () => {
        return fetch(`${URL}/cart`).then((data) => data.json());
    };

    const getInventory = () => {
        return fetch(`${URL}/inventory`).then((data) => data.json());
    };

    const addToCart = (inventoryItem) => {
        return fetch(`${URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inventoryItem),
        }).then((res) => res.json());
    };

    const updateCart = (id, newAmount) => {
        return fetch(`${URL}/cart/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: newAmount }),
        }).then((res) => res.json());
    };

    const deleteFromCart = (id) => {
        return fetch(`${URL}/cart/${id}`, {
            method: "DELETE",
        }).then((res) => res.json());
    };

    const checkout = () => {
        // you don't need to add anything here
        return getCart().then((data) =>
            Promise.all(data.map((item) => deleteFromCart(item.id)))
        );
    };

    return {
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout,
    };
})();

const Model = (() => {
    // implement your logic for Model
    class State {
        #onChange;
        #inventory;
        #cart;
        constructor() {
            this.#inventory = [];
            this.#cart = [];
        }
        get cart() {
            return this.#cart;
        }

        get inventory() {
            return this.#inventory;
        }

        set cart(newCart) {
            this.#cart = newCart;
            this.#onChange();
        }
        set inventory(newInventory) {
            this.#inventory = newInventory;
            this.#onChange();
        }

        subscribe(cb) {
            this.#onChange = cb;
        }
    }
    const {
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout,
    } = API;

    return {
        State,
        getCart,
        updateCart,
        getInventory,
        addToCart,
        deleteFromCart,
        checkout,
    };
})();

const View = (() => {
    const inventoryContainerElement =
        document.querySelector(".inventory__list");

    const renderInventory = (inventory) => {
        let inventoryListTemp = "";

        inventory.forEach((item) => {
            const itemList = `<li class="inventory__item" id="${item.id}">
                                <span>${item.content}</span>
                                <button class="decrement" data-id="${item.id}">-</button>
                                <span>${item.amount}</span>
                                <button class="increment" data-id="${item.id}">+</button>
                                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                              </li>`;

            inventoryListTemp += itemList;
        });

        inventoryContainerElement.innerHTML = inventoryListTemp;
    };
    return {
        renderInventory,
    };
})();

const Controller = ((model, view) => {
    // implement your logic for Controller
    const state = new model.State();

    const init = () => {
        model.getInventory().then((data) => {
            state.inventory = data;
        });
    };
    const handleUpdateAmount = () => {};

    const handleAddToCart = () => {};

    const handleDelete = () => {};

    const handleCheckout = () => {};
    const bootstrap = () => {
        init();
        state.subscribe(() => {
            view.renderInventory(state.inventory);
        });
    };
    return {
        bootstrap,
    };
})(Model, View);

Controller.bootstrap();
