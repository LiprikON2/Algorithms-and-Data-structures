import Chart from "chart.js/auto";
import _ from "lodash";

import bubbleSort from "../sort/bubbleSort";
import jsSort from "../sort/jsSort";
import { generateDataset } from "../utils";

const O_1 = (x) => 1;
const O_logn = (x) => Math.log2(x);
const O_n2 = (x) => x ** 2;
const O_2n = (x) => 2 ** x;
const O_bubble = (x) => {
    const unsortedArr = _.range(x, 0, -1);
    const shuffledArr = _.shuffle(unsortedArr);

    const [sortedArr, steps] = bubbleSort(shuffledArr);
    return steps;
};
const O_jsSort = (x) => {
    const unsortedArr = _.range(x, 0, -1);
    const shuffledArr = _.shuffle(unsortedArr);

    const [sortedArr, steps] = jsSort(shuffledArr);

    return steps;
};

const dataSteps = {
    datasets: [
        generateDataset(O_bubble, "O(bubble(N))"),
        generateDataset(O_jsSort, "O(jsSort(N))"),
        generateDataset(O_1, "O(1)"),
        generateDataset(O_logn, "O(log N)"),
        generateDataset(O_n2, "O(N²)"),
        generateDataset(O_2n, "O(2ⁿ)"),
    ],
};

const stepSize = 1;
const aspectRatio = 3 / 2;
const xMax = 40 * stepSize;
const yMax = Math.round(xMax / aspectRatio);

const optionsSteps = {
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

const chartSteps = (dataset) => {
    return new Chart(document.getElementById("chart1"), {
        type: "scatter",
        data: dataSteps,
        options: optionsSteps,
    });
};

export default chartSteps;
