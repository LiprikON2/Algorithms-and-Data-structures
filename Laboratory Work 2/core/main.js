import "../style.css";
import Chart from "chart.js/auto";
import _ from "lodash";

import bubbleSort from "./bubbleSort";

const generateDataset = (fn, label = "", count = 101, step = 1) => {
    const xAxis = _.range(0, count, step);
    const data = xAxis.map((x) => ({ x, y: fn(x) }));

    return { label, data };
};

const O_1 = (x) => 1;
const O_logn = (x) => Math.log2(x);
const O_n2 = (x) => x ** 2;
const O_2_N = (x) => 2 ** x;
const O_bubble = (x) => {
    const unsortedArr = _.range(x, 0, -1);
    const [sortedArr, steps] = bubbleSort(unsortedArr);
    return steps;
};

const data = {
    datasets: [
        generateDataset(O_1, "O(1)"),
        generateDataset(O_logn, "O(log N)"),
        generateDataset(O_n2, "O(N²)"),
        generateDataset(O_2_N, "O(2ⁿ)"),
        generateDataset(O_bubble, "O(bubble(N))"),
    ],
};

const stepSize = 1;
const aspectRatio = 3 / 2;
const xMax = 40 * stepSize;
const yMax = Math.round(xMax / aspectRatio);

const options = {
    plugins: {
        title: {
            display: true,
            text: "Function Time Complexity",
            font: {
                size: "24px",
            },
            color: "#c9c9c9",
        },
    },
    responsive: true,
    showLine: true,
    tension: 0.1,
    aspectRatio,

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
            max: xMax,
            ticks: {
                stepSize,
            },
        },
        y: {
            grid: {
                color: "#616161",
                tickColor: "#616161",
            },
            title: {
                text: "O(f(N))",
                display: true,
                color: "#c9c9c9",
                align: "start",
            },
            max: yMax,
            ticks: {
                stepSize,
            },
        },
    },
};

new Chart(document.getElementById("chart1"), {
    type: "scatter",
    data,
    options,
    // options: {
    //         ...options,
    //         plugins: { ...options.plugins, title: { ...options.plugins.title, text: "test chart 2" } },
    //     },
});
