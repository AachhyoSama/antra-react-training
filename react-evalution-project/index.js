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
    const inventoryListElement = document.querySelector(".inventory__list");
    const cartListElement = document.querySelector(".cart__list");
    const checkoutBtnElement = document.querySelector(".checkout-btn");
    const sortAscendingBtn = document.querySelector(".btn-sort-asc");
    const sortDescendingBtn = document.querySelector(".btn-sort-desc");

    const renderInventory = (inventory) => {
        let inventoryListTemp = "";

        inventory.forEach((item) => {
            const itemList = `<li class="inventory__item" id="${item.id}">
                                <span>${item.content}</span>
                                <button class="decrement-amount">-</button>
                                <span>0</span>
                                <button class="increment-amount">+</button>
                                <button class="cart__add-btn">add to cart</button>
                              </li>`;

            inventoryListTemp += itemList;
        });

        inventoryListElement.innerHTML = inventoryListTemp;
    };

    const renderCart = (cart) => {
        let cartListTemp = "";

        cart.forEach((item) => {
            const itemList = `<li class="cart__item" id="${item.id}">
                              <span>${item.content} x ${item.amount}</span>
                              <button class="cart__delete-btn">delete</button>
                            </li>`;

            cartListTemp += itemList;
        });

        cartListElement.innerHTML = cartListTemp;
    };

    return {
        renderInventory,
        renderCart,
        checkoutBtnElement,
        cartListElement,
        inventoryListElement,
        sortAscendingBtn,
        sortDescendingBtn,
    };
})();

const Controller = ((model, view) => {
    const state = new model.State();

    const init = () => {
        state.subscribe(() => {
            view.renderInventory(state.inventory);
            view.renderCart(state.cart);
        });

        model.getInventory().then((data) => {
            state.inventory = data;
        });

        model.getCart().then((data) => {
            state.cart = data;
        });
    };

    const handleUpdateAmount = () => {
        view.inventoryListElement.addEventListener("click", (event) => {
            const element = event.target;
            if (element.className === "increment-amount") {
                const amountElement = element.previousElementSibling;
                console.log(amountElement);

                // parsing the value into integer for calculation
                let currentAmount = parseInt(amountElement.innerText);
                amountElement.innerText = currentAmount + 1;
            }

            if (element.className === "decrement-amount") {
                const amountElement = element.nextElementSibling;
                let currentAmount = parseInt(amountElement.innerText);
                if (currentAmount > 0) {
                    // No negative amount to insert
                    amountElement.innerText = currentAmount - 1;
                }
            }
        });
    };

    const handleAddToCart = () => {
        view.inventoryListElement.addEventListener("click", (event) => {
            const element = event.target;

            if (element.className === "cart__add-btn") {
                // Getting the cart item id from parent element
                const inventoryItemId = parseInt(
                    element.parentElement.getAttribute("id")
                );

                const item = state.inventory.find(
                    (item) => item.id === inventoryItemId
                );

                const amountElement =
                    element.previousElementSibling.previousElementSibling;

                const amount = parseInt(amountElement.innerText);

                if (amount > 0) {
                    // find the cart item
                    const cartItem = state.cart.find(
                        (cartItem) => cartItem.id === inventoryItemId
                    );

                    if (cartItem) {
                        // Update the amount if the item already exists in the cart
                        const newAmount = cartItem.amount + amount;
                        model
                            .updateCart(cartItem.id, newAmount)
                            .then(() => {
                                return model.getCart();
                            })
                            .then((data) => {
                                state.cart = data;
                            });
                    } else {
                        // Add the new item to the cart
                        const newCartItem = {
                            id: item.id,
                            content: item.content,
                            amount: amount,
                        };
                        model
                            .addToCart(newCartItem)
                            .then(() => {
                                return model.getCart();
                            })
                            .then((data) => {
                                state.cart = data;
                            });
                    }

                    // keep the amount as it is
                    amountElement.innerText = amount;
                } else {
                    alert("Cannot add item with 0 amount.!!");
                }
            }
        });
    };

    const handleDelete = () => {
        view.cartListElement.addEventListener("click", (event) => {
            const element = event.target;
            console.log(element.className);

            if (element.className === "cart__delete-btn") {
                const cartItemId = element.parentElement.getAttribute("id");
                model
                    .deleteFromCart(cartItemId)
                    .then(() => {
                        return model.getCart();
                    })
                    .then((data) => {
                        state.cart = data;
                    });
            }
        });
    };

    const handleCheckout = () => {
        view.checkoutBtnElement.addEventListener("click", () => {
            model
                .checkout()
                .then(() => {
                    state.cart = [];
                    view.renderCart(state.cart);
                })
                .then(() => {
                    // Redirect to the payment page on real world application
                    alert("Redirecting to Payment Section.");
                });
        });
    };

    const sortInventoryAsc = () => {
        view.sortAscendingBtn.addEventListener("click", (event) => {
            state.inventory.sort((a, b) => {
                const itemA = a.content;
                const itemB = b.content;

                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }

                return 0;
            });

            view.renderInventory(state.inventory);
        });
    };

    const sortInventoryDesc = () => {
        view.sortDescendingBtn.addEventListener("click", (event) => {
            state.inventory.sort((a, b) => {
                const itemA = a.content;
                const itemB = b.content;

                if (itemA > itemB) {
                    return -1;
                }
                if (itemA < itemB) {
                    return 1;
                }

                return 0;
            });

            view.renderInventory(state.inventory);
        });
    };

    const bootstrap = () => {
        init();
        handleUpdateAmount();
        handleAddToCart();
        handleDelete();
        handleCheckout();
        sortInventoryAsc();
        sortInventoryDesc();
    };
    return {
        bootstrap,
    };
})(Model, View);

Controller.bootstrap();
