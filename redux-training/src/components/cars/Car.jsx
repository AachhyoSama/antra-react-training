import React from "react";
import useMyDispatch from "../../redux/useMyDispatch";
// import { useDispatch } from "react-redux";

export default function Car({ car }) {
    const dispatch = useMyDispatch();

    return (
        <div>
            <div>{car.name}</div>
            <div>{car.quantity}</div>
            <button onClick={() => dispatch({ type: "SELL", payload: car.id })}>
                Sell
            </button>
        </div>
    );
}
