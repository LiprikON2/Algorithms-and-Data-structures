import Chart from "chart.js/auto";
import _ from "lodash";

import generateDataset from "./generateDataset";

const makeOptions = (elementCount) => {
    const stepSize = 5;
    const aspectRatio = 3 / 2;
    const xMax = 40 * stepSize;
    const yMax = Math.round(xMax / aspectRatio);

    return {
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
};

const O_1 = (x) => 1;
const O_logn = (x) => Math.log2(x);
const O_n = (x) => x;
const O_nlogn = (x) => x ** Math.log2(x);
const O_n2 = (x) => x ** 2;
const O_n3 = (x) => x ** 3;
const O_2n = (x) => 2 ** x;

const chartCompare = (canvasId, elementCount = 2500, compareData = null) => {
    const dataSteps = {
        datasets: [
            generateDataset(O_1, {
                label: "O(1)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_logn, {
                label: "O(log N)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_n, {
                label: "O(N)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_nlogn, {
                label: "O(N log N)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_n2, {
                label: "O(N²)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_n3, {
                label: "O(N³)",
                count: elementCount,
                density: 1,
            }),
            generateDataset(O_2n, {
                label: "O(2ⁿ)",
                count: elementCount,
                density: 1,
            }),
            compareData,
        ],
    };

    new Chart(document.getElementById(canvasId), {
        type: "scatter",
        data: dataSteps,
        options: makeOptions(elementCount),
    });

    return dataSteps;
};

export default chartCompare;
