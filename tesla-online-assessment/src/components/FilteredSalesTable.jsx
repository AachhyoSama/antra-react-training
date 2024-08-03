import React, { useState } from "react";

const FilteredSalesTable = ({ data }) => {
    const [regionFilter, setRegionFilter] = useState("all");
    const [modelFilter, setModelFilter] = useState("all");

    const regions = ["all", ...new Set(data.map((item) => item.region))];
    const models = ["all", ...new Set(data.map((item) => item.model))];

    const filteredData = data.filter((item) => {
        return (
            (regionFilter === "all" || item.region === regionFilter) &&
            (modelFilter === "all" || item.model === modelFilter)
        );
    });

    return (
        <div>
            <div className="filters">
                <label>
                    Region Filter:
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        {regions.map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Model Filter:
                    <select
                        value={modelFilter}
                        onChange={(e) => setModelFilter(e.target.value)}
                    >
                        {models.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Model</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.region}</td>
                            <td>{item.model}</td>
                            <td>{item.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilteredSalesTable;
