import Chart from "chart.js/auto";
import _ from "lodash";

import bubbleSort from "../sort/bubbleSort";
import jsSort from "../sort/jsSort";
import { generateDataset } from "../utils";

const O_bubble_time = (x) => {
    const unsortedArr = _.range(x, 0, -1);
    const shuffledArr = _.shuffle(unsortedArr);

    const t0 = performance.now();
    const [sortedArr, steps] = bubbleSort(shuffledArr);
    const t1 = performance.now();

    return (t1 - t0) / 1000;
};

const O_jsSort_time = (x) => {
    const unsortedArr = _.range(x, 0, -1);
    const shuffledArr = _.shuffle(unsortedArr);

    const t0 = performance.now();
    const [sortedArr, steps] = jsSort(shuffledArr);
    const t1 = performance.now();

    return (t1 - t0) / 1000;
};

const pointCount = 10000;

const dataTime = {
    datasets: [
        generateDataset(O_bubble_time, "O(bubble(N))", pointCount, Math.round(pointCount / 250)),
        generateDataset(O_jsSort_time, "O(jsSort(N))", pointCount, Math.round(pointCount / 250)),
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
    return new Chart(document.getElementById("chart2"), {
        type: "scatter",
        data: dataTime,
        options: optionsTime,
    });
};

export default chartTime;
