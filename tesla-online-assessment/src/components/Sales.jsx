import React, { useEffect, useState } from "react";

const Sales = ({ data }) => {
    const [salesData, setSalesData] = useState([]);
    const [sum, setSum] = useState({});

    useEffect(() => {
        setSalesData(data);

        // calculating the sums
        const calculatedSums = data.reduce((acc, item) => {
            if (!acc[item.region]) {
                acc[item.region] = 0;
            }
            acc[item.region] += item.sales;
            return acc;
        }, {});

        setSum(calculatedSums);
    }, [data]);

    const groupedData = Object.entries(
        salesData.reduce((acc, item) => {
            if (!acc[item.region]) {
                acc[item.region] = [];
            }
            acc[item.region].push(item);
            return acc;
        }, {})
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>Region</th>
                    <th>Model</th>
                    <th>Sales</th>
                </tr>
            </thead>
            <tbody>
                {groupedData.map(([region, items], regionIndex) => (
                    <>
                        <tr key={`sum-${regionIndex}`}>
                            <td>{region}</td>
                            <td>sum</td>
                            <td>{sum[region]}</td>
                        </tr>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.region}</td>
                                <td>{item.model}</td>
                                <td>{item.sales}</td>
                            </tr>
                        ))}
                    </>
                ))}
            </tbody>
        </table>
    );
};

export default Sales;
