import "../style.css";
import Chart from "chart.js/auto";
import _ from "lodash";

const generateDataset = (fn, label = "", count = 7, step = 1) => {
    const xAxis = _.range(0, count, step);
    const data = xAxis.map((x) => ({ x, y: fn(x) }));

    console.log("xAxis", data);

    return { label, data };
};

const O_1 = (x) => 1;
const O_logn = (x) => Math.log2(x);
const O_n2 = (x) => x ** 2;
const O_n3 = (x) => x ** 3;

const data = {
    datasets: [
        generateDataset(O_1, "O(1)"),
        generateDataset(O_logn, "O(Log N)"),
        generateDataset(O_n2, "O(N²)"),
        generateDataset(O_n3, "O(N³)"),
    ],
};

const chart = new Chart(document.getElementById("chart"), {
    type: "scatter",
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: "Function Time Complexity",
                color: "#c9c9c9",
            },
        },
        responsive: true,
        showLine: true,
        tension: 0.33,

        scales: {
            x: {
                grid: {
                    color: "#616161",
                    tickColor: "#616161",
                },
                title: {
                    text: "n",
                    display: true,
                    color: "#c9c9c9",
                    align: "start",
                },
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                grid: {
                    color: "#616161",
                    tickColor: "#616161",
                },
                title: {
                    text: "f(n)",
                    display: true,
                    color: "#c9c9c9",
                    align: "start",
                },
                max: 20,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    },
});
