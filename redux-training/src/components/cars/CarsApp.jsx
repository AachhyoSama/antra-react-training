import React from "react";
import Car from "./Car";
// import store from "../../redux";
import useMySelector from "../../redux/useMySelector";

export default function CarsApp() {
    // const cars = store.getState();
    const cars = useMySelector((state) => state);

    console.log(cars);

    return (
        <div>
            {cars.map((car) => (
                <Car car={car} key={car.id} />
            ))}
        </div>
    );
}
