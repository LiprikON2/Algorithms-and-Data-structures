import Chart from "chart.js/auto";
import _ from "lodash";

import countAlgorithm from "../algorithms/count";
import { generateDataset } from "../utils";

const factorial = (n) => {
    if (n < 0) return;
    if (n < 2) return 1;
    return n * factorial(n - 1);
};

const O_n = (x) => x;
const O_nlogn = (x) => x * Math.log2(x);
const O_n_fact = (x) => factorial(x);
const O_n_3 = (x) => x ** 3;
const O_logn = (x) => Math.log2(x);

const O_countAlgorithm = (x) => {
    const unsortedArr = _.range(0, x);

    const [valueCount, steps] = countAlgorithm(unsortedArr, 1);
    return steps;
};

const dataAlgorithms = {
    datasets: [
        generateDataset(O_n, "O(N)"),
        generateDataset(O_nlogn, "O(N logN)"),
        generateDataset(O_n_fact, "O(N!)"),
        generateDataset(O_n_3, "O(N³)"),
        generateDataset(O_logn, "O(logN)"),
        generateDataset(O_countAlgorithm, "O(count(N))", 101, 1, { borderWidth: 6 }),
    ],
};

const stepSize = 1;
const aspectRatio = 3 / 2;
const xMax = 40 * stepSize;
const yMax = Math.round(xMax / aspectRatio);

const optionsAlgorithms = {
    plugins: {
        title: {
            display: true,
            text: "Function Time Complexity (Steps)",
            font: {
                size: "24px",
            },
            color: "#c9c9c9",
        },
    },
    responsive: true,
    showLine: true,
    tension: 0.33,
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
                text: "O(f(N)), steps",
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

const chartAlgorithms = (dataset) => {
    return new Chart(document.getElementById("chart3"), {
        type: "scatter",
        data: dataAlgorithms,
        options: optionsAlgorithms,
    });
};

export default chartAlgorithms;
