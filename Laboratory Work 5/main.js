import _ from "lodash";

import { removeFromListById, ordinal } from "./utils";
import "./style.css";

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

const makeTheftStrategy = (showpieces, totalRaids, weightLimit) => {
    // Calc price per weight: value
    showpieces = showpieces.slice().map((showpiece) => ({
        ...showpiece,
        value: showpiece.price / showpiece.weight,
    }));

    // Sort by showpiece value, prefer lighter pieces on ties
    showpieces.sort((showpiece1, showpiece2) => {
        const valueDiff = showpiece2.value - showpiece1.value;
        if (valueDiff !== 0) {
            return valueDiff > 0 ? 1 : -1;
        } else {
            const weightDiff = showpiece2.diff - showpiece1.diff;
            return weightDiff > 0 ? 1 : -1;
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

const raidBags = makeTheftStrategy(showpieces, M, K);

const loot = raidBags.flat();
const totalPrice = loot.reduce((accum, showpiece) => accum + showpiece.price, 0);

console.log("");
console.log(
    `Stolen ${loot.length} out of ${showpieces.length} showpieces, for total of price of ${totalPrice}`
);
console.log("Raid breakdown:");
raidBags.forEach((raidBag) => {
    console.log("\tStolen:");
    if (raidBag.length) {
        raidBag.forEach((stolenPiece) =>
            console.log(`\t\t${ordinal(stolenPiece.id)} showpiece (${stolenPiece.weight} kg)`)
        );
    } else {
        console.log("\t\tnothing");
    }
    console.log(`\t\t- filling bag with ${calcWeight(raidBag)} out of ${K} kg`);
});
