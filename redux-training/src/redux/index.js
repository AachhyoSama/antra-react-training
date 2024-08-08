// import { createStore } from "redux";

const carsInitialValue = [
    {
        id: 1,
        name: "toyota",
        quantity: 10,
    },
    {
        id: 2,
        name: "nissan",
        quantity: 10,
    },
    {
        id: 3,
        name: "ford",
        quantity: 10,
    },
];

const carsReducer = (state = carsInitialValue, { type, payload }) => {
    switch (type) {
        case "SELL":
            return state.map((car) => {
                if (car.id === payload) {
                    return {
                        ...car,
                        quantity: car.quantity - 1,
                    };
                } else {
                    return car;
                }
            });
        default:
            return state;
    }
};

// const store = createStore(carsReducer, carsInitialValue);

const createMyStore = (reducer, preloadedState = {}, enhancer = undefined) => {
    if (enhancer) {
        // return enhancer(...)...
    }

    const store = {};
    store.state = preloadedState;
    store.callbackFns = [];

    // return the state of the store
    store.getState = () => {
        return store.state;
    };

    // dispatch any action that happens on the state/store
    store.dispatch = (action) => {
        store.state = reducer(store.state, action);

        // call all the subscribed callback functions
        store.callbackFns.forEach((fn) => fn(action));
    };

    // basically to inform the state change
    store.subscribe = (callbackFn) => {
        store.callbackFns.push(callbackFn);

        // cleanup on the subscribe
        return () => {
            store.callbackFns.filter((fn) => fn !== callbackFn);
        };
    };

    // initializing the store
    store.dispatch({ type: "redux/INIT" });

    // The whole idea of createMyStore is to return the store simulating the createStore in redux
    return store;
};

const store = createMyStore(carsReducer, carsInitialValue);
export default store;
