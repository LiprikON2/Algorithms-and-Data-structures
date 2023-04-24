import Chart from "chart.js/auto";
import _ from "lodash";

import SortableList from "../sortableList";
import generateDataset from "./generateDataset";

const unsortedArr = _.range(10, 0, -1);
const shuffledArr = _.shuffle(unsortedArr);

const sortableList = SortableList.from(shuffledArr);
const sorted = sortableList["bucketSort"]();

const sortTimeComplexity = (elementCount, sortAlgorithmName) => {
    const unsortedArr = _.range(elementCount, 0, -1);
    const shuffledArr = _.shuffle(unsortedArr);

    const sortableList = SortableList.from(shuffledArr);
    const sorted = sortableList[sortAlgorithmName]();

    return sorted.sortTime;
};

const elementCount = 2500;

const dataTime = {
    datasets: [
        // generateDataset((count) => sortTimeComplexity(count, "bubbleSort"), {
        //     label: "O(bubbleSort)",
        //     count: elementCount,
        // }),
        // generateDataset((count) => sortTimeComplexity(count, "bucketSort"), {
        //     label: "O(bucketSort)",
        //     count: elementCount,
        // }),
    ],
};

const optionsTime = {
    plugins: {
        title: {
            display: true,
            text: "Function Time Complexity (Actual time)",
            font: {
                size: "24px",
            },
            color: "#c9c9c9",
        },
    },
    responsive: true,
    aspectRatio: 3 / 2,

    scales: {
        x: {
            grid: {
                color: "#616161",
                tickColor: "#616161",
            },
            title: {
                text: "N",
                display: true,
                color: "#c9c9c9",
                align: "start",
            },
        },
        y: {
            grid: {
                color: "#616161",
                tickColor: "#616161",
            },
            title: {
                text: "O(f(N)), seconds",
                display: true,
                color: "#c9c9c9",
                align: "start",
            },
        },
    },
};

const chartTime = (dataset) => {
    return new Chart(document.getElementById("chart1"), {
        type: "scatter",
        data: dataTime,
        options: optionsTime,
    });
};

export default chartTime;
