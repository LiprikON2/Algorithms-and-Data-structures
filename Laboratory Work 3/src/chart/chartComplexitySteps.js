import Chart from "chart.js/auto";
import _ from "lodash";

import SortableList from "../sortableList";
import generateDataset from "./generateDataset";

const makeOptions = (elementCount) => {
    const stepSize = elementCount * 0.15;
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

const chartSteps = (canvasId, elementCount = 2500) => {
    const sortStepsComplexity = (elementCount, sortAlgorithmName) => {
        const unsortedArr = _.range(elementCount, 0, -1);
        const shuffledArr = _.shuffle(unsortedArr);

        const sortableList = SortableList.from(shuffledArr);
        const sorted = sortableList[sortAlgorithmName]();

        return sorted.sortSteps;
    };

    const dataSteps = {
        datasets: [
            generateDataset((count) => sortStepsComplexity(count, "bubbleSort"), {
                label: "O(bubbleSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "bucketSort"), {
                label: "O(bucketSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "combSort"), {
                label: "O(combSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "heapSort"), {
                label: "O(heapSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "insertionSort"), {
                label: "O(insertionSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "mergeSort"), {
                label: "O(mergeSort)",
                count: elementCount,
            }),
            generateDataset((count) => sortStepsComplexity(count, "quickSort"), {
                label: "O(quickSort)",
                count: elementCount,
            }),
        ],
    };

    return new Chart(document.getElementById(canvasId), {
        type: "scatter",
        data: dataSteps,
        options: makeOptions(elementCount),
    });
};

export default chartSteps;
