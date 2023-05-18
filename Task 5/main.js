import _ from "lodash";

import "./style.css";

// Subtask 2
const arrayA = [...Array(10)].map(() => _.random(0, 1000));

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const divideArrayBySum = (arr) => {
    const sortedArr = arr.sort((a, b) => b - a);
    console.log("sortedArr", sortedArr);

    const arrA = [];
    const arrB = [];

    for (let number of sortedArr) {
        if (sum(arrA) < sum(arrB)) {
            arrA.push(number);
        } else {
            arrB.push(number);
        }
    }

    return [arrA, arrB];
};

const [arrayA1, arrayA2] = divideArrayBySum(arrayA);

console.log("arrayA1 sum", sum(arrayA1), "arrayA2 sum", sum(arrayA2));
console.log("absolute difference", Math.abs(sum(arrayA1) - sum(arrayA2)));
