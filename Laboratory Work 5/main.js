import _ from "lodash";

import { removeFromListById, ordinal } from "./utils";
import "./style.css";

console.log("Task 1");

// Total number of raids
const M = 5;

// Raid weight limit
const K = 5;

// Number of showpieces
const N = 10;
// const showpieces = [...Array(N)].map((_value, id) => ({
//     id,
//     weight: _.random(1, K),
//     price: _.random(1, 100) * 1000,
// }));
const showpieces = [
    {
        id: 0,
        weight: 3,
        price: 23000,
    },
    {
        id: 1,
        weight: 1,
        price: 43000,
    },
    {
        id: 2,
        weight: 1,
        price: 55000,
    },
    {
        id: 3,
        weight: 3,
        price: 19000,
    },
    {
        id: 4,
        weight: 3,
        price: 12000,
    },
    {
        id: 5,
        weight: 1,
        price: 64000,
    },
    {
        id: 6,
        weight: 3,
        price: 55000,
    },
    {
        id: 7,
        weight: 1,
        price: 76000,
    },
    {
        id: 8,
        weight: 5,
        price: 93000,
    },
    {
        id: 9,
        weight: 3,
        price: 34000,
    },
];
console.log("showpieces", showpieces);

const calcWeight = (showpieces) =>
    showpieces.reduce((accumulator, showpiece) => accumulator + showpiece.weight, 0);

const commitTheft = (showpieces, totalRaids, weightLimit) => {
    // Calc price per weight: value
    showpieces = showpieces.slice().map((showpiece) => ({
        ...showpiece,
        value: showpiece.price / showpiece.weight,
    }));

    // Sort by showpiece value, prefer heavier pieces on ties
    showpieces.sort((showpiece1, showpiece2) => {
        const valueDiff = showpiece2.value - showpiece1.value;
        if (valueDiff !== 0) {
            return valueDiff > 0 ? 1 : -1;
        } else {
            const weightDiff = showpiece2.diff - showpiece1.diff;
            return weightDiff > 0 ? -1 : 1;
        }
    });

    let raidBags = [];

    for (let raidNum = 0; raidNum < totalRaids; raidNum++) {
        let raidBag = [];
        let canStealMore = true;

        while (canStealMore) {
            const carryingCapacity = weightLimit - calcWeight(raidBag);
            const haulableShowpieces = showpieces.filter(
                (showpiece) => showpiece.weight <= carryingCapacity
            );

            if (haulableShowpieces.length) {
                const bestShowpiece = haulableShowpieces.shift();
                raidBag.push(bestShowpiece);
                removeFromListById(showpieces, bestShowpiece.id);
            } else canStealMore = false;
        }
        raidBags.push(raidBag);
    }

    return raidBags;
};

const raidBags = commitTheft(showpieces, M, K);

const loot = raidBags.flat();
const totalPrice = loot.reduce((accum, showpiece) => accum + showpiece.price, 0);

console.log("");
console.log(
    `Stolen ${loot.length} out of ${showpieces.length} showpieces, for total of price of ${totalPrice}!`
);
console.log("Raid breakdown:");
raidBags.forEach((raidBag) => {
    console.log("\tStolen:");
    if (raidBag.length) {
        raidBag.forEach((stolenPiece) =>
            console.log(
                `\t\t${ordinal(stolenPiece.id)} showpiece (${stolenPiece.weight} kg) (${
                    stolenPiece.price
                } price)`
            )
        );
    } else {
        console.log("\t\tnothing");
    }
    console.log(`\t\t- filling bag with ${calcWeight(raidBag)} out of ${K} kg`);
});

console.log("");
console.log("Task 2");

const matMul = (a, b) => {
    let result = [];
    for (let i = 0; i < a.length; ++i) {
        result[i] = [];
        for (let j = 0; j < b[0].length; ++j) {
            result[i][j] = 0;
            for (let k = 0; k < a[0].length; ++k) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return result;
};

const matMulCount = (a, b) => {
    return a.length * b[0].length * a[0].length;
};

const wikiA = _.chunk(
    [...Array(10 * 100)].map(() => _.random(0, 9)),
    100
);
const wikiB = _.chunk(
    [...Array(100 * 5)].map(() => _.random(0, 9)),
    5
);
const wikiC = _.chunk(
    [...Array(5 * 50)].map(() => _.random(0, 9)),
    50
);

console.log(
    "Wiki example ― Order 1 (manually)",
    matMulCount(wikiA, wikiB) + matMulCount(matMul(wikiA, wikiB), wikiC),
    "multiplications"
);
console.log(
    "Wiki example ― Order 2 (manually)",
    matMulCount(wikiB, wikiC) + matMulCount(wikiA, matMul(wikiB, wikiC)),
    "multiplications"
);

// https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0_%D0%BE_%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5_%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%BD%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86?useskin=vector
const matMulByOrder = (matrices, order) => {
    let result = matrices.slice();
    let mulCount = 0;

    for (let k of order) {
        mulCount += matMulCount(result[k], result[k + 1]);
        const matrixProduct = matMul(result[k], result[k + 1]);

        result[k] = matrixProduct;
        result.splice(k + 1, 1);
    }

    return [result, mulCount];
};

const matMulOrderCombinations = (matrixCount) => {
    const ranges = [...Array(matrixCount - 1)].map((_, i) => matrixCount - i - 2);
    const orderRanges = ranges.map((range) => [...Array(range + 1)].map((_, i) => i));

    const recOrderCombinations = (orderRanges, order = []) => {
        if (orderRanges.length === 1) {
            const possibleOrders = [[...order, orderRanges[0][0]]];
            return possibleOrders;
        }
        let possibleOrders = [];
        for (let possbileK of orderRanges[0]) {
            const subPossibleOrders = recOrderCombinations(
                orderRanges.slice(1, orderRanges.length),
                [...order, possbileK]
            );

            possibleOrders.push(subPossibleOrders);
        }
        return possibleOrders.flat();
    };

    return recOrderCombinations(orderRanges);
};

const dynamicMatMulMinimize = (matrices) => {
    const targetFn = (matrices, order) => matMulByOrder(matrices, order)[1];
    const indexOfMinValue = (arr) => _.indexOf(arr, _.min(arr));

    const minimize = (matrices) => {
        const combinations = matMulOrderCombinations(matrices.length);
        const targetValues = combinations.map((combination) => targetFn(matrices, combination));

        const optimalSolutionIndex = indexOfMinValue(targetValues);
        console.log(
            "Out of solutions with following multiplication counts:",
            targetValues,
            "the smallest is ―",
            targetValues[indexOfMinValue(targetValues)]
        );
        return combinations[optimalSolutionIndex];
    };

    const optimalSolution = minimize(matrices);

    return { solution: optimalSolution, targetFnValue: targetFn(matrices, optimalSolution) };
};

const makeMultiplicableMatrices = (n, maxDimention) => {
    const matricesDimensions = [];

    for (let i = 0; i < n; i++) {
        let prevColDimension = _.random(1, maxDimention);
        if (i !== 0) prevColDimension = matricesDimensions[i - 1][1];

        const rowDimension = prevColDimension;
        const colDimension = _.random(1, maxDimention);

        matricesDimensions.push([rowDimension, colDimension]);
    }
    console.log("matricesDimensions", matricesDimensions);

    const matrices = matricesDimensions.map(([row, col]) =>
        _.chunk(
            [...Array(row * col)].map(() => _.random(0, 9)),
            col
        )
    );

    return matrices;
};

console.log("Randomly generated matrices");
// const matrices = makeMultiplicablematrices(10, 9);
const matrices = makeMultiplicableMatrices(3, 9);
console.log("matrices", matrices);

const solution = dynamicMatMulMinimize(matrices);
// const solution = dynamicMatMulMinimize([wikiA, wikiB, wikiC]);
console.log("solution", solution);

console.log("");
console.log("Task 3");

const n = 10;

const arrayN = [...Array(n)].map(() => _.random(-100, 100));
// const arrayN = [10, 1, 2, 3, -1, 1, 2, 3, 4, 5, 6];

console.log("arrayN", arrayN);

const findBiggestIncreasingSeries = (array) => {
    const makeSeries = (initIndex = null, initValues = []) => ({
        startIndex: initIndex,
        endIndex: null,
        values: initValues,
    });

    let seriesList = [];
    let currSeries = null;

    for (let [index, value] of array.entries()) {
        if (!currSeries) {
            currSeries = makeSeries(index, [value]);
        } else {
            const lastValue = currSeries.values.at(-1);

            if (lastValue < value) {
                currSeries.values.push(value);
                const isLastIteration = array.length === index + 1;
                if (isLastIteration) {
                    currSeries.endIndex = index - 1;
                    seriesList.push(currSeries);
                }
            } else {
                currSeries.endIndex = index - 1;
                seriesList.push(currSeries);
                currSeries = makeSeries(index, [value]);
            }
        }
    }
    console.log("seriesList", seriesList);

    // Sort in descending order of series lengths
    seriesList.sort((a, b) => b.values.length - a.values.length);

    return seriesList[0];
};

const biggestSeries = findBiggestIncreasingSeries(arrayN);

console.log("biggestSeries", biggestSeries);
