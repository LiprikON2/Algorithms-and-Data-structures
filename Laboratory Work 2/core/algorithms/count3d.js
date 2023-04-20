const count3d = (arr, value) => {
    let steps = 0;
    let count = 0;

    for (let i of arr) {
        for (let j of i) {
            for (let k of j) {
                if (k === value) count++;
                steps++;
            }
        }
    }

    return [count, steps];
};

const array = [
    [
        ["yes", "no"],
        ["maybe", "no"],
        ["yes", "why"],
    ],
    [
        ["nope", "ha"],
        ["maybe", "yes"],
        ["why", "yes"],
    ],
];

console.log("\ncount3d.js:");
console.log("array", array);
const toCount = "yes";

const [yesCount, steps] = count3d(array, toCount);
console.log("count of", toCount, yesCount, `| O(count(${array.length})) =`, steps);

export default count3d;
