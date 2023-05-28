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

    console.log("showpieces", showpieces);

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

const makeMultiplicableMatricies = (n, maxDimention) => {
    const matriciesDimensions = [];

    for (let i = 0; i < n * 2; i++) {
        let prevColDimension = _.random(1, maxDimention);
        if (i !== 0) prevColDimension = matriciesDimensions[i - 1][1];

        const rowDimension = prevColDimension;
        const colDimension = _.random(1, maxDimention);

        matriciesDimensions.push([rowDimension, colDimension]);
    }
    console.log("matriciesDimensions", matriciesDimensions);

    const matricies = matriciesDimensions.map(([row, col]) =>
        _.chunk(
            [...Array(row * col)].map(() => _.random(0, 9)),
            col
        )
    );

    return matricies;
};

const matricies = makeMultiplicableMatricies(4, 9);

console.log("matricies", matricies);

const A = [
    [1, 2],
    [3, 4],
    [5, 6],
];
// 3x2

const B = [
    [10, 20, 30],
    [40, 50, 60],
];
// 2x3

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

const result = matMul(A, B);

console.log("result", result);
console.log("matMulCount", matMulCount(A, B));

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

console.log("Method 1", matMulCount(wikiA, wikiB) + matMulCount(matMul(wikiA, wikiB), wikiC));
console.log("Method 2", matMulCount(wikiB, wikiC) + matMulCount(wikiA, matMul(wikiB, wikiC)));

// https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0_%D0%BE_%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B5_%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%BD%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86?useskin=vector
const matMulByOrder = (matricies, order) => {
    let result = matricies.slice();
    let mulCount = 0;

    for (let k of order) {
        mulCount += matMulCount(result[k], result[k + 1]);
        const matrixProduct = matMul(result[k], result[k + 1]);

        result[k] = matrixProduct;
        result.splice(k + 1, 1);
    }

    return [result, mulCount];
};

const ss = matMulByOrder([wikiA, wikiB, wikiC], [0, 0]);
const ss1 = matMulByOrder([wikiA, wikiB, wikiC], [1, 0]);

console.log("ss", ss);
console.log("ss1", ss1);

const orderCombinations = (matrixCount) => {
    const ranges = [...Array(matrixCount - 1)].map((_, i) => matrixCount - i - 2);
    const orderRanges = ranges.map((range) => [...Array(range + 1)].map((_, i) => i));
    console.log("ranges", ranges);
    console.log("orderRanges", orderRanges);

    const recOrderCombinations = (orderRanges, order = []) => {
        if (orderRanges.length === 1) return [[...order, orderRanges[0][0]]];

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

const vv = orderCombinations(10);

console.log("orderCombinations", vv);
