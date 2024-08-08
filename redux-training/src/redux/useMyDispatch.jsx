import { useContext } from "react";
import StoreContext from "./StoreContext";

export default function useMyDispatch() {
    const store = useContext(StoreContext);
    return store.dispatch;
}
