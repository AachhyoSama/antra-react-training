import "./App.css";
import React from "react";
import Sales from "./components/Sales";
import FilteredSalesTable from "./components/FilteredSalesTable";

const data = [
    { region: "US", model: "A", sales: 150 },
    { region: "US", model: "B", sales: 120 },
    { region: "US", model: "C", sales: 350 },
    { region: "EU", model: "A", sales: 200 },
    { region: "EU", model: "B", sales: 100 },
    { region: "EU", model: "C", sales: 250 },
    { region: "CA", model: "A", sales: 200 },
    { region: "CA", model: "B", sales: 100 },
    { region: "CA", model: "C", sales: 230 },
    { region: "CA", model: "D", sales: 400 },
];

function App() {
    return (
        <div className="App">
            <h1>Sales Data</h1>
            <Sales data={data} />

            <h1>Filterd Sales Data</h1>
            <FilteredSalesTable data={data} />
        </div>
    );
}

export default App;
