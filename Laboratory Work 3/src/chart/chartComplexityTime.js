import Chart from "chart.js/auto";
import _ from "lodash";

import SortableList from "../sortableList";
import generateDataset from "./generateDataset";

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

const chartTime = (canvasId, elementCount = 2500) => {
    const sortTimeComplexity = (elementCount, sortAlgorithmName) => {
        const unsortedArr = _.range(elementCount, 0, -1);
        const shuffledArr = _.shuffle(unsortedArr);

        const sortableList = SortableList.from(shuffledArr);
        const sorted = sortableList[sortAlgorithmName]();

        return sorted.sortTime;
    };

    const dataTime = {
        datasets: [
            generateDataset((count) => sortTimeComplexity(count, "bubbleSort"), {
                label: "O(bubbleSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "bucketSort"), {
                label: "O(bucketSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "combSort"), {
                label: "O(combSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "heapSort"), {
                label: "O(heapSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "insertionSort"), {
                label: "O(insertionSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "mergeSort"), {
                label: "O(mergeSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortTimeComplexity(count, "quickSort"), {
                label: "O(quickSort)",
                count: elementCount,
            }),
        ],
    };

    new Chart(document.getElementById(canvasId), {
        type: "scatter",
        data: dataTime,
        options: optionsTime,
    });

    return dataTime;
};

export default chartTime;
