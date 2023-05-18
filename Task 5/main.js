import _ from "lodash";

import "./style.css";

// Subtask 1
console.log("Subtask 1");

const arrA = [...Array(10)].map(() => _.random(0, 10));
// const arrA = [10, 2, 4, 999999, 2];
console.log("arrA", arrA);

const greedyOddlySpecificMaximize = (arr) => {
    // First N - 3 elements
    const possibleA = arr.slice(0, arr.length - 3);
    console.log("possibleA", possibleA);
    const a = Math.max(...possibleA);
    const aIndex = possibleA.indexOf(a);
    console.log("a =", a, "| index", aIndex, a === arr[aIndex]);

    const possibleB = arr.slice(aIndex + 1, arr.length - 2);
    console.log("possibleB", possibleB);
    const b = Math.min(...possibleB);
    const bIndex = aIndex + possibleB.indexOf(b) + 1;
    console.log("b =", b, "| index", bIndex, b === arr[bIndex]);

    const possibleC = arr.slice(bIndex + 1, arr.length - 1);
    console.log("possibleC", possibleC);
    const c = Math.max(...possibleC);
    const cIndex = bIndex + possibleC.indexOf(c) + 1;
    console.log("c =", c, "| index", cIndex, c === arr[cIndex]);

    const possibleD = arr.slice(cIndex + 1, arr.length);
    console.log("possibleD", possibleD);
    const d = Math.min(...possibleD);
    const dIndex = cIndex + possibleD.indexOf(d) + 1;
    console.log("d =", d, "| index", dIndex, d === arr[dIndex]);

    return [aIndex, bIndex, cIndex, dIndex];
};
const [a, b, c, d] = greedyOddlySpecificMaximize(arrA);

console.log("[a, b, c, d]", [a, b, c, d]);
console.log("A[a] - A[b] + A[c] - A[d] =", arrA[a] - arrA[b] + arrA[c] - arrA[d]);

// Subtask 2
console.log("");
console.log("");
console.log("Subtask 2 - Greedy");
const arrayA = [...Array(10)].map(() => _.random(0, 1000));
console.log("arrayA", arrayA);

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const greedyDivideArrayBySum = (arr) => {
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

const [arrayA1, arrayA2] = greedyDivideArrayBySum(arrayA);

console.log("arrayA1 sum", sum(arrayA1), "arrayA2 sum", sum(arrayA2));
console.log("absolute difference", Math.abs(sum(arrayA1) - sum(arrayA2)));

console.log("");
console.log("Subtask 2 - Dynamic");
const indexOfMinValue = (arr) => _.indexOf(arr, _.min(arr));

const dynamicDivideArrayBySum = (arr) => {
    const solutions = recDivideArrayBySum(arr);
    console.log("solutions", solutions);

    const targetFn = ([arrA, arrB]) => Math.abs(sum(arrA) - sum(arrB));

    const minimize = (solutions) => {
        const targetValues = solutions.map((solution) => targetFn(solution));
        const optimalSolutionIndex = indexOfMinValue(targetValues);
        return solutions[optimalSolutionIndex];
    };
    const optimalSolution = minimize(solutions);
    return { solution: optimalSolution, targetFnValue: targetFn(optimalSolution) };
};

const recDivideArrayBySum = (arr, arrLeft = [], arrRight = []) => {
    if (arr.length) {
        const number = arr.pop();

        const leftSolutions = recDivideArrayBySum(arr.slice(), [...arrLeft, number], arrRight);
        const rightSolutions = recDivideArrayBySum(arr.slice(), arrLeft, [...arrRight, number]);

        return [...leftSolutions, ...rightSolutions];
    } else {
        const solution = [arrLeft, arrRight];
        return [solution];
    }
};

const solution = dynamicDivideArrayBySum(arrayA);
console.log("dynamicDivideArrayBySum", solution);
