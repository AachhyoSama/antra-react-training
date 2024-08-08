import { useEffect, useState, useContext } from "react";
// import store from ".";
import StoreContext from "./StoreContext";

export default function useMySelector(selectorFn) {
    const store = useContext(StoreContext);
    const [selectedState, setSelectedState] = useState(
        selectorFn(store.getState())
    );

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setSelectedState(selectorFn(store.getState()));
        });

        // Cleanup subscribe
        return () => unsubscribe();
    }, []);

    return selectedState;
}
