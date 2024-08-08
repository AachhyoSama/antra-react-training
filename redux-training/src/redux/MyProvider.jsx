import React from "react";
import StoreContext from "./StoreContext";

const MyProvider = ({ store, children }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default MyProvider;
